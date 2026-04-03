import axios from "./axios";

export const getFeeStructures = (academicYearId) =>
  axios.get(`/api/v1/accounts/fee-structures`, {
    params: { academicYearId }
  });
  export const getClasses = () =>
  axios.get("/classes");
export const createFeeStructure = (payload) =>
  axios.post(`/api/v1/accounts/fee-structures`, payload);

export const getStudentFees = (studentId) =>
  axios.get(`/api/v1/accounts/student-fees/student/${studentId}`);

export const recordPayment = (payload) =>
  axios.post(`/api/v1/accounts/payments`, payload);

export const getDashboard = (academicYearId) =>
  axios.get(`/api/v1/accounts/dashboard`, {
    params: { academicYearId }
  });
  export const updateFeeStructure = (id, payload) =>
  axios.put(`/api/v1/accounts/fee-structures/${id}`, payload);

export const deleteFeeStructure = (id) =>
  axios.delete(`/api/v1/accounts/fee-structures/${id}`);

export const toggleFeeStructure = (id) =>
  axios.patch(`/api/v1/accounts/fee-structures/${id}/toggle`);



