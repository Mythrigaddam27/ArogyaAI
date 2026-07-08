import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PatientTable from "../components/PatientTable";

export default function Patients() {
  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <h1 className="text-4xl font-bold">
            Patients 👨‍⚕️
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all registered patients
          </p>

          <PatientTable />
        </div>
      </div>
    </div>
  );
}