import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaClipboardList,
  FaClock,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";

import { getDashboardStats } from "../services/dashboardApi";

export default function DashboardCards({ refresh }) {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    high: 0,
  });

  useEffect(() => {
    loadStats();
  }, [refresh]);

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  const cards = [
    {
      title: "Total Complaints",
      value: stats.total,
      icon: <FaClipboardList />,
      gradient: "from-cyan-500 via-blue-600 to-indigo-700",
      trend: "+12%",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: <FaClock />,
      gradient: "from-yellow-400 via-orange-500 to-red-500",
      trend: "+5%",
    },
    {
      title: "High Severity",
      value: stats.high,
      icon: <FaExclamationTriangle />,
      gradient: "from-red-500 via-pink-600 to-rose-700",
      trend: "-3%",
    },
    {
      title: "Resolved",
      value: stats.resolved,
      icon: <FaCheckCircle />,
      gradient: "from-green-500 via-emerald-600 to-teal-700",
      trend: "+18%",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7 mb-10">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15 }}
          whileHover={{ y: -8, scale: 1.03 }}
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${card.gradient} p-7 text-white shadow-2xl border border-white/10 hover:shadow-cyan-500/30 transition-all duration-500`}
        >
          <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10"></div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-white/80 text-sm uppercase tracking-widest">
                {card.title}
              </p>

              <h2 className="text-5xl font-extrabold mt-5">
                {card.value}
              </h2>
            </div>

            <div className="text-5xl bg-white/20 h-20 w-20 rounded-2xl flex items-center justify-center backdrop-blur-md">
              {card.icon}
            </div>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <span className="text-sm text-white/80">
              Compared to last week
            </span>

            <span className="bg-white/20 px-4 py-1 rounded-full font-semibold backdrop-blur-sm">
              {card.trend}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}