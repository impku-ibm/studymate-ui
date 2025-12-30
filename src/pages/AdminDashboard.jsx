import Sidebar from "../components/Sidebar";


export default function AdminDashboard() {
return (
<div className="flex min-h-screen bg-gray-100">
<Sidebar />
<main className="flex-1 p-6">
<div className="flex justify-between items-center mb-6">
<h1 className="text-2xl font-bold">Admin Dashboard</h1>
<div className="space-x-4">
<span className="text-gray-600">Admin User</span>
<button className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
</div>
</div>


<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
<Stat title="Total Students" value="1,245" />
<Stat title="Total Teachers" value="87" />
<Stat title="Total Classes" value="32" />
<Stat title="Academic Year" value="2024-25" />
</div>


<div className="bg-white p-6 rounded shadow">
<h2 className="font-semibold mb-4">Recent Activity</h2>
<ul className="space-y-2 text-gray-600 text-sm">
<li>• New student admission: Rajesh Kumar (Class 10-A)</li>
<li>• Teacher assigned: Mrs. Sharma to Class 8-B</li>
<li>• Exam scheduled: Mid-term for Class 9</li>
<li>• Result published: Class 12 Final Exam</li>
<li>• New subject added: Computer Science</li>
</ul>
</div>
</main>
</div>
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