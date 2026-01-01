import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout() {
  return (
    <div className="h-screen flex overflow-hidden bg-slate-100">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Right Side */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Topbar (fixed) */}
        <Topbar />

        {/* Main content (scrollable) */}
        <main className="flex-1 overflow-hidden p-6 h-[calc(100vh-72px)]">
  <Outlet />
</main>



      </div>
    </div>
  );
}
