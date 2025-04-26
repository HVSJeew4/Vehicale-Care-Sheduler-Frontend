import React, { useState } from 'react';
import { toast } from 'react-toastify';

const RolePermissions = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy data for roles
  const roles = [
    { id: '1', name: 'Admin', permissions: ['All'], status: 'Active' },
    { id: '2', name: 'Owner', permissions: ['Manage Vehicles', 'View Reports'], status: 'Active' },
    { id: '3', name: 'Manager', permissions: ['Assign Tasks', 'View Calendar'], status: 'Active' },
    { id: '4', name: 'Driver', permissions: ['Report Issues', 'View Tasks'], status: 'Active' },
  ];

  // Filter roles based on search query
  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.permissions.some((perm) => perm.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleEditRole = (roleId) => {
    toast.info(`Editing role with ID: ${roleId}`);
    // Navigate to edit page or show modal in real implementation
  };

  const handleDeleteRole = (roleId) => {
    toast.success(`Role with ID: ${roleId} deleted`);
    // Call API to delete role in real implementation
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
      <h1 className="text-4xl font-bold text-blue-300 mb-8">Role Permissions</h1>
      <div className="space-y-8">
        {/* Role Summary */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-200">Role Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-900 to-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group">
              <div className="flex items-center space-x-4">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <h3 className="text-lg font-medium text-blue-200">Total Roles</h3>
                  <p className="text-2xl font-bold text-gray-100 animate-count">{roles.length}</p>
                  <p className="text-sm text-gray-400">All defined roles</p>
                </div>
              </div>
              <div className="absolute invisible group-hover:visible bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                Total number of roles
              </div>
            </div>
          </div>
        </div>

        {/* Role List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-200">Role List</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search roles by name or permissions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 bg-gray-800 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-4">
            {filteredRoles.length > 0 ? (
              filteredRoles.map((role) => (
                <div
                  key={role.id}
                  className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <div>
                        <h3 className="text-lg font-medium text-blue-200">{role.name}</h3>
                        <p className="text-sm text-gray-400">Permissions: {role.permissions.join(', ')}</p>
                        <p className="text-sm text-gray-400">Status: {role.status}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          role.status === 'Active' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                        }`}
                      >
                        {role.status}
                      </span>
                      <button
                        onClick={() => handleEditRole(role.id)}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0l-1.414-1.414a2 2 0 010-2.828L14.586 4.586a2 2 0 012.828 0z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteRole(role.id)}
                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="absolute invisible group-hover:visible bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                    Click to view role details
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No roles match your search.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolePermissions;
