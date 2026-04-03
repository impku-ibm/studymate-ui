import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
});

// Request interceptor — attach token
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    // Quick expiry check before sending request
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (Date.now() >= payload.exp * 1000) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("school");
        window.location.href = "/login";
        return Promise.reject(new Error("Token expired"));
      }
    } catch { /* malformed token, let backend reject it */ }

    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — handle 401/403
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401 || err.response?.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("school");
      window.location.href = "/login";
      return new Promise(() => {}); // swallow the error, don't propagate
    }
    return Promise.reject(err);
  }
);

export default api;
