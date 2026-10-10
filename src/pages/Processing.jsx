import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Processing() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const processScan = async () => {
      const file = location.state?.file;
      const preview = location.state?.preview;

      if (!file) {
        navigate("/upload");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:8000/predict", {
          method: "POST",
          body: formData,
        });

        // FIX: Explicitly catch non-200 HTTP responses
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();

        // Ensure the backend returns data.success
        if (data.success || data.predicted_class) {
          navigate("/result", { state: { result: data, preview } });
        } else {
          alert("Analysis failed: " + (data.error || "Unknown error"));
          navigate("/upload");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to connect to the AI Server. Please ensure the Python backend is running.");
        navigate("/upload");
      }
    };

    processScan();
  }, [navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-12 rounded-3xl shadow text-center">
        <div className="animate-spin rounded-full h-24 w-24 border-b-4 border-blue-600 mx-auto"></div>
        <h1 className="text-3xl font-bold mt-8">Processing MRI Scan</h1>
        <p className="text-gray-500 mt-3">AI model is analyzing the image...</p>
      </div>
    </div>
  );
}