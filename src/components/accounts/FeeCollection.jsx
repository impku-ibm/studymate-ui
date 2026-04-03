import { useEffect, useMemo, useState, useContext } from "react";
import api from "../../api/axios";
import { AcademicYearContext } from "../../context/AcademicYearContext";
import RecordPaymentModal from "./RecordPaymentModal";

export default function FeeCollection() {
  const { academicYearId, academicYearLabel } = useContext(AcademicYearContext);

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [allRows, setAllRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const pageSize = 10;
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    api.get("/classes").then(res => {
      const list = Array.isArray(res.data) ? res.data : res.data?.content ?? [];
      setClasses(list);
      if (list.length > 0) setSelectedClass(list[0]);
    });
  }, []);

  const loadFees = () => {
    if (!selectedClass || !academicYearId) return;
    setLoading(true);
    api.get(`/api/v1/accounts/student-fees/class/${selectedClass.id}?academicYearId=${academicYearId}`)
      .then(res => {
        const rows = Array.isArray(res.data) ? res.data : res.data?.content ?? [];
        setAllRows(rows);
        setPage(0);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadFees(); }, [selectedClass, academicYearId]);

  const summary = useMemo(() => {
    const total = allRows.reduce((s, r) => s + (r.totalAmount || r.amount || 0), 0);
    const paid = allRows.reduce((s, r) => s + (r.paidAmount || 0), 0);
    return { total, paid, pending: total - paid };
  }, [allRows]);

  const totalRows = allRows.length;
  const start = page * pageSize;
  const visibleRows = allRows.slice(start, start + pageSize);

  const statusBadge = (status) => {
    const map = {
      PAID: "bg-emerald-100 text-emerald-700",
      PARTIAL_PAID: "bg-amber-100 text-amber-700",
      PENDING: "bg-red-100 text-red-700",
      OVERDUE: "bg-red-200 text-red-800",
    };
    return map[status] || "bg-slate-100 text-slate-600";
  };

  const statusLabel = (status) => {
    const map = { PAID: "Paid", PARTIAL_PAID: "Partial", PENDING: "Pending", OVERDUE: "Overdue" };
    return map[status] || status;
  };

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="text-sm text-slate-500">Academic Year: <span className="text-blue-600 font-medium">{academicYearLabel}</span></p>
        </div>
        <select value={selectedClass?.id ?? ""} onChange={e => setSelectedClass(classes.find(c => c.id === Number(e.target.value)))}
          className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none">
          {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard label="Total Fees" value={summary.total} />
        <SummaryCard label="Collected" value={summary.paid} color="emerald" />
        <SummaryCard label="Pending" value={summary.pending} color="red" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
        <div className="overflow-y-auto max-h-[480px]">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-slate-50 border-b z-10">
              <tr>
                <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">Student</th>
                <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">Fee Type</th>
                <th className="px-4 py-3 text-right text-xs uppercase text-slate-500">Total</th>
                <th className="px-4 py-3 text-right text-xs uppercase text-slate-500">Paid</th>
                <th className="px-4 py-3 text-right text-xs uppercase text-slate-500">Pending</th>
                <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">Due Date</th>
                <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">Status</th>
                <th className="px-4 py-3 text-right text-xs uppercase text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="8" className="text-center py-10 text-slate-500">Loading…</td></tr>
              ) : visibleRows.length === 0 ? (
                <tr><td colSpan="8" className="text-center py-10 text-slate-500">No fee records found</td></tr>
              ) : visibleRows.map(row => {
                const total = row.totalAmount || row.amount || 0;
                const paid = row.paidAmount || 0;
                const pending = row.pendingAmount || (total - paid);
                return (
                  <tr key={row.id} className="border-b last:border-none hover:bg-slate-50 transition">
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-800">{row.studentName}</div>
                      <div className="text-xs text-slate-400">{row.admissionNumber}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{row.feeType}</td>
                    <td className="px-4 py-3 text-right font-medium">₹{total.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-emerald-600">₹{paid.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-red-600 font-medium">₹{pending.toLocaleString()}</td>
                    <td className="px-4 py-3 text-slate-600">{row.dueDate}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusBadge(row.status)}`}>
                        {statusLabel(row.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {row.status !== "PAID" ? (
                        <button onClick={() => setSelectedPayment(row)}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-500 transition">
                          {row.status === "PARTIAL_PAID" ? "Pay More" : "Collect"}
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400">Paid</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalRows > pageSize && (
          <div className="flex justify-between items-center px-4 py-3 border-t bg-slate-50 text-sm">
            <span className="text-slate-500">
              {start + 1}–{Math.min(start + pageSize, totalRows)} of {totalRows}
            </span>
            <div className="flex gap-2">
              <button disabled={page === 0} onClick={() => setPage(p => p - 1)}
                className="px-3 py-1 border border-slate-300 rounded-lg disabled:opacity-40 hover:bg-slate-100">Prev</button>
              <button disabled={start + pageSize >= totalRows} onClick={() => setPage(p => p + 1)}
                className="px-3 py-1 border border-slate-300 rounded-lg disabled:opacity-40 hover:bg-slate-100">Next</button>
            </div>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {selectedPayment && (
        <RecordPaymentModal
          payment={selectedPayment}
          onClose={() => setSelectedPayment(null)}
          onSuccess={() => { setSelectedPayment(null); loadFees(); }}
        />
      )}
    </div>
  );
}

function SummaryCard({ label, value, color }) {
  const textColor = color === "emerald" ? "text-emerald-600" : color === "red" ? "text-red-600" : "text-slate-900";
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <p className="text-xs text-slate-500 uppercase tracking-wide">{label}</p>
      <p className={`text-xl font-bold mt-1 ${textColor}`}>₹{value.toLocaleString()}</p>
    </div>
  );
}
