export default function FeeReports() {
  return (
    <>
      <div className="bg-blue-50 p-3 rounded text-sm text-blue-700">
        View financial summaries and breakdowns
      </div>

      <div className="flex gap-4">
        <Stat label="Collected" value="₹18,000" />
        <Stat label="Pending" value="₹31,000" />
        <Stat label="Collection Rate" value="37%" />
      </div>

      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h4 className="font-medium mb-4">Class-wise Breakdown</h4>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-4 py-2 text-left">Class</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Collected</th>
              <th className="px-4 py-2 text-left">Pending</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-3">Class 10</td>
              <td className="px-4 py-3">₹32,000</td>
              <td className="px-4 py-3 text-green-600">₹15,000</td>
              <td className="px-4 py-3 text-red-600">₹17,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-white border rounded-lg p-4 w-48">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}
