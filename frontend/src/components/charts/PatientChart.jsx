import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", patients: 120 },
  { month: "Feb", patients: 150 },
  { month: "Mar", patients: 180 },
  { month: "Apr", patients: 220 },
  { month: "May", patients: 260 },
];

export default function PatientChart() {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">
        Patient Visits
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="patients" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}