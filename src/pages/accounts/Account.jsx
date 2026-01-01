import { useState } from "react";
import FeeStructure from "../../components/accounts/FeeStructure";
import FeeCollection from "../../components/accounts/FeeCollection";
import FeeReports from "../../components/accounts/FeeReports";

export default function Accounts() {
  const [activeTab, setActiveTab] = useState("structure");

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold">Accounts & Fee Management</h1>
        <p className="text-sm text-slate-500">
          Manage fee structure, collections and reports
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b flex gap-6 text-sm">
        <Tab label="Fee Structure" active={activeTab === "structure"} onClick={() => setActiveTab("structure")} />
        <Tab label="Fee Collection" active={activeTab === "collection"} onClick={() => setActiveTab("collection")} />
        <Tab label="Reports" active={activeTab === "reports"} onClick={() => setActiveTab("reports")} />
      </div>

      {/* Content */}
      {activeTab === "structure" && <FeeStructure />}
      {activeTab === "collection" && <FeeCollection />}
      {activeTab === "reports" && <FeeReports />}
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
