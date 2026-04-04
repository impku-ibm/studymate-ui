import { useState } from "react";
import FeeStructure from "../../components/accounts/FeeStructure";
import FeeCollection from "../../components/accounts/FeeCollection";
import FeeReports from "../../components/accounts/FeeReports";
import FeePlans from "../../components/accounts/FeePlans";

const tabs = [
  { key: "structure", label: "Fee Structure" },
  { key: "collection", label: "Fee Collection" },
  { key: "reports", label: "Reports" },
  { key: "plans", label: "Fee Plans" },
];

export default function Accounts() {
  const [activeTab, setActiveTab] = useState("structure");

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-gray-900">Accounts & Fees</h2>
        <p className="text-sm text-gray-500 mt-0.5">Manage fee structure, collections and reports</p>
      </div>

      <div className="mb-5">
        <div className="inline-flex bg-gray-100 rounded-lg p-1 gap-0.5">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className={`px-4 py-1.5 text-[13px] font-medium rounded-md transition ${
                activeTab === t.key
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-auto">
        {activeTab === "structure" && <FeeStructure />}
        {activeTab === "collection" && <FeeCollection />}
        {activeTab === "reports" && <FeeReports />}
        {activeTab === "plans" && <FeePlans />}
      </div>
    </div>
  );
}
