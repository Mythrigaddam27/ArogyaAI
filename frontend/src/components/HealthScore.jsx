import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function HealthScore(){

const [score,setScore]=useState(100);

useEffect(()=>{
calculate();
},[]);

async function calculate(){

const {count:patients}=await supabase
.from("patients")
.select("*",{count:"exact",head:true});

const {count:alerts}=await supabase
.from("ai_alerts")
.select("*",{count:"exact",head:true});

const health=Math.max(0,100-alerts*5+patients);

setScore(health);

}

return(

<div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-8 text-white">

<h2 className="text-2xl font-bold">
Overall Health Score
</h2>

<p className="text-6xl mt-4 font-bold">

{score}

</p>

</div>

);

}