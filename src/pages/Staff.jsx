import { useState } from "react";
import StaffDirectory from "../components/staff/StaffDirectory";

export default function StaffPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Staff</h2>
        <p className="text-sm text-gray-500">
          Manage non-teaching staff members
        </p>
      </div>
      <StaffDirectory />
    </div>
  );
}
