import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import HealthCenterTable from "../components/HealthCenterTable";

export default function HealthCenters() {
  return (
    <div className="flex bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <h1 className="text-4xl font-bold">
            Health Centers 🏥
          </h1>

          <p className="text-gray-500 mt-2">
            Government health facilities
          </p>

          <HealthCenterTable />

        </div>

      </div>

    </div>
  );
}