import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ResetPasswords = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy data for users
  const users = [
    { id: '1', name: 'Jane Smith', email: 'jane.smith@example.com', lastReset: '2025-04-20' },
    { id: '2', name: 'Bob Johnson', email: 'bob.johnson@example.com', lastReset: '2025-04-15' },
    { id: '3', name: 'Alice Brown', email: 'alice.brown@example.com', lastReset: 'Never' },
    { id: '4', name: 'Tom Wilson', email: 'tom.wilson@example.com', lastReset: '2025-04-10' },
  ];

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleResetPassword = (userId) => {
    toast.success(`Password reset initiated for user with ID: ${userId}`);
    // Call API to initiate password reset in real implementation
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-inter p-6">
      <style>
        {`
          @keyframes countUp {
            from { transform: translateY(10px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-count {
            animation: countUp 0.5s ease-out;
          }
        `}
      </style>
      <h1 className="text-4xl font-bold text-blue-300 mb-8">Reset Passwords</h1>
      <div className="space-y-8">
        {/* Password Reset Summary */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-200">Password Reset Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group">
              <div className="flex items-center space-x-4">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-12 0 6 6 0 0112 0z" />
                </svg>
                <div>
                  <h3 className="text-lg font-medium text-blue-200">Total Users</h3>
                  <p className="text-2xl font-bold text-gray-100 animate-count">{users.length}</p>
                  <p className="text-sm text-gray-400">Users available for reset</p>
                </div>
              </div>
              <div className="absolute invisible group-hover:visible bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                Total users
              </div>
            </div>
          </div>
        </div>

        {/* User List for Password Reset */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-200">Reset User Passwords</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 bg-gray-800 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-4">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <div>
                        <h3 className="text-lg font-medium text-blue-200">{user.name}</h3>
                        <p className="text-sm text-gray-400">Email: {user.email}</p>
                        <p className="text-sm text-gray-400">Last Reset: {user.lastReset}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleResetPassword(user.id)}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-12 0 6 6 0 0112 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="absolute invisible group-hover:visible bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                    Click to view user details
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No users match your search.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswords;
