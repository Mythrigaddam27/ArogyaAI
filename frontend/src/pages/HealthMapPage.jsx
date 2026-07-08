import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import HealthMap from "../components/HealthMap";

export default function HealthMapPage() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800">🗺️ Health Outbreak Map</h1>
            <p className="mt-2 text-gray-600">
              Track disease hotspots and recommended interventions across Telangana districts.
            </p>
          </div>

          <HealthMap />
        </div>
      </div>
    </div>
  );
}
