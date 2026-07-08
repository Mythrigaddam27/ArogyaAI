import { motion } from "framer-motion";

export default function DashboardCard({
  title,
  value,
  color,
  icon,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`rounded-2xl p-6 shadow-lg text-white ${color}`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm opacity-80">{title}</p>

          <h2 className="text-4xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div className="text-5xl">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}