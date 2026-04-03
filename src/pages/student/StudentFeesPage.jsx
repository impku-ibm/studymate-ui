import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function StudentFeesPage() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  // TODO: get studentId from JWT context
  const studentId = 1;

  useEffect(() => {
    api.get(`/api/v1/accounts/student-fees/student/${studentId}`)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data?.content ?? [];
        setFees(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const statusColors = {
    PAID: "bg-emerald-100 text-emerald-700",
    PARTIAL: "bg-amber-100 text-amber-700",
    PENDING: "bg-red-100 text-red-700",
    OVERDUE: "bg-red-200 text-red-800",
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Fees</h2>

      <div className="bg-white rounded-xl border shadow-sm">
        <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">Fee Type</th>
                <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">Amount</th>
                <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">Due Date</th>
                <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">Paid</th>
                <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">Pending</th>
                <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" className="px-4 py-6 text-center text-slate-500">Loading...</td></tr>
              ) : fees.length === 0 ? (
                <tr><td colSpan="6" className="px-4 py-6 text-center text-slate-500">No fees found</td></tr>
              ) : fees.map((f, i) => (
                <tr key={i} className="border-b hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">{f.feeType}</td>
                  <td className="px-4 py-3">₹{f.amount}</td>
                  <td className="px-4 py-3">{f.dueDate}</td>
                  <td className="px-4 py-3 text-emerald-600">₹{f.paidAmount || 0}</td>
                  <td className="px-4 py-3 text-red-600">₹{f.pendingAmount || f.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[f.status] || "bg-slate-100"}`}>
                      {f.status || "PENDING"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
