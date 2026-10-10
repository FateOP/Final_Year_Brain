import { useNavigate } from "react-router-dom";
import {
  FaUserInjured,
  FaBrain,
  FaFileMedical,
  FaChartBar,
} from "react-icons/fa";
import { useCase } from "../context/caseContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { cases } = useCase(); // Fetch dynamic case data from context

  // Calculate dynamic stats
  const totalPatients = cases?.length || 0;
  const mriUploaded = totalPatients; // Assuming 1 MRI per patient for simplicity
  const gbmCases = cases?.filter(c => c.diagnosis?.toLowerCase() === 'gbm').length || 0;

  return (
    <div className="w-full">
      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <FaUserInjured className="text-blue-600 text-4xl mb-4" />
          <h3 className="text-gray-500 font-medium">Total Patients</h3>
          <h1 className="text-4xl font-bold mt-2 text-gray-800">{totalPatients}</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <FaBrain className="text-emerald-600 text-4xl mb-4" />
          <h3 className="text-gray-500 font-medium">MRI Uploaded</h3>
          <h1 className="text-4xl font-bold mt-2 text-gray-800">{mriUploaded}</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <FaFileMedical className="text-red-500 text-4xl mb-4" />
          <h3 className="text-gray-500 font-medium">GBM Cases</h3>
          <h1 className="text-4xl font-bold text-red-600 mt-2">{gbmCases}</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <FaChartBar className="text-purple-600 text-4xl mb-4" />
          <h3 className="text-gray-500 font-medium">AI Accuracy</h3>
          <h1 className="text-4xl font-bold text-purple-600 mt-2">96.8%</h1>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <button
          onClick={() => navigate("/patient-form")}
          className="bg-blue-600 hover:bg-blue-700 transition text-white p-8 rounded-2xl shadow-lg text-left"
        >
          <h2 className="text-2xl font-bold">Register Patient</h2>
          <p className="mt-2 text-blue-100">Add new patient record</p>
        </button>

        <button
          onClick={() => navigate("/upload")}
          className="bg-emerald-600 hover:bg-emerald-700 transition text-white p-8 rounded-2xl shadow-lg text-left"
        >
          <h2 className="text-2xl font-bold">MRI Analysis</h2>
          <p className="mt-2 text-emerald-100">Upload MRI scan</p>
        </button>

        <button
          onClick={() => navigate("/reports")}
          className="bg-purple-600 hover:bg-purple-700 transition text-white p-8 rounded-2xl shadow-lg text-left"
        >
          <h2 className="text-2xl font-bold">Reports</h2>
          <p className="mt-2 text-purple-100">View MRI reports</p>
        </button>
      </div>

      {/* AI Status */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-3xl font-bold">AI Model Status</h2>
        <p className="mt-3 text-emerald-50">EfficientNetB0 + Grad-CAM Enabled</p>
        <p className="text-emerald-50">Accuracy: 96.8%</p>
        <div className="bg-white text-emerald-700 inline-block px-4 py-2 rounded-full mt-4 font-bold shadow-sm">
          ONLINE
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Recent MRI Reports</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-4 text-gray-600 font-semibold">Patient</th>
                <th className="py-4 text-gray-600 font-semibold">Date</th>
                <th className="py-4 text-gray-600 font-semibold">Diagnosis</th>
                <th className="py-4 text-gray-600 font-semibold">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {cases && cases.length > 0 ? (
                cases.slice().reverse().slice(0, 5).map((c, index) => (
                  <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
                    <td className="py-4 font-medium text-gray-800">{c.patient?.patientName || "Unknown"}</td>
                    <td className="text-gray-600">{new Date(c.date).toLocaleDateString()}</td>
                    <td className={`font-semibold ${c.diagnosis?.toLowerCase() === 'notumor' ? 'text-green-600' : 'text-red-600'}`}>
                      {c.diagnosis?.toUpperCase() || "N/A"}
                    </td>
                    <td className="text-gray-600">
                      {c.confidence ? (Number(c.confidence) * 100).toFixed(1) + "%" : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-500">
                    No reports generated yet. Register a patient and upload an MRI to see results here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}