import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaRobot,
  FaBrain,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";

import { getDashboardSummary } from "../services/dashboardSummaryApi";

export default function AIExecutiveSummary() {

  const [summary, setSummary] = useState(null);

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      const data = await getDashboardSummary();
      setSummary(data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!summary) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
        Loading AI Executive Summary...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-700 text-white"
    >

      <div className="p-8">

        <div className="flex items-center gap-4 mb-8">

          <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center">

            <FaRobot className="text-3xl" />

          </div>

          <div>

            <h2 className="text-3xl font-bold">
              AI Executive Summary
            </h2>

            <p className="text-cyan-100">
              Live business intelligence generated from complaint data
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur">

            <FaChartLine className="text-3xl mb-4 text-cyan-300"/>

            <h3 className="font-semibold text-lg">
              Top Complaint Category
            </h3>

            <p className="text-3xl font-bold mt-3">
              {summary.top_category}
            </p>

          </div>

          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur">

            <FaShieldAlt className="text-3xl mb-4 text-yellow-300"/>

            <h3 className="font-semibold text-lg">
              Business Risk
            </h3>

            <p className="text-3xl font-bold mt-3">
              {summary.risk}
            </p>

          </div>

          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur">

            <FaBrain className="text-3xl mb-4 text-green-300"/>

            <h3 className="font-semibold text-lg">
              AI Recommendation
            </h3>

            <p className="text-sm leading-7 mt-3">
              {summary.recommendation}
            </p>

          </div>

        </div>

      </div>

    </motion.div>
  );
}