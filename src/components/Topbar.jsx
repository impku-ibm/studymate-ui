import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

export default function Topbar() {
  const navigate = useNavigate();
  const school = JSON.parse(localStorage.getItem("school") || "{}");
  const token = localStorage.getItem("token");

  // Decode JWT payload to get user info
  let userName = "User";
  let userInitial = "U";
  try {
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userName = payload.fullName || payload.email || payload.sub || "User";
      userInitial = userName.charAt(0).toUpperCase();
    }
  } catch {
    // fallback to defaults
  }

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <header
      className="h-16 bg-white border-b border-slate-200
                 px-6 flex items-center justify-between
                 sticky top-0 z-40"
    >
      <h1 className="text-lg font-semibold text-slate-900">
        {school?.name || "Admin Panel"}
      </h1>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2
                        bg-slate-100 px-3 py-1.5 rounded-lg">
          <div className="h-7 w-7 rounded-full bg-blue-600
                          flex items-center justify-center
                          text-white text-xs font-semibold">
            {userInitial}
          </div>
          <span className="text-sm text-slate-700 font-medium">
            {userName}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium
                     text-red-600 border border-red-200
                     rounded-lg hover:bg-red-50 transition"
          data-testid="topbar-logout"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
