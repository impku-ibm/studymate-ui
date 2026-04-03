import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AcademicYearProvider } from "./context/AcademicYearContext";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AcademicYearProvider>
      <App />
    </AcademicYearProvider>
  </BrowserRouter>
);
