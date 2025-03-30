import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;




const UserCards = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", location: "New York, USA", paymentImg: "/payment1.jpg" },
    { id: 2, name: "Emma Watson", location: "Los Angeles, USA", paymentImg: "/payment2.jpg" },
    { id: 3, name: "Michael Smith", location: "Chicago, USA", paymentImg: "/payment3.jpg" },
    { id: 4, name: "Sophia Johnson", location: "Houston, USA", paymentImg: "/payment4.jpg" },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users/admin/sellers`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    


    setTimeout(() => {
      setUsers([]); // Clear hardcoded users before fetching
      fetchUsers();
    }, 2000);
    console.log("Fetching users...");
    console.log(users);

  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {users.map((user) => (
        <div 
          key={user._id} 
          className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition"
          onClick={() => navigate(`/user/${user._id}`)}
        >
          <h3 className="text-xl font-bold">{user.name}</h3>
          <p className="text-gray-600">{user.phone}</p>
          <p className="text-gray-600">{user.email}</p>
          <p className={`font-semibold ${user.isApproved ? 'text-green-500' : 'text-red-500'}`}>
            {user.isApproved ? "Verified" : "Not Verified"}
          </p>
        </div>
      ))}
    </div>
  );
  
};

export default UserCards;
