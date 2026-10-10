import { useNavigate } from "react-router-dom";
import {
  FaHospital,
  FaUserInjured,
  FaBrain,
  FaFileMedical,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* Sidebar */}
      <div className="w-72 bg-blue-900 text-white min-h-screen shadow-xl">

        <div className="p-6 border-b border-blue-800">

          <div className="flex items-center gap-3">

            <FaHospital size={35} />

            <div>
              <h1 className="text-xl font-bold">
                City Hospital
              </h1>

              <p className="text-sm text-blue-200">
                Brain Tumor AI System
              </p>
            </div>

          </div>

        </div>

        <div className="p-5">

          <button className="w-full text-left bg-blue-700 p-4 rounded-xl mb-3 font-semibold">
            Dashboard
          </button>

          <button
            onClick={() => navigate("/patient-form")}
            className="w-full text-left hover:bg-blue-800 p-4 rounded-xl mb-3"
          >
            Patient Registration
          </button>

          <button
            onClick={() => navigate("/upload")}
            className="w-full text-left hover:bg-blue-800 p-4 rounded-xl mb-3"
          >
            MRI Upload
          </button>

          <button
            onClick={() => navigate("/reports")}
            className="w-full text-left hover:bg-blue-800 p-4 rounded-xl mb-3"
          >
            Reports
          </button>

          <button
            onClick={() => navigate("/analytics")}
            className="w-full text-left hover:bg-blue-800 p-4 rounded-xl mb-3"
          >
            Analytics
          </button>

          <button className="w-full text-left hover:bg-blue-800 p-4 rounded-xl mb-3">
            <FaCog className="inline mr-2" />
            Settings
          </button>

        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">

        {/* Top Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-bold text-gray-800">
              Doctor Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Welcome back, Dr. Sharma
            </p>

          </div>

          <div className="flex items-center gap-5">

            <div className="text-right">

              <h3 className="font-bold">
                Neurology Department
              </h3>

              <p className="text-gray-500">
                City Hospital
              </p>

            </div>

            <div className="w-14 h-14 bg-blue-600 rounded-full text-white flex items-center justify-center font-bold">
              DS
            </div>

            <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl">
              <FaSignOutAlt />
            </button>

          </div>

        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <FaUserInjured className="text-blue-600 text-4xl mb-4" />

            <h3 className="text-gray-500">
              Total Patients
            </h3>

            <h1 className="text-4xl font-bold mt-2">
              128
            </h1>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <FaBrain className="text-green-600 text-4xl mb-4" />

            <h3 className="text-gray-500">
              MRI Uploaded
            </h3>

            <h1 className="text-4xl font-bold mt-2">
              89
            </h1>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <FaFileMedical className="text-red-600 text-4xl mb-4" />

            <h3 className="text-gray-500">
              GBM Cases
            </h3>

            <h1 className="text-4xl font-bold text-red-600 mt-2">
              25
            </h1>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <FaChartBar className="text-purple-600 text-4xl mb-4" />

            <h3 className="text-gray-500">
              AI Accuracy
            </h3>

            <h1 className="text-4xl font-bold text-purple-600 mt-2">
              96.8%
            </h1>

          </div>

        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <button
            onClick={() => navigate("/patient-form")}
            className="bg-blue-600 hover:bg-blue-700 text-white p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-bold">
              Register Patient
            </h2>

            <p className="mt-2">
              Add new patient record
            </p>
          </button>

          <button
            onClick={() => navigate("/upload")}
            className="bg-green-600 hover:bg-green-700 text-white p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-bold">
              MRI Analysis
            </h2>

            <p className="mt-2">
              Upload MRI scan
            </p>
          </button>

          <button
            onClick={() => navigate("/reports")}
            className="bg-purple-600 hover:bg-purple-700 text-white p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-bold">
              Reports
            </h2>

            <p className="mt-2">
              View MRI reports
            </p>
          </button>

        </div>

        {/* AI Status */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-lg p-8 mb-8">

          <h2 className="text-3xl font-bold">
            AI Model Status
          </h2>

          <p className="mt-3">
            ResNet50 + Grad-CAM Enabled
          </p>

          <p>
            Accuracy: 96.8%
          </p>

          <div className="bg-white text-green-600 inline-block px-4 py-2 rounded-full mt-4 font-bold">
            ONLINE
          </div>

        </div>

        {/* Recent Reports */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-3xl font-bold mb-6">
            Recent MRI Reports
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-4">
                  Patient
                </th>

                <th className="text-left py-4">
                  Date
                </th>

                <th className="text-left py-4">
                  Diagnosis
                </th>

                <th className="text-left py-4">
                  Confidence
                </th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-b">

                <td className="py-4">
                  John Doe
                </td>

                <td>
                  04-Jun-2026
                </td>

                <td className="text-red-600 font-semibold">
                  GBM
                </td>

                <td>
                  96.4%
                </td>

              </tr>

              <tr>

                <td className="py-4">
                  Emily Johnson
                </td>

                <td>
                  02-Jun-2026
                </td>

                <td className="text-green-600 font-semibold">
                  LGG
                </td>

                <td>
                  92.3%
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}