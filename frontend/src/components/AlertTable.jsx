import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function AlertTable() {

  const [alerts, setAlerts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAlerts();
  }, []);

async function fetchAlerts() {
  const { data, error } = await supabase
    .from("ai_alerts")
    .select("*");

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (!error) {
    setAlerts(data);
  }
}
  const filteredAlerts = alerts.filter((alert) =>
    alert.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-2xl font-bold">
          AI Alerts
        </h2>

        <input
          type="text"
          placeholder="Search alerts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2"
        />

      </div>

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">District</th>
            <th className="p-3 text-left">Severity</th>
            <th className="p-3 text-left">Description</th>
          </tr>

        </thead>

        <tbody>

          {filteredAlerts.map((alert) => (

            <tr
              key={alert.id}
              className="border-b hover:bg-slate-50"
            >

              <td className="p-3">{alert.title}</td>

              <td className="p-3">{alert.district}</td>

              <td className="p-3">

                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                    alert.severity === "Critical"
                      ? "bg-red-700"
                      : alert.severity === "High"
                      ? "bg-red-500"
                      : alert.severity === "Medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  {alert.severity}
                </span>

              </td>

              <td className="p-3">{alert.description}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}