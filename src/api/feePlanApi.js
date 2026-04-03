import api from "./axios";

export const getFeePlans = () => api.get("/api/v1/accounts/fee-plans");

export const createFeePlan = (payload) => api.post("/api/v1/accounts/fee-plans", payload);

export const deleteFeePlan = (id) => api.delete(`/api/v1/accounts/fee-plans/${id}`);

export const assignPlanToStudent = (studentId, feePlanId) =>
  api.put(`/api/v1/accounts/fee-plans/assign/${studentId}/${feePlanId}`);

export const getStudentPlan = (studentId) =>
  api.get(`/api/v1/accounts/fee-plans/student/${studentId}`);

export const getStudentDiscounts = (studentId) =>
  api.get(`/api/v1/accounts/fee-discounts/student/${studentId}`);

export const createDiscount = (payload) =>
  api.post("/api/v1/accounts/fee-discounts", payload);

export const deleteDiscount = (id) =>
  api.delete(`/api/v1/accounts/fee-discounts/${id}`);
