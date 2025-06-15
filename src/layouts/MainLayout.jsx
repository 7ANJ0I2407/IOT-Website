// src/layouts/AdminLayout.jsx
import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <Outlet /> {/* Nested route (like /dashboard) will render here */}
      </div>
    </>
  );
};

export default AdminLayout;
