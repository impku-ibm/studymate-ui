import api from "./axios";

export const createPeriod = (payload) => api.post("/api/timetable/periods", payload);
export const getPeriods = () => api.get("/api/timetable/periods");
export const deletePeriod = (id) => api.delete(`/api/timetable/periods/${id}`);

export const createEntry = (payload) => api.post("/api/timetable/entries", payload);
export const getClassTimetable = (classId, section) =>
  api.get(`/api/timetable/class/${classId}/section/${section}`);
export const getTeacherTimetable = (teacherId) =>
  api.get(`/api/timetable/teacher/${teacherId}`);
export const deleteEntry = (id) => api.delete(`/api/timetable/entries/${id}`);
