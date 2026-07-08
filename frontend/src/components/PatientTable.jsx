import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Trash2, Search } from "lucide-react";
import AddPatientModal from "./AddPatientModal";
export default function PatientTable() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .order("id", { ascending: true });

    if (!error) {
      setPatients(data);
    }
  }

  async function deletePatient(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (!confirmDelete) return;

    await supabase
      .from("patients")
      .delete()
      .eq("id", id);

    fetchPatients();
  }

  const filteredPatients = patients.filter((patient) =>
    patient.full_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

      <div className="flex justify-between items-center mb-5">

  <h2 className="text-2xl font-bold">
    Patient Records
  </h2>

  <div className="flex gap-3">

    <div className="relative">
      <Search
        size={18}
        className="absolute left-3 top-3 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search patient..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg pl-10 pr-4 py-2"
      />
    </div>

    <button
onClick={()=>setOpenModal(true)}
className="bg-blue-600 text-white px-4 py-2 rounded-lg"
>
+ Add Patient
</button>

  </div>

</div>

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Age</th>
            <th className="p-3 text-left">Gender</th>
            <th className="p-3 text-left">Symptoms</th>
            <th className="p-3 text-left">Diagnosis</th>
            <th className="p-3 text-left">Doctor</th>
            <th className="p-3 text-center">Action</th>
          </tr>

        </thead>

        <tbody>

          {filteredPatients.map((patient) => (

            <tr
              key={patient.id}
              className="border-b hover:bg-slate-50"
            >

              <td className="p-3">{patient.full_name}</td>

              <td className="p-3">{patient.age}</td>

              <td className="p-3">{patient.gender}</td>

              <td className="p-3">{patient.symptoms}</td>

              <td className="p-3">{patient.diagnosis}</td>

              <td className="p-3">{patient.doctor}</td>

              <td className="p-3 text-center">

                <button
                  onClick={() => deletePatient(patient.id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                >
                  <Trash2 size={18} />
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>
<AddPatientModal
open={openModal}
onClose={()=>setOpenModal(false)}
onAdded={fetchPatients}
/>
    </div>
  );
}