import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function AddPatientModal({
  open,
  onClose,
  onAdded,
}) {

  const [form, setForm] = useState({
    full_name:"",
    age:"",
    gender:"",
    symptoms:"",
    diagnosis:"",
    doctor:"",
  });

  async function savePatient(){

    const {error}=await supabase
      .from("patients")
      .insert([form]);

    if(error){
      alert(error.message);
      return;
    }

    onAdded();
    onClose();

    setForm({
      full_name:"",
      age:"",
      gender:"",
      symptoms:"",
      diagnosis:"",
      doctor:"",
    });

  }

  if(!open) return null;

  return(

<div className="fixed inset-0 bg-black/40 flex justify-center items-center">

<div className="bg-white rounded-xl p-8 w-[500px]">

<h2 className="text-2xl font-bold mb-6">
Add Patient
</h2>

<div className="space-y-4">

<input
placeholder="Full Name"
className="border p-3 rounded w-full"
value={form.full_name}
onChange={(e)=>setForm({...form,full_name:e.target.value})}
/>

<input
placeholder="Age"
className="border p-3 rounded w-full"
value={form.age}
onChange={(e)=>setForm({...form,age:e.target.value})}
/>

<input
placeholder="Gender"
className="border p-3 rounded w-full"
value={form.gender}
onChange={(e)=>setForm({...form,gender:e.target.value})}
/>

<input
placeholder="Symptoms"
className="border p-3 rounded w-full"
value={form.symptoms}
onChange={(e)=>setForm({...form,symptoms:e.target.value})}
/>

<input
placeholder="Diagnosis"
className="border p-3 rounded w-full"
value={form.diagnosis}
onChange={(e)=>setForm({...form,diagnosis:e.target.value})}
/>

<input
placeholder="Doctor"
className="border p-3 rounded w-full"
value={form.doctor}
onChange={(e)=>setForm({...form,doctor:e.target.value})}
/>

</div>

<div className="flex justify-end gap-4 mt-6">

<button
onClick={onClose}
className="px-4 py-2 border rounded"
>
Cancel
</button>

<button
onClick={savePatient}
className="bg-blue-600 text-white px-5 py-2 rounded"
>
Save
</button>

</div>

</div>

</div>

  );

}