import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const AcademicYearContext = createContext();

export function AcademicYearProvider({ children }) {
  const [academicYearId, setAcademicYearId] = useState(null);
  const [academicYearLabel, setAcademicYearLabel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAcademicYear = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/academic-years");

        const year = Array.isArray(res.data)
          ? res.data.find(y => y.status === "ACTIVE") ?? res.data[0]
          : res.data;

        setAcademicYearId(year?.id ?? null);
        setAcademicYearLabel(
          year?.label ??
          year?.year ??
          year?.name ??
          null
        );
      } catch (e) {
        console.error("Failed to load academic year", e);
      } finally {
        setLoading(false);
      }
    };

    fetchAcademicYear();
  }, []);

  return (
    <AcademicYearContext.Provider
      value={{
        academicYearId,
        academicYearLabel,
        loading
      }}
    >
      {children}
    </AcademicYearContext.Provider>
  );
}
