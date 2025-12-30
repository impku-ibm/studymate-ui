import { useEffect, useState } from "react";
import api from "../../api/axios";
import AddClassModal from "./AddClassModal";

export default function ClassSetup() {
  const [classes, setClasses] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const load = async () => {
    const res = await api.get("/classes");
    setClasses(res.data);
  };

  useEffect(() => { load(); }, []);

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Add Class
        </button>
      </div>

      <div className="bg-white rounded shadow border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Class Name</th>
              {/* <th className="px-4 py-3 text-left">Code</th> */}
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {classes.map(c => (
              <tr key={c.id} className="border-t">
                <td className="px-4 py-3">{c.name}</td>
                {/* <td className="px-4 py-3">{c.code}</td> */}
                <td className="px-4 py-3">
                  <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                    ACTIVE
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <AddClassModal
          onClose={() => setShowAdd(false)}
          onSuccess={load}
        />
      )}
    </>
  );
}
