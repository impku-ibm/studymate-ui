import { useEffect, useState, useContext } from "react";
import api from "../../../api/axios";
import { AcademicYearContext } from "../../../context/AcademicYearContext";

export default function Dashboard() {
  const { academicYearId } = useContext(AcademicYearContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!academicYearId) return;

    api
      .get(`/api/v1/accounts/dashboard?academicYearId=${academicYearId}`)
      .then(res => setData(res.data));
  }, [academicYearId]);

  if (!data) {
    return <div className="bg-white p-10 rounded-xl border text-center">Loading dashboard…</div>;
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

      <Stat label="Total Collection" value={`₹${data.totalCollection.toLocaleString("en-IN")}`} />
      <Stat label="Pending Amount" value={`₹${data.pendingAmount.toLocaleString("en-IN")}`} danger />
      <Stat label="Collection %" value={`${data.collectionPercentage.toFixed(2)}%`} success />
      <Stat label="Students Pending" value={data.pendingStudents} warning />

    </div>
  );
}

function Stat({ label, value, success, danger, warning }) {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <p className="text-xs text-slate-500">{label}</p>
      <p className={`text-xl font-semibold ${
        success ? "text-green-600" :
        danger ? "text-red-600" :
        warning ? "text-orange-600" :
        "text-slate-800"
      }`}>
        {value}
      </p>
    </div>
  );
}
