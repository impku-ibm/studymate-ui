import { useEffect, useState } from "react";
import { getAllStaff } from "../../api/staffApi";
import AddStaffModal from "./AddStaffModal";

export default function StaffDirectory() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getAllStaff();
      setStaff(res.data);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Staff Directory</h3>
          <p className="text-sm text-slate-500">Manage non-teaching staff members</p>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-500"
          data-testid="staff-add-btn">+ Add Staff</button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[calc(100vh-335px)]">
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase text-slate-500">Name</th>
                <th className="px-6 py-3 text-left text-xs uppercase text-slate-500">Email</th>
                <th className="px-6 py-3 text-left text-xs uppercase text-slate-500">Phone</th>
                <th className="px-6 py-3 text-left text-xs uppercase text-slate-500">Type</th>
                <th className="px-6 py-3 text-left text-xs uppercase text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" className="px-6 py-10 text-center text-slate-500">Loading...</td></tr>
              ) : staff.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-10 text-center text-slate-500">No staff members yet</td></tr>
              ) : staff.map(s => (
                <tr key={s.id} className="border-b last:border-none hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium text-slate-800">{s.fullName}</td>
                  <td className="px-6 py-3 text-slate-600">{s.email || "—"}</td>
                  <td className="px-6 py-3 text-slate-600">{s.phone || "—"}</td>
                  <td className="px-6 py-3 text-slate-600">{s.staffType}</td>
                  <td className="px-6 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${s.active ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700"}`}>
                      {s.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && <AddStaffModal onClose={() => setShowAdd(false)} onSuccess={() => { setShowAdd(false); load(); }} />}
    </div>
  );
}
