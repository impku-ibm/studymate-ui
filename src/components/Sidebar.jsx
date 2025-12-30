export default function Sidebar() {
return (
<aside className="w-64 bg-slate-800 text-white p-4">
<h2 className="text-lg font-semibold mb-6">St. Xavier's School</h2>
<nav className="space-y-2">
{['Dashboard','Students','Teachers','Accounts','School Setup','Exams'].map(item => (
<div key={item} className="px-3 py-2 rounded hover:bg-slate-700 cursor-pointer">{item}</div>
))}
</nav>
</aside>
);
}