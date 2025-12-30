import { useEffect, useState } from "react";
import api from "../../api/axios";
import AddAcademicYearModal from "./AddAcademicYearModal.jsx";

export default function AcademicYearSetup() {
  const [years, setYears] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const load = async () => {
    const res = await api.get("/academic-years");
    setYears(res.data);
  };

  useEffect(() => { load(); }, []);

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Add Academic Year
        </button>
      </div>

      <div className="bg-white rounded shadow border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3">Year</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text right px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {years.map(y => (
              <tr key={y.id} className="border-t">
                <td className="px-6 py-4 text-left">{y.year}</td>
                <td className="px-6 py-4 text-left">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    y.status
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}>
                    {y.status ? "ACTIVE" : "INACTIVE"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {!y.status && (
                    <button
                      onClick={() => api.patch(`/academic-years/${y.id}/activate`).then(load)}
                      className="text-blue-600"
                    >
                      Activate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <AddAcademicYearModal
          onClose={() => setShowAdd(false)}
          onSuccess={load}
        />
      )}
    </>
  );
}
