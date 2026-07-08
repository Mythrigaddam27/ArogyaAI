import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const outbreakData = [
  {
    district: "Hyderabad",
    disease: "Dengue",
    risk: "High",
    recommendation: "Increase mosquito control and awareness.",
    position: [17.3850, 78.4867],
    color: "#ef4444",
  },
  {
    district: "Warangal",
    disease: "Malaria",
    risk: "Medium",
    recommendation: "Spray breeding areas.",
    position: [17.9689, 79.5941],
    color: "#f59e0b",
  },
  {
    district: "Karimnagar",
    disease: "Medicine Shortage",
    risk: "Medium",
    recommendation: "Restock ORS and Paracetamol.",
    position: [18.4386, 79.1288],
    color: "#f59e0b",
  },
  {
    district: "Adilabad",
    disease: "Water Contamination",
    risk: "High",
    recommendation: "Issue boil-water advisory.",
    position: [19.6641, 78.5320],
    color: "#ef4444",
  },
  {
    district: "Khammam",
    disease: "Seasonal Flu",
    risk: "Low",
    recommendation: "Promote vaccination.",
    position: [17.2473, 80.1514],
    color: "#22c55e",
  },
];

const riskStyles = {
  High: "bg-red-100 text-red-700 border-red-200",
  Medium: "bg-amber-100 text-amber-700 border-amber-200",
  Low: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const getCustomIcon = (color) =>
  L.divIcon({
    className: "",
    html: `<div style="background:${color}; width:16px; height:16px; border-radius:999px; border:3px solid white; box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>`,
  });

export default function HealthMap() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">
            Live Public Health Overview
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-800">
            Telangana Health Outbreak Map
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Monitor outbreak hotspots and recommended public health action in real time.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {Object.entries(riskStyles).map(([risk, classes]) => (
            <span key={risk} className={`rounded-full border px-3 py-1 text-sm font-medium ${classes}`}>
              {risk}
            </span>
          ))}
        </div>
      </div>

      <div className="h-[520px] overflow-hidden rounded-2xl border border-slate-200">
        <MapContainer center={[17.8497, 79.7523]} zoom={7} scrollWheelZoom className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {outbreakData.map((item) => (
            <Marker key={item.district} position={item.position} icon={getCustomIcon(item.color)}>
              <Popup>
                <div className="min-w-[220px] space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-slate-800">{item.district}</h3>
                    <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${riskStyles[item.risk]}`}>
                      {item.risk}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold text-slate-700">Disease:</span> {item.disease}
                  </p>
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold text-slate-700">Recommendation:</span> {item.recommendation}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
