import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadMRI() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select an MRI scan");
      return;
    }
    // Pass the file and preview URL to the processing page invisibly
    navigate("/processing", { state: { file, preview } });
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow">

        <h1 className="text-4xl font-bold mb-3">
          MRI Upload
        </h1>

        <p className="text-gray-500 mb-8">
          Upload patient's MRI scan for AI analysis
        </p>

        <div className="border-2 border-dashed border-blue-400 rounded-2xl p-12 text-center">

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-5"
          />

          {preview && (
            <div className="mt-6">
              <img
                src={preview}
                alt="MRI Preview"
                className="w-80 mx-auto rounded-xl shadow-lg"
              />

              <p className="mt-4 font-semibold text-green-600">
                {file.name}
              </p>
            </div>
          )}

        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={handleUpload}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl"
          >
            Analyze MRI →
          </button>
        </div>

      </div>
    </div>
  );
}