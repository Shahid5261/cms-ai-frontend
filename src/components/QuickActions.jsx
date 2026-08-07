import {
  FaPlus,
  FaFileExcel,
  FaRobot,
  FaChartLine,
} from "react-icons/fa";

import API from "../api";

export default function QuickActions() {
  const exportExcel = () => {
    window.open(
      `${API.defaults.baseURL}/complaints/excel/download`,
      "_blank"
    );
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

      {/* New Complaint */}
      <button
        onClick={() => (window.location = "/add")}
        className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl p-6 shadow-xl hover:scale-105 transition"
      >
        <FaPlus className="text-3xl mb-4" />

        <h2 className="font-bold text-lg">
          New Complaint
        </h2>
      </button>

      {/* Export Excel */}
      <button
        onClick={exportExcel}
        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-6 shadow-xl hover:scale-105 transition"
      >
        <FaFileExcel className="text-3xl mb-4" />

        <h2 className="font-bold text-lg">
          Export Excel
        </h2>
      </button>

      {/* AI Report */}
      <button
        className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-2xl p-6 shadow-xl hover:scale-105 transition"
      >
        <FaRobot className="text-3xl mb-4" />

        <h2 className="font-bold text-lg">
          AI Report
        </h2>
      </button>

      {/* Analytics */}
      <button
        onClick={() => (window.location = "/analytics")}
        className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-6 shadow-xl hover:scale-105 transition"
      >
        <FaChartLine className="text-3xl mb-4" />

        <h2 className="font-bold text-lg">
          Analytics
        </h2>
      </button>

    </div>
  );
}