import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Inventory from "./pages/Inventory";
import HealthCenters from "./pages/HealthCenters";
import Alerts from "./pages/Alerts";
import AIAssistant from "./pages/AIAssistant";
import RiskMap from "./pages/RiskMap";
import DiseasePredictor from "./pages/DiseasePredictor";
import HealthMapPage from "./pages/HealthMapPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/centers" element={<HealthCenters />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route path="/ai-assistant" element={<AIAssistant />} />
      <Route path="/risk-map" element={<RiskMap />} />
      <Route path="/predict" element={<DiseasePredictor />} />
      <Route path="/health-map" element={<HealthMapPage />} />
    </Routes>
  );
}

export default App;