import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MedicineTable from "../components/MedicineTable";

export default function Inventory() {
  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <h1 className="text-4xl font-bold">
            Medicine Inventory 💊
          </h1>

          <p className="text-gray-500 mt-2">
            Manage medicine stock
          </p>

          <MedicineTable />
        </div>
      </div>
    </div>
  );
}