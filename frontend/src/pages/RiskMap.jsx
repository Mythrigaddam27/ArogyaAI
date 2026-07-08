import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DiseaseRiskMap from "../components/DiseaseRiskMap";

export default function RiskMap() {
  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <h1 className="text-4xl font-bold">
            🗺 Disease Risk Map
          </h1>

          <p className="text-gray-500 mt-2">
            AI-powered visualization of disease risk across districts.
          </p>

          <DiseaseRiskMap />
        </div>
      </div>
    </div>
  );
}