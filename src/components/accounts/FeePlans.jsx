import { useEffect, useState } from "react";
import { getFeePlans, deleteFeePlan } from "../../api/feePlanApi";
import CreateFeePlanModal from "./CreateFeePlanModal";

export default function FeePlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getFeePlans();
      setPlans(res.data);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this fee plan?")) return;
    await deleteFeePlan(id);
    load();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Fee Plans</h3>
          <p className="text-sm text-slate-500">Define fee plans for student categories (Day Scholar, Hosteller, Transport)</p>
        </div>
        <button onClick={() => setShowCreate(true)}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-500"
          data-testid="feeplan-create-btn">+ Create Plan</button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <p className="text-sm text-slate-500">Loading...</p>
        ) : plans.length === 0 ? (
          <div className="bg-white rounded-xl border p-12 text-center">
            <p className="text-slate-500 text-sm">No fee plans created yet</p>
          </div>
        ) : plans.map(plan => (
          <div key={plan.id} className="bg-white rounded-xl border shadow-sm p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-slate-800">{plan.name}</h4>
                {plan.description && <p className="text-sm text-slate-500">{plan.description}</p>}
              </div>
              <button onClick={() => handleDelete(plan.id)}
                className="text-red-500 text-xs hover:underline" data-testid={`feeplan-delete-${plan.id}`}>Delete</button>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs uppercase text-slate-500">Fee Type</th>
                  <th className="px-3 py-2 text-left text-xs uppercase text-slate-500">Amount (₹)</th>
                  <th className="px-3 py-2 text-left text-xs uppercase text-slate-500">Frequency</th>
                </tr>
              </thead>
              <tbody>
                {plan.items?.map(item => (
                  <tr key={item.id} className="border-t">
                    <td className="px-3 py-2">{item.feeType}</td>
                    <td className="px-3 py-2 font-medium">₹{item.amount}</td>
                    <td className="px-3 py-2 text-slate-600">{item.frequency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {showCreate && <CreateFeePlanModal onClose={() => setShowCreate(false)} onSuccess={() => { setShowCreate(false); load(); }} />}
    </div>
  );
}
