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
  const pageSize = 6;

  const [selectedPayment, setSelectedPayment] = useState(null);

  /* ================= LOAD CLASSES ================= */
  useEffect(() => {
    api.get("/classes").then(res => {
      const list = Array.isArray(res.data) ? res.data : res.data?.content ?? [];
      setClasses(list);
      if (list.length > 0) setSelectedClass(list[0]);
    });
  }, []);

  /* ================= LOAD STUDENT FEES ================= */
  useEffect(() => {
    if (!selectedClass || !academicYearId) return;

    setLoading(true);
    api
      .get(
        `/api/v1/accounts/student-fees/class/${selectedClass.id}?academicYearId=${academicYearId}`
      )
      .then(res => {
        const rows =
          Array.isArray(res.data)
            ? res.data
            : Array.isArray(res.data?.content)
            ? res.data.content
            : [];
        setAllRows(rows);
        setPage(0);
      })
      .finally(() => setLoading(false));
  }, [selectedClass, academicYearId]);

  /* ================= SUMMARY ================= */
  const summary = useMemo(() => {
    const total = allRows.reduce((s, r) => s + r.amount, 0);
    const paid = allRows
      .filter(r => r.status === "PAID")
      .reduce((s, r) => s + r.amount, 0);
    return { total, paid, pending: total - paid };
  }, [allRows]);

  /* ================= PAGINATION ================= */
  const totalRows = allRows.length;
  const start = page * pageSize;
  const end = start + pageSize;
  const visibleRows = allRows.slice(start, end);

  /* ================= UI ================= */
  return (
    <div className="space-y-4">

      {/* INFO */}
      <div className="bg-blue-50 border border-blue-200 rounded-md px-4 py-2 text-sm text-blue-700">
        Fee Collection – Academic Year <b>{academicYearLabel}</b>
      </div>

      {/* FILTER BAR */}
      <div className="bg-blue-500 rounded-md p-3 flex justify-between items-center text-white">
        <div className="text-sm font-medium">
          Academic Year: {academicYearLabel}
        </div>

        <select
          value={selectedClass?.id ?? ""}
          onChange={e =>
            setSelectedClass(classes.find(c => c.id === Number(e.target.value)))
          }
          className="text-black px-3 py-1 rounded text-sm"
        >
          {classes.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-3 gap-4">
        <Summary label="Total Amount" value={`₹${summary.total}`} />
        <Summary label="Paid Amount" value={`₹${summary.paid}`} green />
        <Summary label="Unpaid Amount" value={`₹${summary.pending}`} red />
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl flex flex-col">

        <div className="overflow-y-auto max-h-[420px]">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-slate-50 border-b z-10">
              <tr>
                <th className="px-4 py-2 text-left">Roll No</th>
                <th className="px-4 py-2 text-left">Student</th>
                <th className="px-4 py-2 text-left">Fee Type</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Due Date</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-8">
                    Loading…
                  </td>
                </tr>
              ) : visibleRows.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8">
                    No records
                  </td>
                </tr>
              ) : (
                visibleRows.map(row => (
                  <tr
                    key={row.id}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="px-4 py-2">{row.rollNo}</td>
                    <td className="px-4 py-2">{row.studentName}</td>
                    <td className="px-4 py-2">{row.feeType}</td>
                    <td className="px-4 py-2">₹{row.amount}</td>
                    <td className="px-4 py-2">{row.dueDate}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          row.status === "PAID"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right">
                      {row.status === "UNPAID" ? (
                        <button
                          onClick={() => setSelectedPayment(row)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-xs"
                        >
                          MARK AS PAID
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400">
                          Paid on {row.paidOn}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between items-center px-4 py-2 border-t bg-slate-50 text-sm">
          <span>
            Showing {start + 1}–{Math.min(end, totalRows)} of {totalRows}
          </span>

          <div className="flex gap-2">
            <button
              disabled={page === 0}
              onClick={() => setPage(p => p - 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Prev
            </button>
            <button
              disabled={end >= totalRows}
              onClick={() => setPage(p => p + 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* PAYMENT MODAL */}
      {selectedPayment && (
        <RecordPaymentModal
          payment={selectedPayment}
          onClose={() => setSelectedPayment(null)}
        />
      )}
    </div>
  );
}

/* ================= HELPERS ================= */

function Summary({ label, value, green, red }) {
  return (
    <div className="bg-white border rounded-lg p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p
        className={`text-lg font-semibold ${
          green ? "text-emerald-600" : red ? "text-red-600" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}
