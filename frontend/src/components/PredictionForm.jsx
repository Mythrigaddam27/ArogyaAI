import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Loader2, Stethoscope, ShieldCheck, Hospital } from "lucide-react";

const initialForm = {
  patient_name: "",
  age: "",
  gender: "",
  fever: "No",
  cough: "No",
  headache: "No",
  fatigue: "No",
  district: "",
};

export default function PredictionForm() {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    const payload = {
      name: formData.patient_name,
      patient_name: formData.patient_name,
      age: formData.age,
      gender: formData.gender,
      district: formData.district,
      fever: formData.fever,
      cough: formData.cough,
      headache: formData.headache,
      fatigue: formData.fatigue,
    };

    console.log("Submitting prediction request", payload);

    try {
      const response = await fetch("https://arogyaai-10at.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Prediction response status", response.status);
      const data = await response.json();
      console.log("Prediction response body", data);

      if (!response.ok) {
        throw new Error(data.error || data.prediction || "Unable to generate prediction.");
      }

      setResult(data);
    } catch (err) {
      console.error("Prediction request failed", err);
      setError(err.message || "Unable to generate prediction.");
    } finally {
      setLoading(false);
    }
  };

  const predictionText = result?.prediction || result?.reasoning || result?.possible_disease || "";
  const recommendationList = Array.isArray(result?.immediate_recommendations)
    ? result.immediate_recommendations
    : [];

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-cyan-100 text-cyan-700">
            <Stethoscope size={22} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Symptom Assessment</h2>
            <p className="text-sm text-slate-500">
              AI-assisted preliminary screening for public health triage.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Patient Name
              </label>
              <input
                type="text"
                name="patient_name"
                value={formData.patient_name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-cyan-500 focus:outline-none"
                placeholder="Enter patient name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Age
              </label>
              <input
                type="number"
                name="age"
                min="1"
                max="120"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-cyan-500 focus:outline-none"
                placeholder="e.g. 34"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Gender
              </label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-cyan-500 focus:outline-none"
                placeholder="Male / Female / Other"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                District
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-cyan-500 focus:outline-none"
                placeholder="Enter district"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              { key: "fever", label: "Fever" },
              { key: "cough", label: "Cough" },
              { key: "headache", label: "Headache" },
              { key: "fatigue", label: "Fatigue" },
            ].map((symptom) => (
              <div key={symptom.key}>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {symptom.label}
                </label>
                <select
                  name={symptom.key}
                  value={formData[symptom.key]}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-cyan-500 focus:outline-none"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Analyzing Symptoms...
                </>
              ) : (
                "Predict Disease"
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-cyan-600 via-sky-600 to-blue-700 p-6 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-white/20">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h3 className="text-xl font-semibold">How it works</h3>
            <p className="text-sm text-cyan-50">
              The AI reviews the symptoms and suggests a preliminary assessment.
            </p>
          </div>
        </div>

        <ul className="space-y-3 text-sm text-cyan-50">
          <li>• Uses a public health triage style prompt for early screening.</li>
          <li>• Highlights possible disease patterns based on common symptoms.</li>
          <li>• Recommends when a hospital referral may be appropriate.</li>
        </ul>

        <div className="mt-6 rounded-2xl border border-white/25 bg-white/10 p-4">
          <div className="flex items-center gap-2 font-semibold">
            <Hospital size={18} />
            Important Note
          </div>
          <p className="mt-2 text-sm leading-6 text-cyan-50">
            This tool is intended for preliminary assistance only and should not replace medical advice from a qualified clinician.
          </p>
        </div>
      </div>

      {error ? (
        <div className="xl:col-span-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {result ? (
        <div className="xl:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-cyan-600">
                Prediction Result
              </p>
              <h3 className="mt-1 text-2xl font-bold text-slate-800">
                {predictionText}
              </h3>
            </div>
            {result.risk_level ? (
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${
                  result.risk_level === "High"
                    ? "bg-red-100 text-red-700"
                    : result.risk_level === "Medium"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-emerald-100 text-emerald-700"
                }`}
              >
                Risk: {result.risk_level}
              </span>
            ) : null}
          </div>

          {result.reasoning || result.immediate_recommendations?.length ? (
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <h4 className="font-semibold text-slate-800">Reasoning</h4>
                <div className="mt-2 text-sm leading-7 text-slate-600">
                  <ReactMarkdown>{result.reasoning || predictionText}</ReactMarkdown>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <h4 className="font-semibold text-slate-800">Immediate Recommendations</h4>
                <ul className="mt-2 space-y-2 text-sm text-slate-600">
                  {recommendationList.length > 0 ? (
                    recommendationList.map((item, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="text-cyan-600">•</span>
                        <span>{item}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-slate-500">No recommendations were returned.</li>
                  )}
                </ul>
              </div>
            </div>
          ) : null}

          {typeof result.referral_advised === "boolean" ? (
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-700">
                Hospital Referral Advised: {result.referral_advised ? "Yes" : "No"}
              </p>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
