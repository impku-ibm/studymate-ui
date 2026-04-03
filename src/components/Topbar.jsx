import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

export default function Topbar({ onMenuClick }) {
  const navigate = useNavigate();
  const school = JSON.parse(localStorage.getItem("school") || "{}");
  const token = localStorage.getItem("token");

  let userName = "User";
  let userInitial = "U";
  try {
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userName = payload.fullName || payload.email || payload.sub || "User";
      userInitial = userName.charAt(0).toUpperCase();
    }
  } catch { /* fallback */ }

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="h-14 sm:h-16 bg-white border-b border-slate-200 px-3 sm:px-6 flex items-center justify-between sticky top-0 z-20">

      {/* Left: hamburger + title */}
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100" data-testid="topbar-menu">
          <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-sm sm:text-lg font-semibold text-slate-900 truncate">
          {school?.name || "Admin Panel"}
        </h1>
      </div>

      {/* Right: user + logout */}
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden sm:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg">
          <div className="h-7 w-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold">
            {userInitial}
          </div>
          <span className="text-sm text-slate-700 font-medium">{userName}</span>
        </div>

        {/* Mobile: just initial */}
        <div className="sm:hidden h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold">
          {userInitial}
        </div>

        <button onClick={handleLogout}
          className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
          data-testid="topbar-logout">
          Logout
        </button>
      </div>
    </header>
  );
}
