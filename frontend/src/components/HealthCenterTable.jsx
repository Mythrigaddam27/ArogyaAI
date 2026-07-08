import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Search, Trash2 } from "lucide-react";

export default function HealthCenterTable() {
  const [centers, setCenters] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCenters();
  }, []);

  async function fetchCenters() {
    const { data, error } = await supabase
      .from("health_centers")
      .select("*")
      .order("id");

    if (!error) setCenters(data);
    else console.log(error);
  }

  async function deleteCenter(id) {
    if (!window.confirm("Delete this center?")) return;

    await supabase
      .from("health_centers")
      .delete()
      .eq("id", id);

    fetchCenters();
  }

  const filtered = centers.filter((c) =>
    c.center_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

      <div className="flex justify-between mb-5">

        <h2 className="text-2xl font-bold">
          Health Centers
        </h2>

        <div className="flex gap-3">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              className="border rounded-lg pl-10 pr-4 py-2"
            />

          </div>

          <button className="bg-blue-600 text-white px-4 rounded-lg">
            + Add Center
          </button>

        </div>

      </div>

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>
            <th className="p-3 text-left">Center</th>
            <th>District</th>
            <th>Doctors</th>
            <th>Nurses</th>
            <th>Beds</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {filtered.map((c)=>(
            <tr
              key={c.id}
              className="border-b hover:bg-slate-50"
            >

              <td className="p-3">{c.center_name}</td>
              <td>{c.district}</td>
              <td>{c.doctors}</td>
              <td>{c.nurses}</td>
              <td>{c.beds}</td>

              <td>

                <button
                  onClick={()=>deleteCenter(c.id)}
                  className="bg-red-500 text-white p-2 rounded-lg"
                >
                  <Trash2 size={18}/>
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}