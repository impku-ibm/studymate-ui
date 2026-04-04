import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

export default function Topbar({ onMenuClick }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let userName = "User";
  let userInitial = "U";
  let userRole = "";
  try {
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userName = payload.fullName || payload.email || payload.sub || "User";
      userInitial = userName.charAt(0).toUpperCase();
      userRole = payload.role || "";
    }
  } catch { /* fallback */ }

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="h-14 bg-white border-b border-gray-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition" data-testid="topbar-menu">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 cursor-default">
          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-indigo-700 text-xs font-semibold">{userInitial}</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-[13px] font-medium text-gray-900 leading-tight">{userName}</p>
            {userRole && <p className="text-[11px] text-gray-400 leading-tight">{userRole}</p>}
          </div>
        </div>

        <div className="h-5 w-px bg-gray-200 hidden sm:block" />

        <button onClick={handleLogout}
          className="text-[13px] text-gray-500 hover:text-gray-700 transition px-2 py-1 rounded-md hover:bg-gray-100"
          data-testid="topbar-logout">
          Sign out
        </button>
      </div>
    </header>
  );
}
