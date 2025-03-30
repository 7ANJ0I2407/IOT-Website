import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logout logic here (e.g., clearing authentication state)
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <button
        className="text-white font-semibold text-lg"
        onClick={() => navigate("/")}
      >
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
