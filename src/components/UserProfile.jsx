import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import users from '../utils/data'; // Ensure the correct path to your users' data

const UserProfile = () => {
    const { id } = useParams();
    const user = users.find((u) => u.id === Number(id));

    const [decision, setDecision] = useState(null);
    const [comment, setComment] = useState("");
    const [submitted, setSubmitted] = useState(false);

    if (!user) return <p className="text-center text-red-500">User not found</p>;

    const handleApprove = () => {
        setDecision("approved");
        setSubmitted(true);
        alert(`User ${user.name} approved successfully!`);
        // Handle approval logic here (API call, database update, etc.)
    };

    const handleDisapproveSubmit = () => {
        setSubmitted(true);
        alert(`User ${user.name} disapproved.\nComment: ${comment || "No comment provided"}`);
        // Handle disapproval logic here (API call, database update, etc.)
    };

    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
        <p className="text-gray-600">{user.location}</p>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Payment Screenshot</h3>
          <img src={user.paymentImg} alt="Payment proof" className="mt-2 w-full max-h-80 object-cover rounded-md shadow-sm" />
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
        </div>

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
