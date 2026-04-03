import { useEffect, useState, useContext, useMemo } from "react";
import DefineFeeModal from "./DefineFeeModal";
import { getFeeStructures, deleteFeeStructure } from "../../api/accountsApi";
import { AcademicYearContext } from "../../context/AcademicYearContext";

/* ================= ICONS (NO DEPENDENCIES) ================= */
function SearchIcon({ onClick }) {
  return (
    <svg
      onClick={onClick}
      className="w-4 h-4 cursor-pointer text-slate-500 hover:text-slate-700"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CloseIcon({ onClick }) {
  return (
    <svg
      onClick={onClick}
      className="w-4 h-4 cursor-pointer text-slate-500 hover:text-slate-700"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* ================= MAIN COMPONENT ================= */
export default function FeeStructure() {
  const { academicYearId, academicYearLabel } =
    useContext(AcademicYearContext);

  const [allFees, setAllFees] = useState([]);
  const [loading, setLoading] = useState(false);

  /* Pagination (frontend only) */
  const [page, setPage] = useState(0);
  const pageSize = 6;

  /* Header search state */
  const [classSearchOpen, setClassSearchOpen] = useState(false);
  const [feeTypeSearchOpen, setFeeTypeSearchOpen] = useState(false);
  const [classQuery, setClassQuery] = useState("");
  const [feeTypeQuery, setFeeTypeQuery] = useState("");

  const [showDefine, setShowDefine] = useState(false);
  const [editingFee, setEditingFee] = useState(null);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    if (!academicYearId) return;

    setLoading(true);
    getFeeStructures(academicYearId)
      .then(res => {
        const list =
          Array.isArray(res.data)
            ? res.data
            : res.data?.content ?? [];
        setAllFees(list);
        setPage(0);
      })
      .finally(() => setLoading(false));
  }, [academicYearId]);

  /* ================= FILTER ================= */
  const filteredFees = useMemo(() => {
    return allFees.filter(fee => {
      const matchClass =
        !classQuery ||
        fee.className
          ?.toLowerCase()
          .includes(classQuery.toLowerCase());

      const matchFeeType =
        !feeTypeQuery ||
        fee.feeType
          ?.toLowerCase()
          .includes(feeTypeQuery.toLowerCase());

      return matchClass && matchFeeType;
    });
  }, [allFees, classQuery, feeTypeQuery]);

  /* ================= PAGINATION ================= */
  const total = filteredFees.length;
  const start = page * pageSize;
  const end = start + pageSize;
  const visibleFees = filteredFees.slice(start, end);

  /* ================= UI ================= */
  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-base font-semibold">Fee Structure</h2>
          <p className="text-xs text-slate-500">
            Define fee types and amounts (configuration only)
          </p>
        </div>

        <button
          onClick={() => {
            setEditingFee(null);
            setShowDefine(true);
          }}
          className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm"
        >
          + Define Fee
        </button>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-md px-3 py-2 text-sm text-blue-700">
        Academic Year: <b>{academicYearLabel}</b>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white border rounded-lg max-w-[96%] mx-auto flex flex-col">

        {/* Scroll area */}
        <div
          className="overflow-auto"
          style={{ maxHeight: "calc(100vh - 360px)" }}
        >
          <table className="w-full text-sm table-fixed">
            <thead className="sticky top-0 bg-slate-50 border-b z-10">
              <tr>

                {/* CLASS HEADER WITH SEARCH */}
                <th className="px-4 py-2 text-left w-40">
                  <div className="flex items-center gap-1">
                    <span>Class</span>
                    {!classSearchOpen ? (
                      <SearchIcon
                        onClick={() => setClassSearchOpen(true)}
                      />
                    ) : (
                      <div className="flex items-center gap-1">
                        <input
                          autoFocus
                          value={classQuery}
                          onChange={e => {
                            setClassQuery(e.target.value);
                            setPage(0);
                          }}
                          className="border px-1 py-0.5 text-xs rounded w-20"
                          placeholder="Search"
                        />
                        <CloseIcon
                          onClick={() => {
                            setClassQuery("");
                            setClassSearchOpen(false);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </th>

                {/* FEE TYPE HEADER WITH SEARCH */}
                <th className="px-4 py-2 text-left w-40">
                  <div className="flex items-center gap-1">
                    <span>Fee Type</span>
                    {!feeTypeSearchOpen ? (
                      <SearchIcon
                        onClick={() => setFeeTypeSearchOpen(true)}
                      />
                    ) : (
                      <div className="flex items-center gap-1">
                        <input
                          autoFocus
                          value={feeTypeQuery}
                          onChange={e => {
                            setFeeTypeQuery(e.target.value);
                            setPage(0);
                          }}
                          className="border px-1 py-0.5 text-xs rounded w-24"
                          placeholder="Search"
                        />
                        <CloseIcon
                          onClick={() => {
                            setFeeTypeQuery("");
                            setFeeTypeSearchOpen(false);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </th>

                <th className="px-4 py-2 text-left w-28">Amount</th>
                <th className="px-4 py-2 text-left w-32">Due Date</th>
                <th className="px-4 py-2 text-left w-24">Status</th>
                <th className="px-4 py-2 text-right w-28">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-6 text-center">
                    Loading…
                  </td>
                </tr>
              ) : visibleFees.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-6 text-center">
                    No matching records
                  </td>
                </tr>
              ) : (
                visibleFees.map(fee => (
                  <tr
                    key={fee.id}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="px-4 py-2">{fee.className}</td>
                    <td className="px-4 py-2">{fee.feeType}</td>
                    <td className="px-4 py-2">₹{fee.amount}</td>
                    <td className="px-4 py-2">{fee.dueDate}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          fee.active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {fee.active ? "ACTIVE" : "INACTIVE"}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right space-x-2">
                      <button className="text-blue-600 text-sm">
                        Edit
                      </button>
                      <button
                        className="text-red-600 text-sm"
                        onClick={() =>
                          deleteFeeStructure(fee.id).then(() =>
                            setAllFees(f =>
                              f.filter(x => x.id !== fee.id)
                            )
                          )
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ================= PAGINATION ================= */}
        <div className="flex justify-between items-center px-4 py-2 border-t bg-slate-50 text-sm">
          <span>
            Showing {start + 1}–{Math.min(end, total)} of {total}
          </span>
          <div className="flex gap-2">
            <button
              disabled={page === 0}
              onClick={() => setPage(p => p - 1)}
              className="px-2 py-1 border rounded disabled:opacity-40"
            >
              Prev
            </button>
            <button
              disabled={end >= total}
              onClick={() => setPage(p => p + 1)}
              className="px-2 py-1 border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showDefine && (
        <DefineFeeModal
          fee={editingFee}
          academicYear={academicYearLabel}
          onClose={() => setShowDefine(false)}
          onSave={() => setShowDefine(false)}
        />
      )}
    </div>
  );
}
