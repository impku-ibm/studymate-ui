import { useState } from "react";
import Dashboard from "./reports/Dashboard";
import DailyCollectionReport from "./reports/DailyCollectionReport";
import OutstandingFeesReport from "./reports/OutstandingFeesReport";
import CollectionTrendChart from "./reports/CollectionTrendChart";

export default function FeeReports() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold">Reports & Analytics</h2>
        <p className="text-sm text-slate-500">
          Financial summaries, trends and outstanding analysis
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="border-b flex gap-6 text-sm">
        <Tab label="Dashboard" active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} />
        <Tab label="Daily Collection" active={activeTab === "daily"} onClick={() => setActiveTab("daily")} />
        <Tab label="Outstanding Fees" active={activeTab === "outstanding"} onClick={() => setActiveTab("outstanding")} />
        <Tab label="Collection Trend" active={activeTab === "trend"} onClick={() => setActiveTab("trend")} />
      </div>

      {/* Content */}
      {activeTab === "dashboard" && <Dashboard />}
      {activeTab === "daily" && <DailyCollectionReport />}
      {activeTab === "outstanding" && <OutstandingFeesReport />}
      {activeTab === "trend" && <CollectionTrendChart />}
    </div>
  );
}

function Tab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`pb-2 border-b-2 ${
        active
          ? "border-blue-600 text-blue-600 font-medium"
          : "border-transparent text-slate-500"
      }`}
    >
      {label}
    </button>
  );
}
