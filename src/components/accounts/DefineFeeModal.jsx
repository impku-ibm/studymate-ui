import { useState, useEffect, useContext } from "react";
import { createFeeStructure, getClasses } from "../../api/accountsApi";
import { AcademicYearContext } from "../../context/AcademicYearContext";

export default function DefineFeeModal({fee, existingFees = [], academicYear, onClose, onSave }) {
  const { academicYearId } = useContext(AcademicYearContext);

  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState("");

  const [feeType, setFeeType] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [saving, setSaving] = useState(false);
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [error, setError] = useState("");

  // Duplicate check moved into submit handler

  // ✅ Load all classes
  useEffect(() => {
    setLoadingClasses(true);
    getClasses()
      .then(res => {
        const list =
          Array.isArray(res.data)
            ? res.data
            : Array.isArray(res.data?.data)
            ? res.data.data
            : [];

        setClasses(list);
      })
      .finally(() => setLoadingClasses(false));
  }, []);

  const submit = async () => {
    if (!classId || !feeType || !amount || !dueDate) return;

    setSaving(true);
    setError("");
    try {
      await createFeeStructure({
        academicYearId: Number(academicYearId),
        classId: Number(classId),
        feeType,
        amount: parseFloat(amount),
        dueDate
      });
      onSave();
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to create fee structure");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[520px] rounded-xl shadow-lg">

        {/* Header */}
        <div className="px-6 py-4 border-b font-semibold">
          Define Fee Structure
        </div>

        {/* Info */}
        <div className="px-6 py-3 bg-blue-50 text-blue-700 text-sm">
          This fee will be defined for Academic Year <b>{academicYear}</b>
        </div>

        {error && <div className="mx-6 mt-3 text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>}

        {/* Form */}
        <div className="p-6 space-y-4">

          {/* Class Dropdown */}
          <div>
            <label className="block text-xs text-slate-500 mb-1">
              Class *
            </label>
            <select
              value={classId}
              onChange={e => setClassId(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
              disabled={loadingClasses}
            >
              <option value="">
                {loadingClasses ? "Loading classes..." : "Select Class"}
              </option>
              {classes.map(cls => (
                <option key={cls.id} value={cls.id}>
                  {cls.name || cls.className}
                </option>
              ))}
            </select>
          </div>

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
              <option value="TUITION">Tuition</option>
              <option value="ADMISSION">Admission</option>
              <option value="EXAM">Exam</option>
              <option value="TRANSPORT">Transport</option>
              <option value="HOSTEL">Hostel</option>
              <option value="LAB">Lab</option>
              <option value="LIBRARY">Library</option>
              <option value="SPORTS">Sports</option>
              <option value="ANNUAL">Annual</option>
              <option value="DEVELOPMENT">Development</option>
              <option value="UNIFORM">Uniform</option>
              <option value="BOOKS">Books</option>
              <option value="MISC">Miscellaneous</option>
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
            disabled={
              saving ||
              !classId ||
              !feeType ||
              !amount ||
              !dueDate
            }
            onClick={submit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-50"
          >
            {saving ? "Saving..." : "Define Fee"}
          </button>
        </div>

      </div>
    </div>
  );
}
