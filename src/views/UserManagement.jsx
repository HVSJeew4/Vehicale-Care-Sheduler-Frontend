import React, { useState } from 'react';
import { toast } from 'react-toastify';

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy data for users
  const users = [
    { id: '1', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'admin', status: 'Active' },
    { id: '2', name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'owner', status: 'Active' },
    { id: '3', name: 'Alice Brown', email: 'alice.brown@example.com', role: 'manager', status: 'Inactive' },
    { id: '4', name: 'Tom Wilson', email: 'tom.wilson@example.com', role: 'driver', status: 'Active' },
  ];

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditUser = (userId) => {
    toast.info(`Editing user with ID: ${userId}`);
    // Navigate to edit page or show modal in real implementation
  };

  const handleDeleteUser = (userId) => {
    toast.success(`User with ID: ${userId} deleted`);
    // Call API to delete user in real implementation
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
      <h1 className="text-4xl font-bold text-blue-300 mb-8">User Management</h1>
      <div className="space-y-8">
        {/* User Summary */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-200">User Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-900 to-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group">
              <div className="flex items-center space-x-4">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <div>
                  <h3 className="text-lg font-medium text-blue-200">Total Users</h3>
                  <p className="text-2xl font-bold text-gray-100 animate-count">{users.length}</p>
                  <p className="text-sm text-gray-400">All registered users</p>
                </div>
              </div>
              <div className="absolute invisible group-hover:visible bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                Total number of users
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-900 to-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group">
              <div className="flex items-center space-x-4">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="text-lg font-medium text-blue-200">Active Users</h3>
                  <p className="text-2xl font-bold text-gray-100 animate-count">
                    {users.filter((u) => u.status === 'Active').length}
                  </p>
                  <p className="text-sm text-gray-400">Currently active users</p>
                </div>
              </div>
              <div className="absolute invisible group-hover:visible bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                Number of active users
              </div>
            </div>
          </div>
        </div>

        {/* User List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-200">User List</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search users by name, email, or role..."
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
                        <p className="text-sm text-gray-400">Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          user.status === 'Active' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                        }`}
                      >
                        {user.status}
                      </span>
                      <button
                        onClick={() => handleEditUser(user.id)}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0l-1.414-1.414a2 2 0 010-2.828L14.586 4.586a2 2 0 012.828 0z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
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

export default UserManagement;