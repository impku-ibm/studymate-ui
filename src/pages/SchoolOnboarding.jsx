import { useNavigate } from "react-router-dom";
import api from "../api/axios";


export default function SchoolOnboarding() {
  const navigate = useNavigate();
 const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const handleCreate = async () => {
    try {
      await api.post("/schools", {
        name,
        code,
      });
      navigate("/admin/setup");
    } catch {
      alert("School creation failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow w-full max-w-xl">
        <h1 className="text-2xl font-bold text-center mb-2">
          Set up your School
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Let’s get your school ready. This is a one-time setup.
        </p>

        {/* School Name */}
        <input
          className="w-full mb-4 p-2 border rounded"
          placeholder="School Name"
        />

        {/* School Code */}
        <input
          className="w-full mb-4 p-2 border rounded"
          placeholder="School Code (e.g. SSPS)"
        />

        {/* Address */}
        <textarea
          className="w-full mb-4 p-2 border rounded"
          placeholder="School Address"
          rows="3"
        />

        {/* Contact Email */}
        <input
          className="w-full mb-4 p-2 border rounded"
          placeholder="Contact Email"
        />

        {/* Contact Phone */}
        <input
          className="w-full mb-6 p-2 border rounded"
          placeholder="Contact Phone"
        />

        <button
          type="button"
          onClick={handleCreate}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Create School & Continue
        </button>
      </div>
    </div>
  );
}