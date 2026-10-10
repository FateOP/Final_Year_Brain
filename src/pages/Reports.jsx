import { useCase } from "../context/caseContext";

export default function Reports() {
  const { cases } = useCase(); // Fetch dynamic cases

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Patient Reports</h1>

      <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-4 text-gray-600 font-semibold">Patient</th>
                <th className="py-4 text-gray-600 font-semibold">Date</th>
                <th className="py-4 text-gray-600 font-semibold">Prediction</th>
                <th className="py-4 text-gray-600 font-semibold">Confidence</th>
                <th className="py-4 text-gray-600 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {cases && cases.length > 0 ? (
                cases.slice().reverse().map((report, index) => (
                  <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
                    <td className="py-4 font-medium text-gray-800">
                      {report.patient?.patientName || "Unknown"}
                    </td>
                    <td className="text-gray-600">
                      {new Date(report.date).toLocaleDateString()}
                    </td>
                    <td className={`font-semibold ${report.diagnosis?.toLowerCase() === 'notumor' ? 'text-green-600' : 'text-red-600'}`}>
                      {report.diagnosis?.toUpperCase() || "N/A"}
                    </td>
                    <td className="text-gray-600">
                      {report.confidence ? (Number(report.confidence) * 100).toFixed(1) + "%" : "N/A"}
                    </td>
                    <td>
                      <button className="bg-blue-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-blue-700 transition shadow-sm">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-gray-500">
                    <p className="text-lg mb-2">No reports available.</p>
                    <p className="text-sm">Processed MRI scans will appear here.</p>
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