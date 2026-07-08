import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Search } from "lucide-react";

export default function HealthCenterTable() {
  const [centers, setCenters] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCenters();
  }, []);

  async function fetchCenters() {
    const { data } = await supabase
      .from("health_centers")
      .select("*");

    setCenters(data || []);
  }

  const filtered = centers.filter((center) =>
    center.center_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

      <div className="flex justify-between mb-5">

        <h2 className="text-2xl font-bold">
          Health Centers
        </h2>

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="border rounded-lg pl-10 pr-4 py-2"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

        </div>

      </div>

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>
            <th className="p-3">Center</th>
            <th>District</th>
            <th>Doctors</th>
            <th>Nurses</th>
          </tr>

        </thead>

        <tbody>

          {filtered.map(center=>(
            <tr key={center.id} className="border-b hover:bg-slate-50">

              <td className="p-3">
                {center.center_name}
              </td>

              <td>{center.district}</td>

              <td>{center.doctors}</td>

              <td>{center.nurses}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}