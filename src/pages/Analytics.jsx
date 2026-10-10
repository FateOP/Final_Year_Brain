export default function Analytics() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          Analytics Dashboard
        </h1>

        <p className="text-gray-500 mb-8">
          AI Model Performance & Hospital Statistics
        </p>

        {/* Statistics Cards */}

        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">
              Total Patients
            </h3>

            <h1 className="text-4xl font-bold mt-3">
              128
            </h1>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">
              MRI Uploaded
            </h3>

            <h1 className="text-4xl font-bold mt-3">
              89
            </h1>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">
              GBM Cases
            </h3>

            <h1 className="text-4xl font-bold text-red-600 mt-3">
              25
            </h1>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">
              LGG Cases
            </h3>

            <h1 className="text-4xl font-bold text-green-600 mt-3">
              64
            </h1>
          </div>

        </div>

        {/* AI Performance */}

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-white p-8 rounded-2xl shadow">

            <h2 className="text-2xl font-bold mb-6">
              AI Model Performance
            </h2>

            <div className="space-y-6">

              <div>
                <div className="flex justify-between">
                  <span>Accuracy</span>
                  <span>96.8%</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                  <div className="bg-blue-600 h-4 rounded-full w-[96%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <span>Precision</span>
                  <span>95.9%</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                  <div className="bg-green-600 h-4 rounded-full w-[95%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <span>Recall</span>
                  <span>95.5%</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                  <div className="bg-orange-500 h-4 rounded-full w-[95%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <span>F1 Score</span>
                  <span>95.7%</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                  <div className="bg-purple-600 h-4 rounded-full w-[95%]"></div>
                </div>
              </div>

            </div>

          </div>

          {/* Tumor Distribution */}

          <div className="bg-white p-8 rounded-2xl shadow">

            <h2 className="text-2xl font-bold mb-6">
              Tumor Distribution
            </h2>

            <div className="space-y-5">

              <div className="flex justify-between">
                <span>GBM</span>
                <span className="font-bold text-red-600">
                  25 Cases
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-5">
                <div className="bg-red-500 h-5 rounded-full w-[28%]"></div>
              </div>

              <div className="flex justify-between mt-6">
                <span>LGG</span>
                <span className="font-bold text-green-600">
                  64 Cases
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-5">
                <div className="bg-green-500 h-5 rounded-full w-[72%]"></div>
              </div>

            </div>

          </div>

        </div>

        {/* Monthly Analysis */}

        <div className="bg-white p-8 rounded-2xl shadow mt-8">

          <h2 className="text-2xl font-bold mb-6">
            Monthly MRI Analysis
          </h2>

          <div className="flex items-end gap-8 h-64">

            <div className="flex flex-col items-center">
              <div className="bg-blue-500 w-16 h-24 rounded-t"></div>
              <p className="mt-2">Jan</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-blue-500 w-16 h-32 rounded-t"></div>
              <p className="mt-2">Feb</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-blue-500 w-16 h-40 rounded-t"></div>
              <p className="mt-2">Mar</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-blue-500 w-16 h-52 rounded-t"></div>
              <p className="mt-2">Apr</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-blue-500 w-16 h-48 rounded-t"></div>
              <p className="mt-2">May</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-blue-500 w-16 h-60 rounded-t"></div>
              <p className="mt-2">Jun</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}