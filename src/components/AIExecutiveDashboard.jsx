import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import API from "../api";

import {
  FaBrain,
  FaRobot,
  FaLightbulb,
  FaChartLine,
  FaFire,
  FaShieldAlt,
} from "react-icons/fa";

export default function AIExecutiveDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      const res = await API.get("/dashboard/summary");

      setData(res.data);
    } catch (err) {
      console.error(
        "Failed to load AI Executive Dashboard:",
        err
      );
    }
  };

  if (!data) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
        Loading AI Dashboard...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-700 rounded-3xl text-white shadow-2xl p-8 mb-10"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center">
          <FaBrain className="text-3xl" />
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            AI Executive Dashboard
          </h2>

          <p className="text-cyan-100">
            Live Business Intelligence
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {/* Total Complaints */}
        <div className="bg-white/10 rounded-2xl p-6">
          <FaChartLine className="text-3xl mb-3 text-cyan-300" />

          <p>Total Complaints</p>

          <h2 className="text-4xl font-bold">
            {data.total}
          </h2>
        </div>

        {/* High Severity */}
        <div className="bg-white/10 rounded-2xl p-6">
          <FaFire className="text-3xl mb-3 text-red-400" />

          <p>High Severity</p>

          <h2 className="text-4xl font-bold">
            {data.high}
          </h2>
        </div>

        {/* Top Category */}
        <div className="bg-white/10 rounded-2xl p-6">
          <FaRobot className="text-3xl mb-3 text-yellow-400" />

          <p>Top Category</p>

          <h2 className="text-2xl font-bold">
            {data.top_category}
          </h2>
        </div>

        {/* Business Risk */}
        <div className="bg-white/10 rounded-2xl p-6">
          <FaShieldAlt className="text-3xl mb-3 text-green-400" />

          <p>Business Risk</p>

          <h2 className="text-3xl font-bold">
            {data.risk}
          </h2>
        </div>
      </div>

      {/* AI Information */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* AI Recommendation */}
        <div className="bg-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <FaBrain className="text-cyan-300" />

            <h2 className="text-xl font-bold">
              AI Recommendation
            </h2>
          </div>

          <p className="text-gray-200 leading-8">
            {data.recommendation}
          </p>
        </div>

        {/* Executive Summary */}
        <div className="bg-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <FaLightbulb className="text-yellow-400" />

            <h2 className="text-xl font-bold">
              Executive Summary
            </h2>
          </div>

          <ul className="space-y-3 text-gray-200">
            <li>
              • Total Complaints: {data.total}
            </li>

            <li>
              • Pending Complaints: {data.pending}
            </li>

            <li>
              • Resolved Complaints: {data.resolved}
            </li>

            <li>
              • Highest Complaint Category:{" "}
              {data.top_category}
            </li>

            <li>
              • Current Business Risk: {data.risk}
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}