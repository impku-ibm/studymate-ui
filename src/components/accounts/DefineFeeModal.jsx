import { useState } from "react";

export default function DefineFeeModal({
  academicYear,
  onClose,
  onSave
}) {
  const [feeType, setFeeType] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[520px] rounded-xl shadow-lg">

        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-slate-900">
            Define Fee Structure
          </h3>
        </div>

        {/* Info */}
        <div className="px-6 py-3 bg-blue-50 text-blue-700 text-sm">
          This fee will be defined for Academic Year{" "}
          <strong>{academicYear}</strong>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">

          {/* Fee Type */}
          <div>
            <label className="block text-xs text-slate-500 mb-1">
              Fee Type *
            </label>
            <select
              value={feeType}
              onChange={e => setFeeType(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">Select Fee Type</option>
              <option>Tuition Fee</option>
              <option>Transport Fee</option>
              <option>Exam Fee</option>
              <option>Miscellaneous</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs text-slate-500 mb-1">
              Amount *
            </label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
              placeholder="₹ Amount"
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-xs text-slate-500 mb-1">
              Due Date *
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="text-sm text-slate-600 hover:text-slate-800"
          >
            Cancel
          </button>

          <button
            disabled={!feeType || !amount || !dueDate}
            onClick={() =>
              onSave({
                feeType,
                amount,
                dueDate
              })
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm
                       disabled:opacity-50"
          >
            Define Fee
          </button>
        </div>
      </div>
    </div>
  );
}
