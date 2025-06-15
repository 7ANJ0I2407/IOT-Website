import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Logout failed");

      const data = await response.json();
      alert(data.message);
      setIsAuthenticated(false);
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (isAuthenticated === null) return null; // Waiting for auth check

  return (
    <nav className="bg-gray-900 p-4 flex flex-row-reverse">
      {/* <button
        className="text-white font-semibold text-lg"
        onClick={() => navigate("/")}
      >
        Home
      </button> */}
      {isAuthenticated && (
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
