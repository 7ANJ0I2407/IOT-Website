import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Assume authenticated initially

  // Check authentication status on component mount
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const response = await fetch(`${API_BASE_URL}/users/admin/check-auth`, {
  //         method: "GET",
  //         credentials: "include", // Send cookies to check if session exists
  //       });

  //       if (!response.ok) {
  //         throw new Error("Not authenticated");
  //       }
  //     } catch (error) {
  //       setIsAuthenticated(false);
  //       navigate("/login"); // Redirect to login if not authenticated
  //     }
  //   };

  //   checkAuth();
  // }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/admin/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!isAuthenticated) return null; // Do not render Navbar if not authenticated

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <button className="text-white font-semibold text-lg" onClick={() => navigate("/")}>
        Home
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
