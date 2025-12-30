const assignments = [
  {
    teacher: "Mrs. Anjali Sharma",
    className: "Class 10",
    section: "A",
    subject: "Mathematics",
    year: "2024-25",
    status: "Active",
  },
  {
    teacher: "Mr. Rajiv Verma",
    className: "Class 9",
    section: "B",
    subject: "Physics",
    year: "2024-25",
    status: "Active",
  },
];

export default function TeacherAssignmentTable() {
  return (
    <div className="bg-white rounded-lg shadow">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-4 py-3 text-left">Teacher</th>
            <th className="px-4 py-3 text-left">Class</th>
            <th className="px-4 py-3 text-left">Section</th>
            <th className="px-4 py-3 text-left">Subject</th>
            <th className="px-4 py-3 text-left">Academic Year</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {assignments.map((a, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">{a.teacher}</td>
              <td className="px-4 py-3">{a.className}</td>
              <td className="px-4 py-3">{a.section}</td>
              <td className="px-4 py-3">{a.subject}</td>
              <td className="px-4 py-3">{a.year}</td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                  {a.status}
                </span>
              </td>
              <td className="px-4 py-3 text-right space-x-2">
                <button className="text-indigo-600 text-sm hover:underline">
                  Edit
                </button>
                <button className="text-gray-500 text-sm hover:underline">
                  Disable
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
