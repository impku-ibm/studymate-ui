import { Navigate } from "react-router-dom";

function hasValidSession() {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  // No tokens at all — must login
  if (!token && !refreshToken) return false;

  // If access token exists and is not expired, we're good
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (Date.now() < payload.exp * 1000) return true;
    } catch { /* malformed */ }
  }

  // Access token expired but refresh token exists —
  // let the page render, axios interceptor will silently refresh
  if (refreshToken) return true;

  // Nothing valid
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("school");
  return false;
}

export default function ProtectedRoute({ children }) {
  return hasValidSession() ? children : <Navigate to="/login" replace />;
}
