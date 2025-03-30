import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



const AdminLogin = () => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/users/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include', // Allows cookies to be sent with the request
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            navigate('/');
        } catch (error) {
            setError('Invalid username, password, or insufficient privileges');
        }
        setLoading(false);
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6 py-12">
            <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
                <h2 className="text-center text-2xl font-bold text-gray-900">Admin Login</h2>
                {error && <p className="mt-4 text-center text-red-500">{error}</p>}
                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full justify-center items-center rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold shadow hover:bg-indigo-500 disabled:opacity-50"
                    >
                        {loading ? <Loader className="animate-spin w-5 h-5" /> : "Log in"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
