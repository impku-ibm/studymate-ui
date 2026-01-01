import { useState } from "react";
import DefineFeeModal from "./DefineFeeModal";

export default function FeeStructure({ fees = [] }) {
  const [showDefine, setShowDefine] = useState(false);

  // 🔹 Group fees by class
  const grouped = fees.reduce((acc, fee) => {
    acc[fee.className] = acc[fee.className] || [];
    acc[fee.className].push(fee);
    return acc;
  }, {});

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Fee Structure
          </h2>
          <p className="text-sm text-slate-500">
            Define fee types and amounts (configuration only)
          </p>
        </div>

        <button
          onClick={() => setShowDefine(true)}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg
                     hover:bg-blue-500 transition"
        >
          + Define Fee
        </button>
      </div>

      {/* Info bar */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-blue-700">
        Fees are defined per academic year and class. These do not track payments.
      </div>

      {/* Grouped Fees */}
      {Object.keys(grouped).length === 0 ? (
        <div className="bg-white rounded-xl border p-12 text-center text-slate-500">
          No fee structure defined yet
        </div>
      ) : (
        Object.entries(grouped).map(([className, items]) => (
          <div
            key={className}
            className="bg-white rounded-xl border border-slate-200 shadow-sm"
          >
            {/* Class Header */}
            <div className="px-6 py-4 border-b bg-slate-50 rounded-t-xl">
              <h3 className="font-medium text-slate-800">
                {className}
              </h3>
            </div>

            {/* Fee Table */}
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr className="text-slate-500">
                  <th className="px-6 py-3 text-left">Fee Type</th>
                  <th className="px-6 py-3 text-left">Amount</th>
                  <th className="px-6 py-3 text-left">Due Date</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {items.map(fee => (
                  <tr
                    key={fee.id}
                    className="border-b last:border-none hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 font-medium">
                      {fee.feeType}
                    </td>
                    <td className="px-6 py-4">
                      ₹{fee.amount}
                    </td>
                    <td className="px-6 py-4">
                      {fee.dueDate}
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button className="text-blue-600 text-sm hover:underline">
                        Edit
                      </button>
                      <button className="text-red-500 text-sm hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}

      {showDefine && (
        <DefineFeeModal onClose={() => setShowDefine(false)} />
      )}
    </div>
  );
}
