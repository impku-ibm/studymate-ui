import { useState } from "react";

export default function RecordPaymentModal({ payment, onClose }) {
  const info = payment ?? {};
  const [paymentMode, setPaymentMode] = useState("Cash");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[520px] rounded-xl shadow-lg">

        {/* ---------- Header ---------- */}
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-slate-900">
            Record Payment
          </h3>
        </div>

        {/* ---------- Context ---------- */}
        <div className="px-6 py-3 bg-slate-50 text-sm text-slate-700">
          Student: <b>{info.studentName || "—"}</b> &nbsp;|&nbsp;
          Class: <b>{info.className || "—"}</b> &nbsp;|&nbsp;
          Fee: <b>{info.feeType || "—"}</b> &nbsp;|&nbsp;
          Amount: <b>{info.amount || "—"}</b>
        </div>

        {/* ---------- Form ---------- */}
        <div className="p-6 space-y-4">

          {/* Payment Mode */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Payment Mode
            </label>
            <select
              value={paymentMode}
              onChange={e => setPaymentMode(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option>Cash</option>
              <option>UPI</option>
              <option>Card</option>
              <option>Bank Transfer</option>
            </select>
          </div>

          {/* ✅ UPI QR CODE SECTION */}
          {paymentMode === "UPI" && (
            <div className="border rounded-lg bg-slate-50 p-4 text-center space-y-3">
              <p className="text-sm font-medium text-slate-700">
                Scan QR to Pay
              </p>

              {/* Placeholder QR */}
              <div className="flex justify-center">
                <img
                  src="/qr-placeholder.png"
                  alt="UPI QR Code"
                  className="w-40 h-40 border rounded bg-white"
                />
              </div>

              <p className="text-xs text-slate-500">
                Pay using any UPI app (GPay, PhonePe, Paytm)
              </p>
            </div>
          )}

          {/* Transaction ID */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Transaction ID (Optional)
            </label>
            <input
              placeholder="Enter transaction reference"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Payment Date */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Payment Date
            </label>
            <input
              type="date"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

        </div>

        {/* ---------- Footer ---------- */}
        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="text-sm text-slate-600 hover:text-slate-800"
          >
            Cancel
          </button>

          <button
            disabled
            className="px-4 py-2 bg-slate-300 text-white rounded-lg text-sm cursor-not-allowed"
          >
            Confirm Payment
          </button>
        </div>

      </div>
    </div>
  );
}
