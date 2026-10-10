import { useCase } from "../context/caseContext";

export default function Analytics() {
  const { cases } = useCase();

  // Dynamic Calculations based on context state
  const totalPatients = cases?.length || 0;
  const mriUploaded = totalPatients; // Assuming 1:1 ratio for the prototype
  
  const gbmCases = cases?.filter(c => c.diagnosis?.toLowerCase() === 'gbm').length || 0;
  const lggCases = cases?.filter(c => c.diagnosis?.toLowerCase() === 'lgg').length || 0;
  const meningiomaCases = cases?.filter(c => c.diagnosis?.toLowerCase() === 'meningioma').length || 0;
  
  // Calculate percentages for distribution bars (safeguard against division by zero)
  const gbmPercentage = totalPatients > 0 ? ((gbmCases / totalPatients) * 100).toFixed(0) : 0;
  const lggPercentage = totalPatients > 0 ? ((lggCases / totalPatients) * 100).toFixed(0) : 0;
  const meningiomaPercentage = totalPatients > 0 ? ((meningiomaCases / totalPatients) * 100).toFixed(0) : 0;

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold mb-2 text-gray-800">Analytics Dashboard</h1>
      <p className="text-gray-500 mb-8">AI Model Performance & Hospital Statistics</p>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-gray-500 font-medium">Total Patients</h3>
          <h1 className="text-4xl font-bold mt-3 text-gray-800">{totalPatients}</h1>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-gray-500 font-medium">MRI Uploaded</h3>
          <h1 className="text-4xl font-bold mt-3 text-gray-800">{mriUploaded}</h1>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-gray-500 font-medium">GBM Cases</h3>
          <h1 className="text-4xl font-bold text-red-600 mt-3">{gbmCases}</h1>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-gray-500 font-medium">LGG Cases</h3>
          <h1 className="text-4xl font-bold text-orange-500 mt-3">{lggCases}</h1>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* AI Performance (Static Base Model Stats) */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">AI Model Performance</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between font-medium text-gray-700 mb-2">
                <span>Accuracy</span>
                <span>96.8%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full w-[96.8%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-medium text-gray-700 mb-2">
                <span>Precision</span>
                <span>95.9%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-emerald-500 h-3 rounded-full w-[95.9%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-medium text-gray-700 mb-2">
                <span>Recall</span>
                <span>95.5%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-orange-500 h-3 rounded-full w-[95.5%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-medium text-gray-700 mb-2">
                <span>F1 Score</span>
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
            
            {/* GBM */}
            <div>
              <div className="flex justify-between font-medium mb-2">
                <span className="text-gray-700">Glioblastoma (GBM)</span>
                <span className="font-bold text-red-600">{gbmCases} Cases ({gbmPercentage}%)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4">
                <div 
                  className="bg-red-500 h-4 rounded-full transition-all duration-500" 
                  style={{ width: `${gbmPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* LGG */}
            <div>
              <div className="flex justify-between font-medium mb-2">
                <span className="text-gray-700">Lower-Grade Glioma (LGG)</span>
                <span className="font-bold text-orange-500">{lggCases} Cases ({lggPercentage}%)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4">
                <div 
                  className="bg-orange-400 h-4 rounded-full transition-all duration-500" 
                  style={{ width: `${lggPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Meningioma */}
            <div>
              <div className="flex justify-between font-medium mb-2">
                <span className="text-gray-700">Meningioma</span>
                <span className="font-bold text-indigo-500">{meningiomaCases} Cases ({meningiomaPercentage}%)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4">
                <div 
                  className="bg-indigo-500 h-4 rounded-full transition-all duration-500" 
                  style={{ width: `${meningiomaPercentage}%` }}
                ></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}