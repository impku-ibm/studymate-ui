import { useEffect, useState } from "react";
import api from "../../api/axios";
import AddSectionModal from "./AddSectionModal";

export default function SectionSetup() {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 Load classes
  useEffect(() => {
    api.get("/classes").then(res => {setClasses(res.data)
 // ⭐ DEFAULT SELECT FIRST CLASS
    if (res.data.length > 0) {
      setSelectedClass(res.data[0].id);
    }
  });
    
  }, []);

  // 🔹 Load sections when class changes
  useEffect(() => {
    if (!selectedClass) {
      setSections([]);
      return;
    }

    setLoading(true);
    api
      .get(`/classes/${selectedClass}/sections`)
      .then(res => setSections(res.data))
      .finally(() => setLoading(false));
  }, [selectedClass]);

  return (
    <div className="p-4">

      {/* Action Bar */}
      <div className="flex items-center gap-4 mb-4">
        <select
          value={selectedClass}
          onChange={e => setSelectedClass(e.target.value)}
          className="p-2 border-2 rounded-lg text-sm w-60"
        >
          <option value="">Select Class</option>
          {classes.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => setShowAdd(true)}
          className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg"
          disabled={!selectedClass}
        >
          + Add Section
        </button>
      </div>

      {/* Section Table */}
      <div className="bg-white rounded-lg shadow border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">
                Section Name
              </th>
              <th className="px-6 py-3 text-left font-semibold">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="2" className="px-6 py-6 text-center">
                  Loading...
                </td>
              </tr>
            )}

            {!loading && sections.length === 0 && (
              <tr>
                <td colSpan="2" className="px-6 py-6 text-center text-gray-500">
                  No sections found for this class
                </td>
              </tr>
            )}

            {sections.map(s => (
              <tr key={s.id} className="border-b last:border-none">
                <td className="px-6 py-4 font-medium">
                  {s.name}
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                    ACTIVE
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Section Modal */}
      {showAdd && (
        <AddSectionModal
          classId={selectedClass}
          onClose={() => setShowAdd(false)}
          onSuccess={() => {
            setShowAdd(false);
            api
              .get(`/classes/${selectedClass}/sections`)
              .then(res => setSections(res.data));
          }}
        />
      )}
    </div>
  );
}
