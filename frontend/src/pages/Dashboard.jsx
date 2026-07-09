import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import AIHealthSummary from "../components/AIHealthSummary";
import PatientChart from "../components/charts/PatientChart";
import MedicineChart from "../components/charts/MedicineChart";
import RecentPatients from "../components/RecentPatients";
import LowStockMedicines from "../components/LowStockMedicines";
import HealthScore from "../components/HealthScore";

import {
  Users,
  Pill,
  TriangleAlert,
  Building2,
} from "lucide-react";

export default function Dashboard() {

  const [stats, setStats] = useState({
    patients: 0,
    medicines: 0,
    centers: 0,
    alerts: 0,
  });

  useEffect(() => {
    async function fetchStats() {

      const { count: patients } = await supabase
        .from("patients")
        .select("*", { count: "exact", head: true });

      const { count: medicines } = await supabase
        .from("medicines")
        .select("*", { count: "exact", head: true });

      const { count: centers } = await supabase
        .from("health_centers")
        .select("*", { count: "exact", head: true });

      const { count: alerts } = await supabase
        .from("ai_alerts")
        .select("*", { count: "exact", head: true });

      setStats({
        patients,
        medicines,
        centers,
        alerts,
      });
    }

    fetchStats();
  }, []);

  // Download Report
  const downloadReport = () => {
    window.open("https://arogyaai-10at.onrender.com/report", "_blank");
  };

  return (
    <div className="flex bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <h1 className="text-4xl font-bold">
            Welcome to ArogyaAI 🚀
          </h1>

          <p className="text-gray-600 mt-2">
            AI-powered Public Health Intelligence Platform
          </p>

          <div className="grid grid-cols-4 gap-6 mt-8">

            <DashboardCard
              title="Patients"
              value={stats.patients}
              color="bg-blue-600"
              icon={<Users size={42} />}
            />

            <DashboardCard
              title="Medicines"
              value={stats.medicines}
              color="bg-green-600"
              icon={<Pill size={42} />}
            />

            <DashboardCard
              title="AI Alerts"
              value={stats.alerts}
              color="bg-red-500"
              icon={<TriangleAlert size={42} />}
            />

            <DashboardCard
              title="Health Centers"
              value={stats.centers}
              color="bg-purple-600"
              icon={<Building2 size={42} />}
            />

          </div>

          {/* Download Button */}

          <div className="mt-8">

            <button
              onClick={downloadReport}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg"
            >
              📄 Download Health Report
            </button>

          </div>

          <div className="grid grid-cols-2 gap-6 mt-8">
            <AIHealthSummary />
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8">
            <PatientChart />
            <MedicineChart />
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8">
            <RecentPatients />
            <LowStockMedicines />
          </div>

          <div className="mt-8">
            <HealthScore />
          </div>

        </div>
      </div>
    </div>
  );
}