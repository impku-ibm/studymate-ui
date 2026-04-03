import { useEffect, useState, useContext } from "react";
import api from "../../../api/axios";
import { AcademicYearContext } from "../../../context/AcademicYearContext";

export default function OutstandingFeesReport() {
  const { academicYearId } = useContext(AcademicYearContext);

  const [summary, setSummary] = useState({
    totalOutstanding: 0,
    studentsWithPending: 0
  });

  const [rows, setRows] = useState([]); // ALWAYS ARRAY
  const [loading, setLoading] = useState(false);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    if (!academicYearId) return;

    setLoading(true);

    api
      .get(
        `/api/v1/accounts/reports/outstanding-fees?academicYearId=${academicYearId}`
      )
      .then(res => {
        const data = res?.data ?? {};

        setSummary({
          totalOutstanding: Number(data.totalOutstanding ?? 0),
          studentsWithPending: Number(data.studentsWithPending ?? 0)
        });

        // ✅ HARD NORMALIZATION (NO CRASH POSSIBLE)
        const classWise = data.classWiseData;
        setRows(Array.isArray(classWise) ? classWise : []);
      })
      .catch(() => {
        setRows([]);
      })
      .finally(() => setLoading(false));
  }, [academicYearId]);

  /* ================= UI ================= */
  return (
    <div className="space-y-4">

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Stat
          label="Total Outstanding"
          value={`₹${summary.totalOutstanding.toLocaleString("en-IN")}`}
          danger
        />
        <Stat
          label="Students with Pending Fees"
          value={summary.studentsWithPending}
          warning
        />
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">

        {/* Scroll area */}
        <div className="max-h-[420px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-slate-50 border-b z-10">
              <tr>
                <th className="px-6 py-3 text-left">Class</th>
                <th className="px-6 py-3 text-left">Outstanding Amount</th>
                <th className="px-6 py-3 text-left">Students</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3" className="px-6 py-10 text-center">
                    Loading outstanding fees…
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-10 text-center text-slate-500">
                    No outstanding fees found
                  </td>
                </tr>
              ) : (
                rows.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b last:border-none hover:bg-slate-50 cursor-pointer"
                    title="Click to drill down to students"
                  >
                    <td className="px-6 py-4 font-medium">
                      {row.className ?? "—"}
                    </td>

                    <td className="px-6 py-4 text-red-600 font-semibold">
                      ₹{Number(row.outstanding ?? 0).toLocaleString("en-IN")}
                    </td>

                    <td className="px-6 py-4">
                      {row.studentCount ?? 0}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

/* ================= STAT CARD ================= */
function Stat({ label, value, danger, warning }) {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <p className="text-xs text-slate-500">{label}</p>
      <p
        className={`text-xl font-semibold ${
          danger
            ? "text-red-600"
            : warning
            ? "text-orange-600"
            : "text-slate-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
