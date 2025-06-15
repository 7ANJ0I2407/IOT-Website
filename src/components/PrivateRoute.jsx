import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PrivateRoute = () => {
  const [authState, setAuthState] = useState({
      isAuthenticated: null,
      isAdmin: false,
  });

  useEffect(() => {
      const checkAuth = async () => {
          try {
              const response = await fetch(`${API_BASE_URL}/api/admin/auth`, {
                method: 'GET',
                credentials: 'include', // This allows sending cookies
            });
              if (!response.ok) throw new Error('Unauthorized');

              const data = await response.json();
              console.log("Response: ", response);  // Log the response object
              // console.log("Data: ", data);  // Log the data received from the server
              // console.log("Role: ", data.user.role);  // Log the role received from the server
              setAuthState({ isAuthenticated: true, isAdmin: data.user.role === 'admin' });
          } catch (error) {
              console.error("Error: ", error.message);  // Log the error message in case of a failed fetch
              setAuthState({ isAuthenticated: false, isAdmin: false });
          }
      };

      checkAuth();
  }, []);

    if (authState.isAuthenticated === null) {
        return <div>Loading...</div>; // Show loading state while checking auth
    }

    if (!authState.isAuthenticated) {
        // If not authenticated, redirect to login or public route
        return <Navigate to="/error" replace />;
    }

    if (authState.isAuthenticated && !authState.isAdmin) {
        // If authenticated but not an admin, redirect to a different route
        return <Navigate to="/unauthorized" replace />;
    }

    // If authenticated and an admin, allow access to the nested route
    return <Outlet />;
};

export default PrivateRoute;
