import { Bell, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center bg-white p-5 shadow">
      <div>
        <h2 className="text-3xl font-bold">
          AI Health Command Center
        </h2>

        <p className="text-gray-500">
          Smart Health Monitoring Dashboard
        </p>
      </div>

      <div className="flex gap-6 items-center">
        <Bell />
        <UserCircle size={34} />
      </div>
    </div>
  );
}