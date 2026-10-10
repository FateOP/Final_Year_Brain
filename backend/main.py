from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import tensorflow as tf
from tensorflow.keras.applications import EfficientNetB0
from tensorflow.keras import layers, Model
import numpy as np
from PIL import Image
import io
import cv2
import base64

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rebuild the EfficientNetB0 architecture natively to bypass broken JSON configs
def create_model():
    base_model = EfficientNetB0(include_top=False, weights=None, input_shape=(224, 224, 3))
    inputs = layers.Input(shape=(224, 224, 3))
    x = base_model(inputs, training=False)
    x = layers.GlobalAveragePooling2D()(x)
    x = layers.Dropout(0.30)(x)
    x = layers.Dense(128, activation="relu")(x)
    x = layers.Dropout(0.20)(x)
    outputs = layers.Dense(4, activation="softmax")(x)
    return Model(inputs, outputs)

model = create_model()

try:
    # Load weights directly from your .keras file (bypassing corrupt JSON config parsing)
    model.load_weights("models/brain_tumor_model.keras")
    print("✅ Model weights loaded successfully from .keras file!")
except Exception as e:
    print(f"❌ Error loading weights: {e}")

CLASS_NAMES = ['glioma', 'meningioma', 'notumor', 'pituitary']

def prepare_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((224, 224)) 
    img_array = np.array(img)
    img_expanded = np.expand_dims(img_array, axis=0)
    return img_array, img_expanded

def generate_gradcam(img_array, img_expanded, model, pred_index=None):
    try:
        base_model = None
        for layer in model.layers:
            if "efficientnet" in layer.name.lower():
                base_model = layer
                break
        
        if not base_model:
            for layer in model.layers:
                if hasattr(layer, "layers"):
                    base_model = layer
                    break
        
        if not base_model:
            return None

        last_conv_layer = None
        for layer in reversed(base_model.layers):
            if "conv" in layer.name.lower():
                last_conv_layer = layer
                break
        
        if not last_conv_layer:
            last_conv_layer = base_model.layers[-1]

        grad_model = tf.keras.models.Model(
            inputs=model.inputs,
            outputs=[last_conv_layer.output, model.output]
        )

        with tf.GradientTape() as tape:
            conv_outputs, predictions = grad_model(img_expanded)
            if pred_index is None:
                pred_index = tf.argmax(predictions[0])
            loss = predictions[:, pred_index]

        grads = tape.gradient(loss, conv_outputs)
        pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
        
        conv_outputs = conv_outputs[0]
        heatmap = conv_outputs @ pooled_grads[..., tf.newaxis]
        heatmap = tf.squeeze(heatmap)
        
        heatmap = tf.maximum(heatmap, 0) / (tf.math.reduce_max(heatmap) + 1e-10)
        heatmap = heatmap.numpy()

        heatmap = cv2.resize(heatmap, (224, 224))
        heatmap = np.uint8(255 * heatmap)
        heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)

        superimposed = cv2.addWeighted(img_array, 0.6, heatmap, 0.4, 0)
        
        _, buffer = cv2.imencode('.jpg', superimposed)
        base64_str = base64.b64encode(buffer).decode('utf-8')
        return f"data:image/jpeg;base64,{base64_str}"
    except Exception as e:
        print("Grad-CAM generation error:", e)
        return None

@app.post("/predict")
async def predict_mri(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        img_array, img_expanded = prepare_image(contents)
        
        predictions = model.predict(img_expanded)
        probabilities = predictions[0]
        
        predicted_index = np.argmax(probabilities)
        predicted_class = CLASS_NAMES[predicted_index]
        confidence = float(probabilities[predicted_index])
        
        gradcam_base64 = generate_gradcam(img_array, img_expanded, model, predicted_index)
        
        all_probs = {CLASS_NAMES[i]: float(probabilities[i]) for i in range(len(CLASS_NAMES))}
        
        return {
            "success": True,
            "filename": file.filename,
            "predicted_class": predicted_class,
            "confidence": confidence,
            "probabilities": all_probs,
            "gradcam_image": gradcam_base64
        }
        
    except Exception as e:
        print("Prediction error:", str(e))
        return {"success": False, "error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)