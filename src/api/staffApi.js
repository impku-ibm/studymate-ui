import api from "./axios";

export const getAllStaff = () => api.get("/api/staff");

export const createStaff = (payload) => api.post("/api/staff", payload);

export const updateStaff = (id, payload) => api.put(`/api/staff/${id}`, payload);

export const markStaffSelfAttendance = () => api.post("/api/staff/attendance/self");
