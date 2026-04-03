import api from "./axios";

export const markStudentAttendance = (payload) =>
  api.post("/api/attendance/mark", payload);

export const getByDateSection = (date, section) =>
  api.get(`/api/attendance/date/${date}/section/${section}`);

export const getStudentSummary = (studentId, month) =>
  api.get(`/api/attendance/student/${studentId}/summary`, { params: { month } });

export const getStudentHistory = (studentId, startDate, endDate) =>
  api.get(`/api/attendance/student/${studentId}/history`, { params: { startDate, endDate } });

export const markTeacherSelfAttendance = () =>
  api.post("/api/attendance/teacher/self");
