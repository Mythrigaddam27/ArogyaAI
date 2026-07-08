import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const districts = [
  {
    name: "Hyderabad",
    lat: 17.385,
    lng: 78.4867,
    risk: "High",
    color: "red",
  },
  {
    name: "Warangal",
    lat: 17.9689,
    lng: 79.5941,
    risk: "Medium",
    color: "orange",
  },
  {
    name: "Karimnagar",
    lat: 18.4386,
    lng: 79.1288,
    risk: "Low",
    color: "green",
  },
  {
    name: "Nizamabad",
    lat: 18.6725,
    lng: 78.0941,
    risk: "Medium",
    color: "orange",
  },
  {
    name: "Khammam",
    lat: 17.2473,
    lng: 80.1514,
    risk: "High",
    color: "red",
  },
];

export default function DiseaseRiskMap() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-5">
        🗺 Disease Risk Map
      </h2>

      <MapContainer
        center={[17.8, 79.2]}
        zoom={7}
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "15px",
        }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {districts.map((district, index) => (
          <CircleMarker
            key={index}
            center={[district.lat, district.lng]}
            radius={12}
            pathOptions={{
              color: district.color,
              fillColor: district.color,
              fillOpacity: 0.8,
            }}
          >
            <Popup>
              <h3 className="font-bold">{district.name}</h3>

              <p>Risk Level: {district.risk}</p>

              <p>
                AI Recommendation:
                <br />
                Increase surveillance and medicine availability.
              </p>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}