import { useEffect, useState } from "react";
import API from "../api";
import {
  FaChartLine,
  FaClipboardList,
  FaCheckCircle,
  FaExclamationTriangle,
  FaRobot,
  FaSmile,
  FaFire,
  FaDownload,
} from "react-icons/fa";

export default function Analytics() {

  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    pending: 0,
    high: 0,
    satisfaction: 0,
    resolution_rate: 0,
  });

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {

    try {

      const res = await API.get(
        "/dashboard/summary"
      );

      setStats({
        total: res.data.total,
        resolved: Math.round(
          (res.data.resolution_rate * res.data.total) / 100
        ),
        pending: res.data.pending,
        high: res.data.high,
        satisfaction: res.data.customer_satisfaction,
        resolution_rate: res.data.resolution_rate,
      });

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-8 gap-5">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">

            Analytics Dashboard

          </h1>

          <p className="text-gray-500 mt-2">

            AI Powered Complaint Analytics

          </p>

        </div>

        <button
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-6 py-3 rounded-xl flex items-center gap-3 shadow-lg"
        >

          <FaDownload />

          Export Report

        </button>

      </div>

      {/* KPI Cards */}

      <div className="grid grid-cols-2 xl:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-3xl shadow-xl p-6">

          <FaClipboardList className="text-cyan-600 text-3xl mb-4"/>

          <p className="text-gray-500">

            Total Complaints

          </p>

          <h2 className="text-5xl font-bold mt-3">

            {stats.total}

          </h2>

        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6">

          <FaCheckCircle className="text-green-600 text-3xl mb-4"/>

          <p className="text-gray-500">

            Resolved

          </p>

          <h2 className="text-5xl font-bold mt-3 text-green-600">

            {stats.resolved}

          </h2>

        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6">

          <FaFire className="text-red-600 text-3xl mb-4"/>

          <p className="text-gray-500">

            High Severity

          </p>

          <h2 className="text-5xl font-bold mt-3 text-red-600">

            {stats.high}

          </h2>

        </div>
                <div className="bg-white rounded-3xl shadow-xl p-6">

          <FaExclamationTriangle className="text-orange-500 text-3xl mb-4"/>

          <p className="text-gray-500">

            Pending

          </p>

          <h2 className="text-5xl font-bold mt-3 text-orange-500">

            {stats.pending}

          </h2>

        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6">

          <FaSmile className="text-green-500 text-3xl mb-4"/>

          <p className="text-gray-500">

            Customer Satisfaction

          </p>

          <h2 className="text-5xl font-bold mt-3 text-green-600">

            {stats.satisfaction}%

          </h2>

        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6">

          <FaRobot className="text-indigo-600 text-3xl mb-4"/>

          <p className="text-gray-500">

            Resolution Rate

          </p>

          <h2 className="text-5xl font-bold mt-3 text-indigo-600">

            {stats.resolution_rate}%

          </h2>

        </div>

      </div>

      {/* Analytics Section */}

      <div className="grid lg:grid-cols-2 gap-8 mb-8">

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">

            <FaChartLine className="text-cyan-600"/>

            Complaint Overview

          </h2>

          <div className="space-y-6">

            <div>

              <div className="flex justify-between mb-2">

                <span>Total Complaints</span>

                <span>{stats.total}</span>

              </div>

              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">

                <div
                  className="h-full bg-cyan-500"
                  style={{ width: "100%" }}
                />

              </div>

            </div>

            <div>

              <div className="flex justify-between mb-2">

                <span>Resolved</span>

                <span>{stats.resolution_rate}%</span>

              </div>

              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">

                <div
                  className="h-full bg-green-500"
                  style={{
                    width: `${stats.resolution_rate}%`,
                  }}
                />

              </div>

            </div>

            <div>

              <div className="flex justify-between mb-2">

                <span>Pending</span>

                <span>{stats.pending}</span>

              </div>

              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">

                <div
                  className="h-full bg-orange-500"
                  style={{
                    width: `${stats.total ? (stats.pending / stats.total) * 100 : 0}%`,
                  }}
                />

              </div>

            </div>

            <div>

              <div className="flex justify-between mb-2">

                <span>High Severity</span>

                <span>{stats.high}</span>

              </div>

              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">

                <div
                  className="h-full bg-red-500"
                  style={{
                    width: `${stats.total ? (stats.high / stats.total) * 100 : 0}%`,
                  }}
                />

              </div>

            </div>

          </div>

        </div>

        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl shadow-xl p-8 text-white">

          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">

            <FaRobot />

            AI Executive Insights

          </h2>

          <div className="space-y-5">

            <div className="bg-white/10 rounded-2xl p-4">

              📈 Resolution rate is improving steadily.

            </div>

            <div className="bg-white/10 rounded-2xl p-4">

              🔥 High severity complaints need immediate attention.

            </div>

            <div className="bg-white/10 rounded-2xl p-4">

              😊 Customer satisfaction remains above target.

            </div>

            <div className="bg-white/10 rounded-2xl p-4">

              🤖 AI recommends focusing on recurring hardware issues.

            </div>

          </div>

        </div>

      </div>
            {/* Bottom Dashboard */}

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Monthly Report */}

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-6">

            Monthly Report

          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span>Total Complaints</span>

              <span className="font-bold">

                {stats.total}

              </span>

            </div>

            <div className="flex justify-between">

              <span>Resolved</span>

              <span className="font-bold text-green-600">

                {stats.resolved}

              </span>

            </div>

            <div className="flex justify-between">

              <span>Pending</span>

              <span className="font-bold text-orange-600">

                {stats.pending}

              </span>

            </div>

            <div className="flex justify-between">

              <span>High Severity</span>

              <span className="font-bold text-red-600">

                {stats.high}

              </span>

            </div>

          </div>

          <button className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 rounded-xl">

            Download PDF Report

          </button>

        </div>

        {/* AI Forecast */}

        <div className="bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-900 rounded-3xl shadow-xl p-8 text-white">

          <h2 className="text-2xl font-bold mb-6">

            AI Prediction

          </h2>

          <div className="space-y-5">

            <div>

              <p className="text-white/70">

                Expected Complaints

              </p>

              <h2 className="text-4xl font-bold">

                {stats.total + 5}

              </h2>

            </div>

            <div>

              <p className="text-white/70">

                Expected High Severity

              </p>

              <h2 className="text-4xl font-bold text-yellow-300">

                {stats.high + 1}

              </h2>

            </div>

            <div>

              <p className="text-white/70">

                Risk Level

              </p>

              <span className="inline-block mt-2 px-4 py-2 rounded-full bg-yellow-400 text-black font-bold">

                Medium

              </span>

            </div>

            <div className="bg-white/10 rounded-2xl p-4">

              AI recommends increasing QA inspections on hardware products and prioritizing unresolved complaints.

            </div>

          </div>

        </div>

        {/* Executive Summary */}

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-6">

            Executive Summary

          </h2>

          <div className="space-y-4">

            <div className="p-4 rounded-xl bg-cyan-50 border-l-4 border-cyan-500">

              Overall complaint volume is under control.

            </div>

            <div className="p-4 rounded-xl bg-green-50 border-l-4 border-green-500">

              Resolution performance is improving.

            </div>

            <div className="p-4 rounded-xl bg-yellow-50 border-l-4 border-yellow-500">

              Monitor pending complaints daily.

            </div>

            <div className="p-4 rounded-xl bg-red-50 border-l-4 border-red-500">

              High-severity cases should receive immediate attention.

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}