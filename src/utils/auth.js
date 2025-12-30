import api from "../api/axios";

export const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
  try {
     await api.post("/auth/logout", {
      refreshToken,
    }); // backend invalidates token
  } catch (err) {
    // even if backend fails, we still logout locally
    console.warn("Logout API failed, clearing session anyway");
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("school");
  }
};
