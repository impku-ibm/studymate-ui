import { useState } from "react";
import RecordPaymentModal from "./RecordPaymentModal";

export default function FeeCollection({ records = [] }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="space-y-6">

      {/* Sticky Summary */}
      <div className="grid grid-cols-3 gap-4 sticky top-0 z-10 bg-slate-100 py-4">
        <SummaryCard label="Total Amount" value="₹49,000" />
        <SummaryCard label="Paid Amount" value="₹18,000" green />
        <SummaryCard label="Unpaid Amount" value="₹31,000" red />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border shadow-sm
                      h-[calc(100vh-340px)] flex flex-col">

        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 sticky top-0 border-b">
              <tr>
                <th className="px-6 py-3 text-left">Student</th>
                <th className="px-6 py-3 text-left">Class</th>
                <th className="px-6 py-3 text-left">Fee</th>
                <th className="px-6 py-3 text-left">Amount</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {records.map(r => (
                <tr
                  key={r.id}
                  className={`border-b ${
                    r.status === "UNPAID"
                      ? "bg-red-50 hover:bg-red-100"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <td className="px-6 py-4 font-medium">
                    {r.studentName}
                  </td>
                  <td className="px-6 py-4">{r.className}</td>
                  <td className="px-6 py-4">{r.feeType}</td>
                  <td className="px-6 py-4 font-semibold">
                    ₹{r.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        r.status === "PAID"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {r.status === "UNPAID" ? (
                      <button
                        onClick={() => setSelected(r)}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-500"
                      >
                        MARK AS PAID
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400">
                        Paid on {r.paidOn}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <RecordPaymentModal
          payment={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

function SummaryCard({ label, value, green, red }) {
  return (
    <div className="bg-white rounded-lg border p-4 shadow-sm">
      <p className="text-xs text-slate-500">{label}</p>
      <p
        className={`text-lg font-semibold ${
          green
            ? "text-emerald-600"
            : red
            ? "text-red-600"
            : "text-slate-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
