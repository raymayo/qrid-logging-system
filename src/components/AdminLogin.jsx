import React, { useState } from 'react';
import { Box } from "lucide-react";

const AdminLogin = ({ setAdminLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear any existing error
    setIsLoading(true); // Start loading state

    try {
      const response = await fetch('http://localhost:8000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid credentials, please try again.');
      }

      // If login is successful, update the app state to show admin view
      setAdminLoggedIn(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  return (
    <div className="w-screen grid h-screen grid-cols-12">
      {/* Left side */}
      <div className="bg-neutral-900 w-full h-screen col-span-7 flex flex-col p-6 justify-between">
        <div className="text-neutral-100 font-medium text-xl flex gap-2">
        <Box size={60}/>
            <div>
          <h1>QR Code Logging</h1>
          <h1>System</h1>
            </div>
        </div>
        <p className="text-xl text-neutral-100">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum aut ipsa, in illum sed porro optio velit necessitatibus officiis. Consequatur molestias doloremque at! Ex error, sapiente quo rem asperiores suscipit necessitatibus eius. Ratione facere, nulla possimus odio aperiam eaque corporis.
        </p>
      </div>

      {/* Right side */}
      <div className="w-full mx-auto col-start-8 col-end-13 p-16 grid place-items-center h-full relative">
        <p className="absolute top-6 right-6 font-extrabold text-2xl">QRID</p>
        <div className="w-full">
          <div className="flex gap-2 flex-col">
            <h1 className="text-center font-semibold text-4xl">Sign In</h1>
            <p className="text-center text-neutral-500">
              Sign in to access QRID Logging System
            </p>
          </div>
          <form onSubmit={handleLogin} className="w-full flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="border border-neutral-200 p-2 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="border border-neutral-200 p-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
              type="submit"
              className="p-2 bg-neutral-900 text-neutral-100 w-full rounded mt-4"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
