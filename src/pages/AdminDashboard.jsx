export default function AdminDashboard() {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Stat title="Total Students" value="1,245" />
        <Stat title="Total Teachers" value="87" />
        <Stat title="Total Classes" value="32" />
        <Stat title="Academic Year" value="2024-25" />
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="font-semibold mb-4">Recent Activity</h3>
        <ul className="space-y-2 text-gray-600 text-sm">
          <li>• New student admission: Rajesh Kumar (Class 10-A)</li>
          <li>• Teacher assigned: Mrs. Sharma to Class 8-B</li>
          <li>• Exam scheduled: Mid-term for Class 9</li>
          <li>• Result published: Class 12 Final Exam</li>
          <li>• New subject added: Computer Science</li>
        </ul>
      </div>
    </>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
