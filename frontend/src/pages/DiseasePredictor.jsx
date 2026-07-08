import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PredictionForm from "../components/PredictionForm";

export default function DiseasePredictor() {
  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <h1 className="text-4xl font-bold">
            🩺 AI Disease Predictor
          </h1>

          <p className="text-gray-500 mt-2">
            Predict possible diseases from patient symptoms using AI.
          </p>

          <div className="mt-8">
            <PredictionForm />
          </div>
        </div>
      </div>
    </div>
  );
}