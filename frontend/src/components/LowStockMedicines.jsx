import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function LowStockMedicines() {

const [medicines,setMedicines]=useState([]);

useEffect(()=>{
fetchData();
},[]);

async function fetchData(){

const {data}=await supabase
.from("medicines")
.select("*")
.lt("stock",50);

setMedicines(data||[]);

}

return(

<div className="bg-white rounded-xl shadow-lg p-6">

<h2 className="text-xl font-bold mb-4">
Low Stock Medicines
</h2>

{medicines.map((m)=>(
<div
key={m.id}
className="flex justify-between border-b py-3"
>

<span>{m.medicine_name}</span>

<span className="text-red-600 font-bold">
{m.stock}
</span>

</div>
))}

</div>

);

}