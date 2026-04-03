import { createPortal } from "react-dom";

export default function ViewStudentModal({ student, onClose }) {
  if (!student) return null;

  const fields = [
    { label: "Admission Number", value: student.admissionNumber },
    { label: "Full Name", value: student.fullName },
    { label: "Date of Birth", value: student.dateOfBirth || "—" },
    { label: "Admission Date", value: student.admissionDate },
    { label: "Parent / Guardian", value: student.parentName },
    { label: "Parent Mobile", value: student.parentMobile },
    { label: "Address", value: student.address || "—" },
    { label: "Status", value: student.status },
  ];

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md mx-4 rounded-xl shadow-2xl">

        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-900">Student Details</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl">&times;</button>
        </div>

        <div className="p-6 space-y-3">
          {fields.map(f => (
            <div key={f.label} className="flex justify-between items-start">
              <span className="text-sm text-slate-500 w-36 shrink-0">{f.label}</span>
              <span className="text-sm font-medium text-slate-800 text-right">
                {f.label === "Status" ? (
                  <span className={`px-2 py-0.5 rounded-full text-xs ${f.value === "ACTIVE" ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"}`}>
                    {f.value}
                  </span>
                ) : f.value}
              </span>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t bg-slate-50 rounded-b-xl flex justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm bg-slate-200 rounded-lg hover:bg-slate-300">Close</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
