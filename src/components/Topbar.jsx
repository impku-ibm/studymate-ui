import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
export default function Topbar() {
     const navigate = useNavigate();
const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">
        Admin Panel
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-600 text-sm">
          Admin User
        </span>

        <Link
          onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </Link>
      </div>
    </header>
  );
}
