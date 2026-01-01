import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* ---------------- HEADER ---------------- */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600 tracking-wide">
            STUDYMATE
          </h1>

          <Link
            to="/login"
            className="px-5 py-2 text-sm font-medium rounded-lg
                       bg-indigo-600 text-white
                       hover:bg-indigo-700 transition"
          >
            Login
          </Link>
        </div>
      </header>

      {/* ---------------- HERO ---------------- */}
      <main className="flex-1">

        <section className="max-w-7xl mx-auto px-8 py-24 text-center">
          <h2 className="text-5xl font-bold text-slate-900 leading-tight">
            A Modern ERP for <br />
            <span className="text-indigo-600">Schools & Institutions</span>
          </h2>

          <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">
            STUDYMATE helps schools manage academics, staff, students,
            and operations with clarity, security, and speed —
            all from one unified platform.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/login"
              className="px-6 py-3 rounded-lg bg-indigo-600 text-white
                         font-medium hover:bg-indigo-700 transition"
            >
              Access Admin Panel
            </Link>

            <a
              href="#features"
              className="px-6 py-3 rounded-lg border border-slate-300
                         text-slate-700 hover:bg-slate-100 transition"
            >
              Explore Features
            </a>
          </div>
        </section>

        {/* ---------------- FEATURES ---------------- */}
        <section
          id="features"
          className="bg-white border-t border-b border-slate-200"
        >
          <div className="max-w-7xl mx-auto px-8 py-20">
            <h3 className="text-3xl font-bold text-center text-slate-900">
              Everything a School Needs — In One ERP
            </h3>

            <p className="mt-4 text-center text-slate-600 max-w-2xl mx-auto">
              Designed for administrators, teachers, and management teams
              to work efficiently without complexity.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <FeatureCard
                title="Student Management"
                description="Admissions, profiles, class & section mapping, and lifecycle tracking."
              />

              <FeatureCard
                title="Academic Structure"
                description="Academic years, classes, sections, subjects, and teacher assignments."
              />

              <FeatureCard
                title="Teacher & Staff"
                description="Teacher onboarding, subject allocation, workload visibility."
              />

              <FeatureCard
                title="Exams & Evaluation"
                description="Exams, results, and academic performance tracking."
              />

              <FeatureCard
                title="Secure & Scalable"
                description="Role-based access, school-level data isolation, audit-ready."
              />

              <FeatureCard
                title="Modern Dashboard"
                description="Real-time insights with analytics, charts, and activity tracking."
              />
            </div>
          </div>
        </section>

        {/* ---------------- TRUST STRIP ---------------- */}
        <section className="max-w-7xl mx-auto px-8 py-20 text-center">
          <h3 className="text-2xl font-semibold text-slate-900">
            Built with Real-World School Operations in Mind
          </h3>

          <p className="mt-4 text-slate-600 max-w-3xl mx-auto">
            STUDYMATE is engineered using modern backend architecture,
            secure APIs, and scalable design principles —
            making it suitable for single schools as well as multi-campus institutions.
          </p>
        </section>

      </main>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="bg-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between text-sm">
          <span>© {new Date().getFullYear()} STUDYMATE ERP</span>
          <span>Built for modern education</span>
        </div>
      </footer>
    </div>
  );
}

/* ---------------- FEATURE CARD ---------------- */

function FeatureCard({ title, description }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6
                    hover:shadow-md transition">
      <div className="h-12 w-12 rounded-lg bg-indigo-100 text-indigo-600
                      flex items-center justify-center font-bold text-lg">
        ✓
      </div>

      <h4 className="mt-4 text-lg font-semibold text-slate-900">
        {title}
      </h4>

      <p className="mt-2 text-sm text-slate-600">
        {description}
      </p>
    </div>
  );
}
