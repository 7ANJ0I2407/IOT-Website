import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const isAuthenticated = true; // Always true for testing

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
