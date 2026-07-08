import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function RecentPatients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    const { data } = await supabase
      .from("patients")
      .select("*")
      .order("id", { ascending: false })
      .limit(5);

    setPatients(data || []);
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">
        Recent Patients
      </h2>

      {patients.map((patient) => (
        <div
          key={patient.id}
          className="border-b py-3 flex justify-between"
        >
          <div>
            <p className="font-semibold">{patient.full_name}</p>
            <p className="text-sm text-gray-500">
              {patient.symptoms}
            </p>
          </div>

          <span className="text-blue-600 font-semibold">
            {patient.diagnosis}
          </span>
        </div>
      ))}
    </div>
  );
}