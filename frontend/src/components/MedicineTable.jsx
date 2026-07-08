import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Trash2, Search } from "lucide-react";

export default function MedicineTable() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMedicines();
  }, []);

  async function fetchMedicines() {
    const { data, error } = await supabase
      .from("medicines")
      .select("*")
      .order("id");

    if (!error) setMedicines(data);
    else console.log(error);
  }

  async function deleteMedicine(id) {
    if (!window.confirm("Delete this medicine?")) return;

    await supabase
      .from("medicines")
      .delete()
      .eq("id", id);

    fetchMedicines();
  }

  const filtered = medicines.filter((m) =>
    m.medicine_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

      <div className="flex justify-between mb-5">

        <h2 className="text-2xl font-bold">
          Medicines
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
            + Add Medicine
          </button>

        </div>

      </div>

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>
            <th className="p-3 text-left">Medicine</th>
            <th>Stock</th>
            <th>Expiry</th>
            <th>Supplier</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {filtered.map((m)=>(
            <tr key={m.id} className="border-b hover:bg-slate-50">

              <td className="p-3">{m.medicine_name}</td>
              <td>{m.stock}</td>
              <td>{m.expiry_date}</td>
              <td>{m.supplier}</td>

              <td>

                <button
                  onClick={()=>deleteMedicine(m.id)}
                  className="bg-red-500 p-2 rounded-lg text-white"
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