import { useState, useEffect } from "react";

export default function Analytics() {
  // Initialize state to hold data from the MongoDB backend
  const [stats, setStats] = useState({
    total_patients: 0,
    mri_uploaded: 0,
    gbm_cases: 0,       // maps to 'glioma'
    lgg_cases: 0,       // maps to 'meningioma'
    pituitary_cases: 0, // maps to 'pituitary'
    accuracy: 96.8
  });

  // Fetch live stats when the dashboard loads
  useEffect(() => {
    fetch("http://127.0.0.1:8000/analytics")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to fetch analytics:", err));
  }, []);

  // Calculate percentages for distribution bars (safeguard against division by zero)
  const totalTumors = stats.gbm_cases + stats.lgg_cases + stats.pituitary_cases;
  
  const gbmPercentage = totalTumors > 0 ? ((stats.gbm_cases / totalTumors) * 100).toFixed(0) : 0;
  const lggPercentage = totalTumors > 0 ? ((stats.lgg_cases / totalTumors) * 100).toFixed(0) : 0;
  const pituitaryPercentage = totalTumors > 0 ? ((stats.pituitary_cases / totalTumors) * 100).toFixed(0) : 0;

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold mb-2 text-gray-800">Analytics Dashboard</h1>
      <p className="text-gray-500 mb-8">AI Model Performance & Hospital Statistics</p>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-gray-500 font-medium">Total Patients</h3>
          <h1 className="text-4xl font-bold mt-3 text-gray-800">{stats.total_patients}</h1>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-gray-500 font-medium">MRI Uploaded</h3>
          <h1 className="text-4xl font-bold mt-3 text-gray-800">{stats.mri_uploaded}</h1>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-gray-500 font-medium">Glioma Cases</h3>
          <h1 className="text-4xl font-bold text-red-600 mt-3">{stats.gbm_cases}</h1>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-gray-500 font-medium">Meningioma Cases</h3>
          <h1 className="text-4xl font-bold text-orange-500 mt-3">{stats.lgg_cases}</h1>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* AI Performance */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">AI Model Performance</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between font-medium text-gray-700 mb-2">
                <span>Real-Time AI Confidence Average</span>
                <span>{stats.accuracy}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500" 
                  style={{ width: `${stats.accuracy}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-medium text-gray-700 mb-2">
                <span>Baseline Precision</span>
                <span>95.9%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-emerald-500 h-3 rounded-full w-[95.9%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-medium text-gray-700 mb-2">
                <span>Baseline Recall</span>
                <span>95.5%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-orange-500 h-3 rounded-full w-[95.5%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-medium text-gray-700 mb-2">
                <span>Baseline F1 Score</span>
                <span>95.7%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-purple-600 h-3 rounded-full w-[95.7%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Tumor Distribution */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Tumor Distribution</h2>
          <div className="space-y-6">
            
            {/* Glioma (GBM) */}
            <div>
              <div className="flex justify-between font-medium mb-2">
                <span className="text-gray-700">Glioma (GBM)</span>
                <span className="font-bold text-red-600">{stats.gbm_cases} Cases ({gbmPercentage}%)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4">
                <div 
                  className="bg-red-500 h-4 rounded-full transition-all duration-500" 
                  style={{ width: `${gbmPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Meningioma (LGG) */}
            <div>
              <div className="flex justify-between font-medium mb-2">
                <span className="text-gray-700">Meningioma (LGG)</span>
                <span className="font-bold text-orange-500">{stats.lgg_cases} Cases ({lggPercentage}%)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4">
                <div 
                  className="bg-orange-400 h-4 rounded-full transition-all duration-500" 
                  style={{ width: `${lggPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Pituitary */}
            <div>
              <div className="flex justify-between font-medium mb-2">
                <span className="text-gray-700">Pituitary</span>
                <span className="font-bold text-indigo-500">{stats.pituitary_cases} Cases ({pituitaryPercentage}%)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4">
                <div 
                  className="bg-indigo-500 h-4 rounded-full transition-all duration-500" 
                  style={{ width: `${pituitaryPercentage}%` }}
                ></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}