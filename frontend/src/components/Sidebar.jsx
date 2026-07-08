import { NavLink } from "react-router-dom";
import { Bot, Map, Stethoscope, MapPinned } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  Pill,
  Building2,
  TriangleAlert,
} from "lucide-react";

const menu = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Patients", path: "/patients", icon: Users },
  { name: "Inventory", path: "/inventory", icon: Pill },
  { name: "Health Centers", path: "/centers", icon: Building2 },
  { name: "AI Alerts", path: "/alerts", icon: TriangleAlert },
  { name: "AI Assistant", path: "/ai-assistant", icon: Bot },
  { name: "Disease Predictor", path: "/predict", icon: Stethoscope },
  { name: "Health Map", path: "/health-map", icon: MapPinned },
  { name: "Disease Risk Map", path: "/risk-map", icon: Map },
];

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-10 text-cyan-400">
        🏥 ArogyaAI
      </h1>

      <div className="space-y-3">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-xl transition ${
                  isActive
                    ? "bg-cyan-500 text-white"
                    : "hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}