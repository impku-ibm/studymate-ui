import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow w-96">
        <h1 className="text-center text-2xl font-bold text-indigo-600">
          STUDYMATE
        </h1>

        <h2 className="text-center mt-2 text-gray-700">
          {isRegister ? "Create Account" : "Login"}
        </h2>

        {isRegister && (
          <input
            className="w-full mt-6 p-2 border rounded"
            placeholder="Full Name"
          />
        )}

        <input
          className="w-full mt-4 p-2 border rounded"
          placeholder="Email"
        />

        <input
          type="password"
          className="w-full mt-4 p-2 border rounded"
          placeholder="Password"
        />

        {isRegister && (
          <input
            type="password"
            className="w-full mt-4 p-2 border rounded"
            placeholder="Confirm Password"
          />
        )}

        <button
          onClick={() => navigate("/admin")}
          className="w-full mt-6 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          {isRegister ? "Register" : "Login"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          {isRegister ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setIsRegister(false)}
                className="text-indigo-600 cursor-pointer hover:underline"
              >
                Login
              </span>
            </>
          ) : (
            <>
              First time here?{" "}
              <span
                onClick={() => setIsRegister(true)}
                className="text-indigo-600 cursor-pointer hover:underline"
              >
                Create account
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
