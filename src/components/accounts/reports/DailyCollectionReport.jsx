import { useState } from "react";
import api from "../../../api/axios";

export default function DailyCollectionReport() {
  const [date, setDate] = useState("");
  const [data, setData] = useState(null);

  const load = () => {
    api
      .get(`/api/v1/accounts/reports/daily-collection?date=${date}`)
      .then(res => setData(res.data));
  };

  return (
    <div className="space-y-4">

      <div className="flex gap-3 items-center">
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        />
        <button onClick={load} className="px-4 py-2 bg-blue-600 text-white rounded text-sm">
          Load
        </button>
      </div>

      {data && (
        <div className="bg-white border rounded-lg p-6">
          <p className="text-sm text-slate-500">Date</p>
          <p className="font-medium">{data.date}</p>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-500">Total Collection</p>
              <p className="text-lg font-semibold">₹{data.totalCollection.toLocaleString("en-IN")}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Payments</p>
              <p className="text-lg font-semibold">{data.totalPayments}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
