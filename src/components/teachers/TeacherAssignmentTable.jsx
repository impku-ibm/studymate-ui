export default function TeacherAssignmentTable({
  data,
  className,
  sectionName
}) {
  return (
    <div
  className="bg-white rounded-xl border border-slate-200 shadow-sm
             flex flex-col h-[calc(100vh-335px)] mb-4"
>

      {/* ---------- Empty State ---------- */}
      {!data || data.length === 0 ? (
        <div className="flex-1 flex items-center justify-center p-12">
          <p className="text-slate-500 text-sm">
            No teacher assignments found
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pb-6">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs uppercase tracking-wide text-slate-500">
                Teacher
              </th>
              <th className="px-6 py-3 text-left text-xs uppercase tracking-wide text-slate-500">
                Class
              </th>
              <th className="px-6 py-3 text-left text-xs uppercase tracking-wide text-slate-500">
                Section
              </th>
              <th className="px-6 py-3 text-left text-xs uppercase tracking-wide text-slate-500">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs uppercase tracking-wide text-slate-500">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map(a => (
              <tr
                key={a.id}
                className="border-b last:border-none hover:bg-slate-50 transition"
              >
                <td className="px-6 py-3 font-medium text-slate-800">
                  {a.teacherName}
                </td>

                <td className="px-6 py-3 text-slate-600">
                  {className}
                </td>

                <td className="px-6 py-3 text-slate-600">
                  {sectionName}
                </td>

                <td className="px-6 py-3 text-slate-600">
                  {a.subjectName}
                </td>

                <td className="px-6 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      a.active
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {a.active ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}
