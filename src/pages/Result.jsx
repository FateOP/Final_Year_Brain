import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertTriangle, Globe, HeartHandshake } from "lucide-react";
import jsPDF from "jspdf";
import { useCase } from "../context/caseContext"; 

// Patient-friendly explanatory texts and translations
const patientExplanations = {
  notumor: {
    en: "Good news! The AI scan analysis shows no signs of a brain tumor. However, always consult your physician if symptoms persist.",
    hi: "अच्छी खबर! एआई स्कैन विश्लेषण से मस्तिष्क ट्यूमर का कोई संकेत नहीं मिलता है। हालांकि, लक्षण बने रहने पर हमेशा अपने डॉक्टर से सलाह लें।",
    mr: "आनंदाची बातमी! एआय स्कॅन विश्लेषणात मेंदूतील गाठीचे (ट्यूमर) कोणतेही लक्षण दिसून आले नाही. तरीही लक्षणे कायम असल्यास आपल्या डॉक्टरांचा सल्ला घ्या.",
    es: "¡Buenas noticias! El análisis de la exploración por IA no muestra signos de un tumor cerebral. Sin embargo, consulte siempre a su médico si los síntomas persisten."
  },
  gbm: {
    en: "The AI scan indicates a Glioblastoma (GBM). This requires immediate follow-up with your neurosurgeon to discuss specialized and urgent treatment plans.",
    hi: "एआई स्कैन ग्लियोब्लास्टोमा (GBM) का संकेत देता है। विशेष उपचार योजनाओं पर चर्चा करने के लिए अपने न्यूरोसर्जन के साथ तत्काल फॉलो-अप की आवश्यकता है।",
    mr: "एआय स्कॅन ग्लिओब्लास्टोमा (GBM) सुचवतो. यावर उपचारांच्या योजनांवर चर्चा करण्यासाठी आपल्या न्यूरोसर्जनशी त्वरित संपर्क साधणे आवश्यक आहे.",
    es: "La exploración por IA indica un Glioblastoma (GBM). Esto requiere un seguimiento inmediato con su neurocirujano para discutir planes de tratamiento especializados."
  },
  lgg: {
    en: "The AI scan indicates a Lower-Grade Glioma (LGG). This requires a prompt follow-up with your neurologist or neurosurgeon to monitor and discuss treatment plans.",
    hi: "एआई स्कैन लोअर-ग्रेड ग्लियोमा (LGG) का संकेत देता है। निगरानी और उपचार पर चर्चा के लिए अपने न्यूरोसर्जन के साथ त्वरित फॉलो-अप की आवश्यकता है।",
    mr: "एआय स्कॅन लोअर-ग्रेड ग्लायोमा (LGG) सुचवतो. पुढील उपचार आणि निरीक्षणासाठी आपल्या न्यूरोलॉजिस्टशी त्वरित संपर्क साधणे आवश्यक आहे.",
    es: "La exploración por IA indica un glioma de bajo grado (LGG). Esto requiere una consulta con su neurólogo para discutir planes de tratamiento."
  },
  glioma: {
    en: "The AI scan indicates a potential glioma (brain tissue growth). This requires a prompt follow-up with your neurologist or neurosurgeon to discuss specialized treatment plans.",
    hi: "एआई स्कैन संभावित ग्लाइमियोमा (मस्तिष्क ऊतक वृद्धि) का संकेत देता है। विशेष उपचार योजनाओं पर चर्चा करने के लिए अपने न्यूरोसर्जन के साथ त्वरित फॉलो-अप की आवश्यकता है।",
    mr: "एआय स्कॅन संभाव्य ग्लायोमा (मेंदूच्या ऊतींची वाढ) सुचवतो. यावर उपचारांच्या योजनांवर चर्चा करण्यासाठी आपल्या न्यूरोलॉजिस्ट किंवा न्यूरोसर्जनशी त्वरित संपर्क साधणे आवश्यक आहे.",
    es: "La exploración por IA indica un posible glioma (crecimiento de tejido cerebral). Esto requiere una consulta rápida con su neurólogo o neurocirujano para discutir planes de tratamiento especializados."
  },
  meningioma: {
    en: "The AI scan suggests a meningioma (a growth in the membranes covering the brain). Most of these are benign and slow-growing, but your doctor will advise on the best course of action.",
    hi: "एआई स्कैन मेनिन्जियोमा (मस्तिष्क को ढकने वाली झिल्लियों में वृद्धि) का सुझाव देता है। इनमें से अधिकांश सौम्य और धीरे-धीरे बढ़ने वाले होते हैं, लेकिन आपके डॉक्टर सर्वोत्तम कार्रवाई की सलाह देंगे।",
    mr: "एआय स्कॅन मेनिन्जियोमा (मेंदूला झाकणाऱ्या आवरणातील वाढ) सुचवतो. यातील बहुतेक गाठी निरुपद्रवी आणि संथ गतीने वाढणाऱ्या असतात, परंतु तुमचे डॉक्टर योग्य त्या उपचाराबद्दल सल्ला देतील.",
    es: "La exploración por IA sugiere un meningioma (un crecimiento en las membranas que cubren el cerebro). La mayoría son benignos y de crecimiento lento, pero su médico le aconsejará los mejores pasos a seguir."
  },
  pituitary: {
    en: "The AI scan indicates a potential pituitary gland finding. Endocrinologists and neurosurgeons will work with you to manage hormone levels and treatment options safely.",
    hi: "एआई स्कैन संभावित पिट्यूटरी ग्रंथि की स्थिति का संकेत देता है। हार्मोन के स्तर और उपचार के विकल्पों को प्रबंधित करने के लिए डॉक्टर आपके साथ मिलकर काम करेंगे।",
    mr: "एआय स्कॅन संभाव्य पिट्यूटरी ग्रंथिची वाढ सुचवतो. संप्रेरक (Hormone) पातळी आणि उपचारांच्या पर्यायांचे सुरक्षित व्यवस्थापन करण्यासाठी डॉक्टर आपल्याला योग्य मार्गदर्शन करतील.",
    es: "La exploración por IA indica un posible hallazgo en la glándula pituitaria. Los especialistas trabajarán con usted para controlar los niveles hormonales y las opciones de tratamiento de forma segura."
  }
};

// Helper function to safely prefix raw base64 images from the backend
const getFormattedImage = (imgSource) => {
  if (!imgSource) return null;
  if (imgSource.startsWith("data:") || imgSource.startsWith("blob:") || imgSource.startsWith("http")) {
    return imgSource;
  }
  return `data:image/jpeg;base64,${imgSource}`;
};

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addCase } = useCase();
  
  const { result, preview } = location.state || {};
  
  const patient = JSON.parse(localStorage.getItem("patient")) || {};

  const [remarks, setRemarks] = useState("");
  const [language, setLanguage] = useState("en");

  const predictedKey = result?.predicted_class?.toLowerCase() || "notumor";
  
  // Safely fallback to "notumor" only if the key genuinely doesn't exist in our expanded list
  const currentExplanation = patientExplanations[predictedKey]?.[language] || patientExplanations["notumor"][language];

  // Apply the formatting fix to the Grad-CAM image
  const displayGradCam = getFormattedImage(result?.gradcam_image);
  const displayPreview = getFormattedImage(preview);

  const handleSaveReport = () => {
    const newCase = {
      patient,
      diagnosis: result?.predicted_class,
      confidence: result?.confidence,
      remarks,
      date: new Date().toISOString(),
      image: result?.gradcam_image || preview
    };
    
    if (addCase) {
        addCase(newCase);
    }
    
    alert("Report saved successfully!");
    navigate("/reports");
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    
    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(29, 78, 216);
    doc.text("City Hospital", 20, 20);
    
    doc.setFontSize(14);
    doc.setTextColor(100, 116, 139);
    doc.text("Neurology Department - MRI Analysis Report", 20, 28);
    doc.line(20, 32, 190, 32);

    // Patient Info
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text("Patient Information", 20, 42);
    
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${patient.patientName || "N/A"}`, 20, 50);
    doc.text(`Age: ${patient.age || "N/A"}`, 20, 56);
    doc.text(`Gender: ${patient.gender || "N/A"}`, 80, 56);
    doc.text(`Doctor: ${patient.doctorName || "N/A"}`, 20, 62);

    // AI Prediction
    doc.setFont("helvetica", "bold");
    doc.text("AI Prediction Findings", 20, 75);
    
    doc.setFont("helvetica", "normal");
    const diagnosisText = predictedKey === "notumor" ? "No Tumor Detected" : (result?.predicted_class?.toUpperCase() || "Unknown");
    doc.text(`Diagnosis: ${diagnosisText}`, 20, 83);
    
    // Safety check for confidence format
    const confidenceValue = result?.confidence ? (Number(result.confidence) * 100).toFixed(1) : "0";
    doc.text(`Confidence: ${confidenceValue}%`, 20, 89);
    
    // Remarks
    if (remarks) {
      doc.setFont("helvetica", "bold");
      doc.text("Doctor Remarks", 20, 100);
      doc.setFont("helvetica", "normal");
      
      const splitRemarks = doc.splitTextToSize(remarks, 170);
      doc.text(splitRemarks, 20, 108);
    }

    // Attach Image / Heatmap
    const imageToPrint = displayGradCam || displayPreview;
    
    if (imageToPrint) {
      const img = new Image();
      // Ensure crossOrigin is set in case of external URLs to avoid canvas poisoning
      img.crossOrigin = "Anonymous";
      img.src = imageToPrint;
      
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        
        const yPos = remarks ? 115 + (doc.splitTextToSize(remarks, 170).length * 6) : 105;
        doc.addImage(canvas.toDataURL("image/jpeg"), "JPEG", 20, yPos, 80, 80);
        
        doc.save(`MRI_Report_${patient.patientName || "Scan"}.pdf`);
      };
      
      // Fallback if image fails to load
      img.onerror = () => {
         doc.save(`MRI_Report_${patient.patientName || "Scan"}.pdf`);
      };
    } else {
      doc.save(`MRI_Report_${patient.patientName || "Scan"}.pdf`);
    }
  };

  const isCritical = predictedKey === "glioma" || predictedKey === "gbm";

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">MRI Analysis Report</h1>

        {isCritical && (
          <div className="bg-red-100 border-l-4 border-red-600 text-red-800 p-4 mb-8 rounded-2xl shadow flex items-start gap-3">
            <AlertTriangle className="text-red-600 w-6 h-6 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-base">CRITICAL PRIORITY ALERT</p>
              <p className="text-sm mt-0.5">Aggressive tumor signature detected with high confidence. Immediate neurosurgical consultation recommended to reduce treatment delay.</p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow p-8">
            <h2 className="text-2xl font-semibold mb-5">Patient Information</h2>
            <p><strong>Name:</strong> {patient.patientName || "N/A"}</p>
            <p><strong>Age:</strong> {patient.age || "N/A"}</p>
            <p><strong>Gender:</strong> {patient.gender || "N/A"}</p>
            <p><strong>Doctor:</strong> {patient.doctorName || "N/A"}</p>
          </div>

          <div className="bg-white rounded-3xl shadow p-8">
            <h2 className="text-2xl font-semibold mb-5">AI Prediction</h2>
            <h1 className={`text-6xl font-bold ${predictedKey === 'notumor' ? 'text-green-600' : 'text-red-600'} uppercase`}>
              {predictedKey === 'notumor' ? 'No Tumor' : result?.predicted_class || "N/A"}
            </h1>
            <p className="mt-4 text-xl">
              Confidence: {result?.confidence ? (Number(result.confidence) * 100).toFixed(1) : "0"}%
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-3xl shadow p-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-3 rounded-2xl text-white">
                <HeartHandshake size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-blue-900">Patient-Friendly Explained Summary</h2>
                <p className="text-sm text-blue-700">Simplified language designed for patients and family members to reduce anxiety.</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-blue-100">
              <Globe size={18} className="text-blue-600" />
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent font-medium text-blue-900 outline-none cursor-pointer"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="mr">मराठी (Marathi)</option>
                <option value="es">Español (Spanish)</option>
              </select>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-blue-100 mt-4">
            <p className="text-gray-800 text-lg leading-relaxed font-medium">
              "{currentExplanation}"
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-3xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Original MRI</h2>
            <img
              src={displayPreview || "https://via.placeholder.com/500x350"}
              alt="MRI"
              className="rounded-xl w-full object-contain h-80 bg-black"
            />
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Grad-CAM Heatmap</h2>
            <img
              src={displayGradCam || displayPreview || "https://via.placeholder.com/500x350"}
              alt="Grad-CAM Heatmap"
              className="rounded-xl w-full object-contain h-80 bg-black"
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow p-8 mt-8">
          <h2 className="text-2xl font-semibold mb-4">Doctor Remarks</h2>
          <textarea
            rows="5"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Enter clinical observations..."
            className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-4 mt-8">
          <button 
            onClick={handleSaveReport} 
            className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-8 py-4 rounded-xl font-semibold shadow"
          >
            Save Report
          </button>

          <button 
            onClick={handleDownloadPDF} 
            className="bg-green-600 hover:bg-green-700 transition-colors text-white px-8 py-4 rounded-xl font-semibold shadow"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}