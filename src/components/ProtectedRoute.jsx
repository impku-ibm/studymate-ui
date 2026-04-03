import { Navigate } from "react-router-dom";

function isTokenValid() {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    // Decode JWT payload (base64)
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiry = payload.exp * 1000; // convert to ms
    if (Date.now() >= expiry) {
      // Token expired — clean up
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("school");
      return false;
    }
    return true;
  } catch {
    // Malformed token
    localStorage.removeItem("token");
    return false;
  }
}

export default function ProtectedRoute({ children }) {
  return isTokenValid() ? children : <Navigate to="/login" replace />;
}
