import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  TriangleAlert,
  Loader2,
} from "lucide-react";

export default function AIHealthSummary() {
  const [summary, setSummary] = useState("Loading AI Summary...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSummary();
  }, []);

  async function loadSummary() {
    try {
      const { data: patients } = await supabase.from("patients").select("*");
      const { data: medicines } = await supabase.from("medicines").select("*");
      const { data: centers } = await supabase.from("health_centers").select("*");
      const { data: alerts } = await supabase.from("ai_alerts").select("*");

      const response = await fetch("http://127.0.0.1:5000/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patients,
          medicines,
          centers,
          alerts,
        }),
      });

      const result = await response.json();

      setSummary(result.summary);
    } catch (err) {
      console.log(err);
      setSummary("Unable to generate AI summary.");
    }

    setLoading(false);
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-5">
        🤖 AI Health Summary
      </h2>

      {loading ? (
        <div className="flex items-center gap-2 text-blue-600">
          <Loader2 className="animate-spin" size={20} />
          Generating AI insights...
        </div>
      ) : (
        <div className="flex gap-3">
          <TriangleAlert className="text-blue-600 mt-1" />
          <p className="leading-7 whitespace-pre-wrap">
            {summary}
          </p>
        </div>
      )}
    </div>
  );
}