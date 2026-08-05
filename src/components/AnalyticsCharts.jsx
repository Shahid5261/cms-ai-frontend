import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Tooltip,
  Legend
);

export default function AnalyticsCharts({ refresh }) {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    loadCharts();
  }, [refresh]);

  const loadCharts = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/complaints/"
      );

      setComplaints(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const categoryCounts = {};
  const severityCounts = {};

  complaints.forEach((item) => {
    categoryCounts[item.category] =
      (categoryCounts[item.category] || 0) + 1;

    severityCounts[item.severity] =
      (severityCounts[item.severity] || 0) + 1;
  });

  const barData = {
    labels: Object.keys(categoryCounts),

    datasets: [
      {
        label: "Complaints",

        data: Object.values(categoryCounts),

        backgroundColor: [
          "#06B6D4",
          "#3B82F6",
          "#8B5CF6",
          "#F59E0B",
          "#EF4444",
          "#10B981",
        ],

        borderRadius: 12,

        borderSkipped: false,
      },
    ],
  };

  const pieData = {
    labels: Object.keys(severityCounts),

    datasets: [
      {
        data: Object.values(severityCounts),

        backgroundColor: [
          "#EF4444",
          "#F59E0B",
          "#22C55E",
        ],

        hoverOffset: 25,

        borderColor: "#fff",

        borderWidth: 4,
      },
    ],
  };

  const barOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        grid: {
          color: "#E5E7EB",
        },
      },

      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 my-10">

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -6 }}
        className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden"
      >

        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 px-6 py-5">

          <h2 className="text-2xl font-bold text-white">
            Complaint Categories
          </h2>

          <p className="text-cyan-100 mt-1">
            Distribution by category
          </p>

        </div>

        <div className="h-[420px] p-6">

          <Bar
            data={barData}
            options={barOptions}
          />

        </div>

      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -6 }}
        transition={{ delay: 0.15 }}
        className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden"
      >

        <div className="bg-gradient-to-r from-pink-600 to-red-600 px-6 py-5">

          <h2 className="text-2xl font-bold text-white">
            Severity Analysis
          </h2>

          <p className="text-pink-100 mt-1">
            AI classified complaint severity
          </p>

        </div>

        <div className="h-[420px] flex items-center justify-center p-6">

          <Pie
            data={pieData}
            options={pieOptions}
          />

        </div>

      </motion.div>

    </div>
  );
}