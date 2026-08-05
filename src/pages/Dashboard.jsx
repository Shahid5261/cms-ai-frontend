import { useState } from "react";

import HeroBanner from "../components/HeroBanner";
import AIExecutiveSummary from "../components/AIExecutiveSummary";
import AIExecutiveDashboard from "../components/AIExecutiveDashboard";
import QuickActions from "../components/QuickActions";
import DashboardCards from "../components/DashboardCards";
import AnalyticsCharts from "../components/AnalyticsCharts";
import ComplaintTable from "../components/ComplaintTable";
import ActivityTimeline from "../components/ActivityTimeline";

export default function Dashboard() {

  const [refresh, setRefresh] = useState(false);

  const refreshDashboard = () => {
    setRefresh((prev) => !prev);
  };

  return (

    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8">
        AI Complaint Management Dashboard
      </h1>

      {/* Hero Banner */}
      <HeroBanner />

      {/* NEW AI Executive Summary */}
      <AIExecutiveSummary />

      {/* Executive Metrics */}
      <AIExecutiveDashboard />

      {/* Quick Actions */}
      <QuickActions />

      {/* Dashboard Cards + Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 my-8">

        <div className="xl:col-span-2">
          <DashboardCards refresh={refresh} />
        </div>

        <ActivityTimeline />

      </div>

      {/* Charts */}
      <AnalyticsCharts refresh={refresh} />

      {/* Complaint Table */}
      <ComplaintTable
        refreshDashboard={refreshDashboard}
      />

    </div>

  );

}