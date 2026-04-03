import { useState } from "react";
import { createPortal } from "react-dom";
import api from "../../api/axios";

export default function RecordPaymentModal({ payment, onClose, onSuccess }) {
  const info = payment ?? {};
  const pending = (info.totalAmount || info.amount || 0) - (info.paidAmount || 0);

  const [amount, setAmount] = useState(pending > 0 ? pending : "");
  const [paymentMode, setPaymentMode] = useState("CASH");
  const [transactionRef, setTransactionRef] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState(null);

  const numAmount = parseFloat(amount) || 0;
  const isPartial = numAmount > 0 && numAmount < pending;
  const isOverpay = numAmount > pending;

  const handleSubmit = async () => {
    if (numAmount <= 0) { setError("Amount must be greater than 0"); return; }
    if (isOverpay) { setError(`Amount cannot exceed pending ₹${pending.toLocaleString()}`); return; }

    setError(""); setLoading(true);
    try {
      const res = await api.post("/api/v1/accounts/payments", {
        studentId: info.studentId,
        feePayments: [{ studentFeeId: info.id, amount: numAmount }],
        paymentMode,
        transactionReference: transactionRef || null,
        paymentDate,
      });
      setReceipt(res.data);
    } catch (e) {
      setError(e.response?.data?.message || "Payment failed");
    } finally { setLoading(false); }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md mx-4 rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="px-6 py-4 border-b sticky top-0 bg-white rounded-t-xl">
          <h3 className="text-lg font-semibold text-slate-900">Record Payment</h3>
          <p className="text-sm text-slate-500">{info.studentName} — {info.feeType}</p>
        </div>

        {error && <div className="mx-6 mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>}

        {receipt ? (
          <div className="p-6 space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg space-y-2">
              <p className="text-emerald-700 font-semibold">Payment Recorded</p>
              <p className="text-sm">Receipt: <span className="font-mono font-bold">{receipt.receiptNumber}</span></p>
              <p className="text-sm">Amount: ₹{receipt.totalAmount?.toLocaleString()}</p>
              <p className="text-sm">Mode: {receipt.paymentMode}</p>
            </div>
            <button onClick={() => { if (onSuccess) onSuccess(); else onClose(); }}
              className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-500">
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Fee Summary */}
            <div className="mx-6 mt-4 bg-slate-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Total Fee</span>
                <span className="font-medium">₹{(info.totalAmount || info.amount || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Already Paid</span>
                <span className="text-emerald-600 font-medium">₹{(info.paidAmount || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm border-t pt-2">
                <span className="text-slate-700 font-medium">Pending</span>
                <span className="text-red-600 font-bold">₹{pending.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Payment Amount *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                  <input type="number" value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder={`Max ₹${pending}`} min="1" max={pending} step="0.01"
                    className="w-full border border-slate-300 pl-7 pr-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                {isPartial && (
                  <p className="text-xs text-amber-600 mt-1">
                    Partial payment — ₹{(pending - numAmount).toLocaleString()} will remain pending
                  </p>
                )}
                {/* Quick fill buttons */}
                <div className="flex gap-2 mt-2">
                  <button type="button" onClick={() => setAmount(pending)}
                    className="px-3 py-1 text-xs border border-slate-300 rounded-md hover:bg-slate-50">
                    Full (₹{pending.toLocaleString()})
                  </button>
                  {pending > 1000 && (
                    <button type="button" onClick={() => setAmount(Math.round(pending / 2))}
                      className="px-3 py-1 text-xs border border-slate-300 rounded-md hover:bg-slate-50">
                      Half (₹{Math.round(pending / 2).toLocaleString()})
                    </button>
                  )}
                </div>
              </div>

              {/* Payment Mode */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Payment Mode *</label>
                <select value={paymentMode} onChange={e => setPaymentMode(e.target.value)}
                  className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="CASH">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="CARD">Card</option>
                  <option value="BANK_TRANSFER">Bank Transfer</option>
                  <option value="CHEQUE">Cheque</option>
                </select>
              </div>

              {/* Transaction Reference */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Transaction Reference</label>
                <input value={transactionRef} onChange={e => setTransactionRef(e.target.value)}
                  placeholder="e.g. UPI ref, cheque no."
                  className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>

              {/* Payment Date */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Payment Date</label>
                <input type="date" value={paymentDate} onChange={e => setPaymentDate(e.target.value)}
                  className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t bg-slate-50 rounded-b-xl flex justify-end gap-3">
              <button onClick={onClose}
                className="px-4 py-2 text-sm text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-100">
                Cancel
              </button>
              <button onClick={handleSubmit}
                disabled={loading || numAmount <= 0 || isOverpay}
                className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50">
                {loading ? "Processing..." : isPartial ? `Pay ₹${numAmount.toLocaleString()} (Partial)` : `Pay ₹${numAmount.toLocaleString()}`}
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
