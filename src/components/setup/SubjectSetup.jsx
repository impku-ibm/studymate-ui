import { useEffect, useState } from "react";
import api from "../../api/axios";
import AddSubjectModal from "./AddSubjectModal";

export default function SubjectSetup() {
  const [subjects, setSubjects] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const load = async () => {
    const res = await api.get("/subjects");
    setSubjects(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Add Subject
        </button>
      </div>

      <div className="bg-white rounded shadow border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Subject Name</th>
              <th className="px-4 py-3 text-left">Code</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {subjects.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-4 py-6 text-center text-gray-500">
                  No subjects created yet
                </td>
              </tr>
            ) : (
              subjects.map(s => (
                <tr key={s.id} className="border-t">
                  <td className="px-4 py-3">{s.name}</td>
                  <td className="px-4 py-3">{s.code}</td>
                  <td className="px-4 py-3">
                    <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                      ACTIVE
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <AddSubjectModal
          onClose={() => setShowAdd(false)}
          onSuccess={load}
        />
      )}
    </>
  );
}
