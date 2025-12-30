import { Link } from "react-router-dom";


export default function Landing() {
return (
<div className="min-h-screen bg-gray-50">
<header className="flex justify-between items-center px-10 py-4 bg-white shadow">
<h1 className="text-2xl font-bold text-indigo-600">STUDYMATE</h1>
<Link to="/login" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Login</Link>
</header>


<main className="max-w-6xl mx-auto text-center py-20">
<h2 className="text-4xl font-bold text-gray-800">Digital School Management Made Simple</h2>
<p className="mt-4 text-gray-600">All-in-one platform to manage students, teachers, exams and more.</p>


<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
<FeatureCard title="Students" />
<FeatureCard title="Teachers" />
<FeatureCard title="Exams & Results" />
</div>
</main>


<footer className="text-center py-6 text-gray-500">About · Contact</footer>
</div>
);
}


function FeatureCard({ title }) {
return (
<div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
<div className="h-12 w-12 bg-indigo-100 rounded mb-4 mx-auto" />
<h3 className="font-semibold text-lg text-gray-800">{title}</h3>
<p className="mt-2 text-gray-500 text-sm">Manage all {title.toLowerCase()} efficiently.</p>
</div>
);
}