import { useEffect, useState } from "react";
import api from "../../../api/axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function CollectionTrendChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(
        `/api/v1/accounts/analytics/collection-trend?startDate=2024-01-01&endDate=2024-01-31`
      )
      .then(res => {
        setData(Array.isArray(res.data) ? res.data : []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white border rounded-xl px-5 py-4 max-w-[96%] mx-auto">

      {/* Header */}
      <div className="mb-3">
        <h4 className="text-sm font-semibold text-slate-800">
          Collection Trend
        </h4>
        <p className="text-xs text-slate-500">
          Day-wise collection overview
        </p>
      </div>

      {/* Chart Area */}
      <div
  className="
    w-full
    max-h-[320px]
    min-h-[260px]
    overflow-y-auto
    border
    rounded-lg
    bg-slate-50
    px-2
    py-2
  "
>

        {loading ? (
          <p className="text-sm text-slate-500">Loading chart…</p>
        ) : data.length === 0 ? (
          <p className="text-sm text-slate-500">No data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart
              data={data}
              margin={{ top: 10, right: 24, left: 0, bottom: 0 }}
            >
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11 }}
                stroke="#64748b"
              />
              <YAxis
                tick={{ fontSize: 11 }}
                stroke="#64748b"
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
