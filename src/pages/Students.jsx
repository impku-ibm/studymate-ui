import { useState } from "react";
import StudentDirectory from "../components/students/StudentDirectory";
import StudentEnrollment from "../components/students/StudentEnrollment";
import BulkPromotionModal from "../components/students/BulkPromotionModal";

const tabs = [
  { key: "directory", label: "Student Directory" },
  { key: "enrollment", label: "Class Enrollment" },
  { key: "promotion", label: "Promotion" },
];

export default function Students() {
  const [activeTab, setActiveTab] = useState("directory");
  const [showPromotion, setShowPromotion] = useState(false);

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-gray-900">Students</h2>
        <p className="text-sm text-gray-500 mt-0.5">Manage student records and enrollment</p>
      </div>

      <div className="mb-5">
        <div className="inline-flex bg-gray-100 rounded-lg p-1 gap-0.5">
          {tabs.map(tab => (
            <button key={tab.key}
              onClick={() => tab.key === "promotion" ? setShowPromotion(true) : setActiveTab(tab.key)}
              className={`px-4 py-1.5 text-[13px] font-medium rounded-md transition ${
                activeTab === tab.key
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "directory" && <StudentDirectory />}
      {activeTab === "enrollment" && <StudentEnrollment />}

      {showPromotion && (
        <BulkPromotionModal onClose={() => setShowPromotion(false)} onSuccess={() => setShowPromotion(false)} />
      )}
    </div>
  );
}
