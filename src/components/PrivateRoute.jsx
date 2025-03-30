import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



const PrivateRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/check-auth', {
                    method: 'GET',
                    credentials: 'include',
                });
                
                if (!response.ok) {
                    throw new Error('Unauthorized');
                }

                const data = await response.json();
                setIsAuthenticated(true);
                setIsAdmin(data.role === 'admin');
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Show loading while checking auth
    }

    // return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
    return <Outlet />; // Allow access to all routes for now
};

export default PrivateRoute;
