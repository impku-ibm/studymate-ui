import api from "./axios";

export const getExams = () => api.get("/api/exams");

export const createExam = (payload) => api.post("/api/exams", payload);

export const scheduleExam = (payload) => api.post("/api/exams/schedule", payload);

export const getSchedules = (examId) => api.get(`/api/exams/${examId}/schedules`);

export const enterMarks = (payload) => api.post("/api/exams/marks", payload);

export const publishResults = (examId) => api.post(`/api/exams/${examId}/publish`);

export const getResults = (examId) => api.get(`/api/exams/${examId}/results`);

export const addGraceMarks = (examId, payload) =>
  api.post(`/api/exams/${examId}/grace-marks`, payload);
