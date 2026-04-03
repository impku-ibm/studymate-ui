import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    setLoading(true);
    try {
      // 1️⃣ Login
      const loginRes = await api.post("/auth/login", form);

      const token = loginRes.data.token;
      console.log("Token is " , token);
      const refreshToken = loginRes.data.refreshToken;
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken",refreshToken);

      // 2️⃣ Fetch school details
      const schoolRes = await api.get("/school"); // token auto-attached
      localStorage.setItem(
        "school",
        JSON.stringify(schoolRes.data)
      );

      // 3️⃣ Navigate
      navigate("/admin");
    } catch (err) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow w-full max-w-sm mx-4">
        <h1 className="text-center text-2xl font-bold text-indigo-600">
          STUDYMATE
        </h1>
<form autoComplete="off">
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mt-6 p-2 border rounded"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mt-4 p-2 border rounded"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full mt-6 bg-indigo-600 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
        </form>
      </div>
    </div>
  );
}
