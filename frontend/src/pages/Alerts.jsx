import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AlertTable from "../components/AlertTable";

export default function Alerts() {
  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">

          <h1 className="text-4xl font-bold">
            AI Alerts 🚨
          </h1>

          <p className="text-gray-500 mt-2">
            AI-generated health alerts
          </p>

          <AlertTable />

        </div>
      </div>
    </div>
  );
}