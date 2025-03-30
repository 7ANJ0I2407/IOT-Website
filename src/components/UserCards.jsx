import React from "react";
import { useNavigate } from "react-router-dom";
import users from "../utils/data";

const UserCards = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {users.map((user) => (
        <div 
          key={user.id} 
          className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition"
          onClick={() => navigate(`/user/${user.id}`)} // Navigate to user profile
        >
          <h3 className="text-xl font-bold">{user.name}</h3>
          <p className="text-gray-600">{user.location}</p>
        </div>
      ))}
    </div>
  );
};

export default UserCards;
