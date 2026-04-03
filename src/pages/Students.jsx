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
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Students</h2>
      </div>

      <div className="border-b mb-4 flex gap-6">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => tab.key === "promotion" ? setShowPromotion(true) : setActiveTab(tab.key)}
            className={`pb-3 text-sm ${
              activeTab === tab.key
                ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "directory" && <StudentDirectory />}
      {activeTab === "enrollment" && <StudentEnrollment />}

      {showPromotion && (
        <BulkPromotionModal
          onClose={() => setShowPromotion(false)}
          onSuccess={() => setShowPromotion(false)}
        />
      )}
    </div>
  );
}
