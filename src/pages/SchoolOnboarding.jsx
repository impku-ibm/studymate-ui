import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function SchoolOnboarding() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [board, setBoard] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [academicStartMonth, setAcademicStartMonth] = useState("APRIL");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    try {
      await api.post("/school", {
        name,
        schoolCode: code,
        board,
        address,
        city,
        state,
        academicStartMonth,
      });
      const schoolRes = await api.get("/school");
      localStorage.setItem("school", JSON.stringify(schoolRes.data));
      navigate("/admin/setup");
    } catch {
      alert("School creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow w-full max-w-xl">
        <h1 className="text-2xl font-bold text-center mb-2">
          Set up your School
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Let's get your school ready. This is a one-time setup.
        </p>

        <input
          className="w-full mb-4 p-2 border rounded"
          placeholder="School Name"
          value={name}
          onChange={e => setName(e.target.value)}
          data-testid="onboarding-school-name"
        />
        <input
          className="w-full mb-4 p-2 border rounded"
          placeholder="School Code (e.g. SSPS)"
          value={code}
          onChange={e => setCode(e.target.value)}
          data-testid="onboarding-school-code"
        />
        <input
          className="w-full mb-4 p-2 border rounded"
          placeholder="Board (e.g. CBSE, ICSE)"
          value={board}
          onChange={e => setBoard(e.target.value)}
          data-testid="onboarding-board"
        />
        <textarea
          className="w-full mb-4 p-2 border rounded"
          placeholder="School Address"
          rows="3"
          value={address}
          onChange={e => setAddress(e.target.value)}
          data-testid="onboarding-address"
        />
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            className="w-full p-2 border rounded"
            placeholder="City"
            value={city}
            onChange={e => setCity(e.target.value)}
            data-testid="onboarding-city"
          />
          <input
            className="w-full p-2 border rounded"
            placeholder="State"
            value={state}
            onChange={e => setState(e.target.value)}
            data-testid="onboarding-state"
          />
        </div>
        <select
          className="w-full mb-6 p-2 border rounded"
          value={academicStartMonth}
          onChange={e => setAcademicStartMonth(e.target.value)}
          data-testid="onboarding-academic-month"
        >
          {["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE",
            "JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"
          ].map(m => <option key={m} value={m}>{m}</option>)}
        </select>

        <button
          type="button"
          onClick={handleCreate}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
          data-testid="onboarding-submit"
        >
          {loading ? "Creating..." : "Create School & Continue"}
        </button>
      </div>
    </div>
  );
}
