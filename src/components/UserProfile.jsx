import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, data } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;




const UserProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [decision, setDecision] = useState(null);
    const [comment, setComment] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log(id);
                const response = await fetch(`${API_BASE_URL}/users/admin/seller/${id}`, {
                    method: "GET",
                    credentials: "include",
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch user");
                }
                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    if (loading) return <p className="text-center text-blue-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;
    if (!user) return <p className="text-center text-red-500">User not found</p>;

    const handleApprove = async () => {
      try {
          const response = await fetch(`${API_BASE_URL}/users/admin/approve/${id}`, {
              method: "PATCH",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
          });
  
          const data = await response.json(); // Parse JSON response
  
          if (!response.ok) {
              throw new Error(data.message || "Failed to approve user");
          }
  
          setDecision("approved");
          setSubmitted(true);
          setUser({ ...user, isApproved: true });
          alert(`User ${user.name} approved successfully!`);
      } catch (error) {
          alert("Error approving user: " + error.message);
      }
  };
  

    const handleDisapproveSubmit = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/admin/disapprove/${id}`, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json(); // Parse JSON response
            if (!response.ok) {
                throw new Error(data.message || "Failed to disapprove user");
            }
            setDecision("disapproved");
            setSubmitted(true);
            setUser({ ...user, isApproved: false });
            alert(`User ${user.name} disapproved.\nComment: ${comment || "No comment provided"}`);
        } catch (error) {
            alert("Error disapproving user: " + error.message);
        }
    };

    const handleDelete = async () => {
      try {
          const response = await fetch(`${API_BASE_URL}/users/admin/delete/${id}`, {
              method: "DELETE",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
          });
          const data = await response.json(); // Parse JSON response
          if (!response.ok) {
              throw new Error(data.message || "Failed to delete user");
          }
          alert(`User ${user.name} deleted successfully!`);
          navigate("/");
      } catch (error) {
          alert("Error deleting user: " + error.message);
      }
  };

    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
        <p className="text-gray-600">Email : {user.email}</p>
        <p className="text-gray-600">Phone : {user.phone}</p>
        <p className="text-gray-600">Address : {user.address}</p>

        <p className={user.isApproved ? "text-green-600" : "text-red-600"}>
          {user.isApproved ? "Verified" : "Not Verified"}
        </p>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Payment Screenshot</h3>
          <img src={user.paymentProof} alt="Payment proof" className="mt-2 w-full h-full object-cover rounded-md shadow-sm" />
        </div>

        <div className="mt-6 flex gap-4">
          <button 
            className={`px-4 py-2 rounded-md text-white ${decision === "approved" ? "bg-green-600" : "bg-green-500 hover:bg-green-600"}`} 
            onClick={handleApprove}
            disabled={submitted}
          >
            Approve
          </button>
          <button 
            className={`px-4 py-2 rounded-md text-white ${decision === "disapproved" ? "bg-red-600" : "bg-red-500 hover:bg-red-600"}`} 
            onClick={() => { setDecision("disapproved"); setSubmitted(false); }}
            disabled={submitted}
          >
            Disapprove
          </button>
          <button 
            className="px-4 py-2 rounded-md text-white bg-gray-500 hover:bg-gray-600" 
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
        {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}


        {decision === "disapproved" && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Reason for Disapproval (Optional)</label>
            <textarea
              className="mt-2 w-full p-2 border rounded-md"
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter comment (optional)..."
            ></textarea>
          </div>
        )}

        {decision === "disapproved" && (
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            onClick={handleDisapproveSubmit}
            disabled={submitted}
          >
            Submit
          </button>
        )}

        {submitted && (
          <p className="mt-4 text-green-600 font-semibold">Decision recorded successfully!</p>
        )}
      </div>
    );
};

export default UserProfile;