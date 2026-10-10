export default function Reports() {
  const reports = [
    {
      patient: "John Doe",
      date: "04-Jun-2026",
      prediction: "GBM",
      confidence: "96.4%",
    },
    {
      patient: "Emily Johnson",
      date: "21-May-2026",
      prediction: "LGG",
      confidence: "92.3%",
    },
    {
      patient: "Rahul Sharma",
      date: "14-Apr-2026",
      prediction: "LGG",
      confidence: "90.7%",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Patient Reports
        </h1>

        <div className="bg-white rounded-3xl shadow p-8">

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
                  Prediction
                </th>

                <th className="text-left py-4">
                  Confidence
                </th>

                <th className="text-left py-4">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {reports.map((report, index) => (

                <tr
                  key={index}
                  className="border-b"
                >

                  <td className="py-4">
                    {report.patient}
                  </td>

                  <td>
                    {report.date}
                  </td>

                  <td>
                    {report.prediction}
                  </td>

                  <td>
                    {report.confidence}
                  </td>

                  <td>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                      View
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}