import { useState } from "react";
import FeeStructure from "../../components/accounts/FeeStructure";
import FeeCollection from "../../components/accounts/FeeCollection";
import FeeReports from "../../components/accounts/FeeReports";
import FeePlans from "../../components/accounts/FeePlans";

export default function Accounts() {
  const [activeTab, setActiveTab] = useState("structure");

  return (
    <div className="flex flex-col h-full">

      {/* ===== Ultra-Compact Header ===== */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">
            Accounts & Fees
          </h1>

          {/* Tooltip */}
          <div className="relative group">
            <span className="text-slate-400 cursor-pointer text-sm">ℹ️</span>
            <div className="absolute left-0 top-6 z-50 hidden group-hover:block
                            bg-slate-800 text-white text-xs rounded px-3 py-2 w-64">
              Manage fee structure, collections and financial reports.
            </div>
          </div>
        </div>
      </div>

      {/* ===== Segmented Tabs ===== */}
      <div className="mb-3">
        <div className="inline-flex bg-slate-100 rounded-lg p-1">
          <Segment
            label="Fee Structure"
            active={activeTab === "structure"}
            onClick={() => setActiveTab("structure")}
          />
          <Segment
            label="Fee Collection"
            active={activeTab === "collection"}
            onClick={() => setActiveTab("collection")}
          />
          <Segment
            label="Reports"
            active={activeTab === "reports"}
            onClick={() => setActiveTab("reports")}
          />
          <Segment
            label="Fee Plans"
            active={activeTab === "plans"}
            onClick={() => setActiveTab("plans")}
          />
        </div>
      </div>

      {/* ===== Focused Content Area ===== */}
      <div className="flex-1 overflow-auto">
        {activeTab === "structure" && <FeeStructure />}
        {activeTab === "collection" && <FeeCollection />}
        {activeTab === "reports" && <FeeReports />}
        {activeTab === "plans" && <FeePlans />}
      </div>
    </div>
  );
}

/* ===== Segmented Button ===== */
function Segment({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 text-sm rounded-md transition ${
        active
          ? "bg-white shadow text-blue-600 font-medium"
          : "text-slate-600 hover:text-slate-800"
      }`}
    >
      {label}
    </button>
  );
}
