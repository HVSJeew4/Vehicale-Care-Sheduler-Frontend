/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const UserRoleButton = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token');

        // Decode JWT to get role and name as fallback
        const decoded = jwtDecode(token);
        const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']?.toLowerCase() || 'driver';
        const name = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || 'User';

        // Attempt to fetch user details
        const { data } = await axios.get('https://localhost:7016/api/Authentication/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser({ ...data, role });
      } catch (err) {
        console.error('Failed to fetch user details:', err);
        // Fallback to token data instead of clearing token
        const token = localStorage.getItem('token');
        if (token) {
          const decoded = jwtDecode(token);
          setUser({
            name: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || 'User',
            role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']?.toLowerCase() || 'driver',
            email: decoded.email || 'unknown@example.com',
          });
        } else {
          toast.error('Session expired. Please log in again.');
          navigate('/login');
        }
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully.');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gray-800 text-gray-100 px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-expanded={isOpen}
        aria-controls="user-dropdown"
      >
        <span>{user.name}</span>
        <span className="text-blue-300 capitalize">{user.role}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div
          id="user-dropdown"
          className="absolute right-0 mt-2 w-48 max-w-[90vw] bg-gray-800 rounded-lg shadow-xl z-10"
        >
          <div className="p-4">
            <p className="text-sm text-gray-300">Name: {user.name}</p>
            <p className="text-sm text-gray-300">Role: {user.role}</p>
            <p className="text-sm text-gray-300">Email: {user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 rounded-b-lg"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserRoleButton;