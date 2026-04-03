import { useState } from "react";
import { createFeePlan } from "../../api/feePlanApi";

const feeTypes = [
  "TUITION", "ADMISSION", "EXAM", "TRANSPORT", "HOSTEL", "LAB",
  "LIBRARY", "SPORTS", "ANNUAL", "DEVELOPMENT", "UNIFORM", "BOOKS", "MISC"
];
const frequencies = ["ONE_TIME", "MONTHLY", "QUARTERLY", "HALF_YEARLY", "ANNUAL"];

export default function CreateFeePlanModal({ onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([{ feeType: "TUITION", amount: "", frequency: "MONTHLY" }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addItem = () => setItems([...items, { feeType: "EXAM", amount: "", frequency: "ANNUAL" }]);
  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));
  const updateItem = (i, field, value) => {
    const updated = [...items];
    updated[i] = { ...updated[i], [field]: value };
    setItems(updated);
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      await createFeePlan({
        name, description,
        items: items.map(i => ({ ...i, amount: parseFloat(i.amount) }))
      });
      onSuccess();
    } catch (e) {
      setError(e.response?.data?.message || "Failed to create plan");
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Create Fee Plan</h3>
        {error && <div className="mb-3 text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}

        <input placeholder="Plan Name (e.g. Day Scholar Plan)" value={name}
          onChange={e => setName(e.target.value)}
          className="w-full mb-3 p-2 border rounded text-sm" data-testid="feeplan-name" />
        <input placeholder="Description (optional)" value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full mb-4 p-2 border rounded text-sm" />

        <div className="mb-3 flex justify-between items-center">
          <span className="text-sm font-medium text-slate-700">Fee Items</span>
          <button onClick={addItem} className="text-blue-600 text-xs hover:underline">+ Add Item</button>
        </div>

        {items.map((item, i) => (
          <div key={i} className="grid grid-cols-4 gap-2 mb-2 items-center">
            <select value={item.feeType} onChange={e => updateItem(i, "feeType", e.target.value)}
              className="p-2 border rounded text-xs" data-testid={`feeplan-item-type-${i}`}>
              {feeTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <input type="number" placeholder="Amount" value={item.amount}
              onChange={e => updateItem(i, "amount", e.target.value)}
              className="p-2 border rounded text-xs" data-testid={`feeplan-item-amount-${i}`} />
            <select value={item.frequency} onChange={e => updateItem(i, "frequency", e.target.value)}
              className="p-2 border rounded text-xs">
              {frequencies.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
            {items.length > 1 && (
              <button onClick={() => removeItem(i)} className="text-red-500 text-xs">✕</button>
            )}
          </div>
        ))}

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 text-sm text-slate-600 border rounded-lg">Cancel</button>
          <button onClick={handleSubmit} disabled={loading || !name || items.some(i => !i.amount)}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg disabled:opacity-50"
            data-testid="feeplan-submit">
            {loading ? "Creating..." : "Create Plan"}
          </button>
        </div>
      </div>
    </div>
  );
}
