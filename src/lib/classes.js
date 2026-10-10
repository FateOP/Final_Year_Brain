// Single source of truth for the model's classes. Must match your backend labels.
export const CLASSES = {
  notumor: { label: "No Tumor", color: "#10b981", tumor: false, critical: false },
  glioma: { label: "Glioma", color: "#f43f5e", tumor: true, critical: true },
  meningioma: { label: "Meningioma", color: "#a855f7", tumor: true, critical: false },
  pituitary: { label: "Pituitary", color: "#3b82f6", tumor: true, critical: false },
};

export const CLASS_KEYS = Object.keys(CLASSES);

export function getClass(key) {
  return CLASSES[String(key ?? "").toLowerCase()] ?? null;
}

// Below this confidence (0-1) the result is treated as inconclusive.
export const LOW_CONFIDENCE = 0.7;

// UPDATE these with your real, verified evaluation numbers.
export const MODEL_INFO = {
  architecture: "EfficientNetB0",
  testAccuracy: 0.848,
  epochs: 15,
  datasetSize: 12064,
  distribution: { glioma: 3773, meningioma: 2729, pituitary: 3130, notumor: 2432 },
};

export const DISCLAIMER =
  "Research prototype - not a medical device. AI output must be reviewed by a qualified clinician and must not be the sole basis for diagnosis or treatment.";