import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Result() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const storedResult = localStorage.getItem("predictionResult");
    const storedPatient = localStorage.getItem("patient");
    
    if (storedResult) setResult(JSON.parse(storedResult));
    if (storedPatient) setPatient(JSON.parse(storedPatient));
  }, []);

  const handleSaveReport = async () => {
    if (!result) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/save-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_id: patient ? patient.patientName : "Anonymous Patient",
          predicted_class: result.predicted_class,
          confidence: result.confidence
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        alert("Report successfully saved to MongoDB!");
        navigate("/reports");
      } else {
        alert("Failed to save report.");
      }
    } catch (error) {
      console.error("Save Report Error:", error);
      alert("Connection error while saving report.");
    }
  };

  if (!result) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500 mb-4">No analysis results found. Please upload an MRI scan first.</p>
        <button 
          onClick={() => navigate("/upload")} 
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Go to Upload
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Analysis Result</h1>
      <p className="text-gray-500 mb-6">AI Diagnosis and Grad-CAM Visualization</p>

      {patient && (
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl mb-6 flex justify-between items-center text-sm">
          <div>
            <span className="text-gray-500">Patient: </span>
            <span className="font-bold text-gray-800">{patient.patientName}</span>
          </div>
          <div>
            <span className="text-gray-500">Age/Gender: </span>
            <span className="font-bold text-gray-800">{patient.age} yrs / {patient.gender}</span>
          </div>
          <div>
            <span className="text-gray-500">Doctor: </span>
            <span className="font-bold text-gray-800">{patient.doctorName}</span>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 bg-white p-8 rounded-3xl shadow-lg border border-gray-100 mb-6">
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Original MRI Scan</h3>
          <div className="bg-slate-100 rounded-2xl h-64 flex items-center justify-center overflow-hidden border">
            {result.filename ? (
              <span className="text-gray-600 font-medium">{result.filename}</span>
            ) : (
              <span className="text-gray-400">MRI Image</span>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Grad-CAM Heatmap</h3>
          <div className="bg-slate-100 rounded-2xl h-64 flex items-center justify-center overflow-hidden border">
            {result.gradcam_image ? (
              <img src={result.gradcam_image} alt="Grad-CAM" className="h-full object-contain" />
            ) : (
              <span className="text-gray-400">Loading Heatmap...</span>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col md:flex-row justify-between items-center">
        <div>
          <p className="text-gray-400 text-sm font-medium">Predicted Classification</p>
          <h2 className="text-3xl font-extrabold uppercase text-blue-600 mt-1">{result.predicted_class}</h2>
          <p className="text-gray-600 mt-1">Confidence: <span className="font-bold text-gray-800">{(result.confidence * 100).toFixed(1)}%</span></p>
        </div>

        <button
          onClick={handleSaveReport}
          className="mt-6 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-md transition-colors"
        >
          Save Report to DB →
        </button>
      </div>
    </div>
  );
}