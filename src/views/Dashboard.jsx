/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(role || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activityFilter, setActivityFilter] = useState('');

  useEffect(() => {
    // Simulate fetching user data with dummy data
    const dummyUser = {
      id: '123',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: role?.toLowerCase() || 'owner', // Default to 'owner' if role is undefined
    };

    try {
      const fetchedRole = dummyUser.role.toLowerCase();
      if (fetchedRole !== role?.toLowerCase()) {
        throw new Error('Role mismatch');
      }
      setUserRole(fetchedRole);
    } catch (err) {
      setError(err.message || 'Failed to authenticate.');
      toast.error(err.message || 'Authentication failed.');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }, [role, navigate]);

  const handleAddVehicle = () => {
    navigate('/vehicles');
  };

  const handleAssignTask = () => {
    navigate('/maintenance');
  };

  const handleReportIssue = () => {
    navigate('/report-issue');
  };

  const handleManageSettings = () => {
    navigate('/settings');
  };

  const handleViewReports = () => {
    navigate('/reports');
  };

  const handleViewCalendar = () => {
    navigate('/maintenance');
  };

  const handleViewTasks = () => {
    navigate('/maintenance');
  };

  const handleManageUsers = () => {
    navigate('/users');
  };

  const handleViewFleet = () => {
    navigate('/vehicles');
  };

  const handleViewAlerts = () => {
    navigate('/maintenance');
  };

  const handleRolePermissions = () => {
    navigate('/roles');
  };

  const handleResetPasswords = () => {
    navigate('/users/reset-passwords');
  };

  // Dummy data for fleet status (owner, manager)
  const fleetStatus = {
    totalVehicles: 10,
    activeVehicles: 8,
    underMaintenance: 2,
  };

  // Dummy data for upcoming maintenance alerts (owner, manager)
  const upcomingAlerts = [
    { id: '1', task: 'Oil Change', vehicle: 'Toyota Camry', dueDate: '2025-05-01', status: 'Pending' },
    { id: '2', task: 'Tire Rotation', vehicle: 'Ford F-150', dueDate: '2025-05-03', status: 'Pending' },
    { id: '3', task: 'Brake Inspection', vehicle: 'Honda Civic', dueDate: '2025-05-05', status: 'Urgent' },
  ];

  // Dummy data for admin: user accounts
  const userSummary = {
    totalUsers: 15,
    admins: 2,
    owners: 3,
    managers: 5,
    drivers: 5,
  };

  // Dummy data for admin: system settings
  const systemSettings = {
    alertThreshold: '7 days',
    maintenanceInterval: '6 months',
  };

  // Dummy data for admin: system performance
  const systemPerformance = {
    uptime: 99.8, // As percentage for progress bar
    avgResponseTime: 150, // In ms
    activeSessions: 10,
  };

  // Dummy data for admin: system health
  const systemHealth = {
    criticalAlerts: 1,
    status: 'Warning',
  };

  // Dummy data for admin: user activities
  const userActivities = [
    { id: '1', user: 'Jane Smith', action: 'Logged in', timestamp: '2025-04-25 09:00', type: 'login' },
    { id: '2', user: 'Bob Johnson', action: 'Updated vehicle', timestamp: '2025-04-25 08:45', type: 'update' },
    { id: '3', user: 'Alice Brown', action: 'Assigned task', timestamp: '2025-04-25 08:30', type: 'task' },
  ];

  // Filter activities based on search input
  const filteredActivities = userActivities.filter(
    (activity) =>
      activity.user.toLowerCase().includes(activityFilter.toLowerCase()) ||
      activity.action.toLowerCase().includes(activityFilter.toLowerCase())
  );

  const renderDashboardContent = () => {
    switch (userRole) {
      case 'owner':
      case 'manager':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-blue-200">
              {userRole === 'owner' ? 'Fleet Owner Dashboard' : 'Maintenance Manager Dashboard'}
            </h2>
            <p className="text-gray-300">
              {userRole === 'owner'
                ? 'Manage your fleet, view reports, and assign tasks.'
                : 'Schedule and assign maintenance tasks.'}
            </p>

            {/* Overview of Fleet Status */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-blue-200">Overview of Fleet Status</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                  onClick={handleViewFleet}
                  className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group"
                >
                  <div className="flex items-center space-x-4">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 4h4M4 8l4-4m12 4v4m0-4h-4m4 0l-4 4M4 16v4m0-4h4m-4 0l4 4m12-4v-4m0 4h-4m4 0l-4-4" />
                    </svg>
                    <div>
                      <h4 className="text-lg font-medium text-blue-200">Total Vehicles</h4>
                      <p className="text-2xl font-bold text-gray-100 animate-count">{fleetStatus.totalVehicles}</p>
                      <p className="text-sm text-gray-400">View all vehicles</p>
                    </div>
                  </div>
                  <div className="absolute invisible group-hover:visible bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                    Click to view all vehicles
                  </div>
                </div>
                <div
                  onClick={handleViewFleet}
                  className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group"
                >
                  <div className="flex items-center space-x-4">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="text-lg font-medium text-blue-200">Active Vehicles</h4>
                      <p className="text-2xl font-bold text-gray-100 animate-count">{fleetStatus.activeVehicles}</p>
                      <p className="text-sm text-gray-400">Currently operational</p>
                    </div>
                  </div>
                  <div className="absolute invisible group-hover:visible bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                    Click to view active vehicles
                  </div>
                </div>
                <div
                  onClick={handleViewFleet}
                  className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group"
                >
                  <div className="flex items-center space-x-4">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37 1 .608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h4 className="text-lg font-medium text-blue-200">Under Maintenance</h4>
                      <p className="text-2xl font-bold text-gray-100 animate-count">{fleetStatus.underMaintenance}</p>
                      <p className="text-sm text-gray-400">In maintenance</p>
                    </div>
                  </div>
                  <div className="absolute invisible group-hover:visible bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                    Click to view vehicles in maintenance
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Maintenance Alerts */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-blue-200">Upcoming Maintenance Alerts</h3>
              <div className="space-y-4">
                {upcomingAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    onClick={handleViewAlerts}
                    className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <h4 className="text-lg font-medium text-blue-200">{alert.task}</h4>
                          <p className="text-sm text-gray-400">Vehicle: {alert.vehicle}</p>
                          <p className="text-sm text-gray-400">Due: {alert.dueDate}</p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          alert.status === 'Urgent' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
                        }`}
                      >
                        {alert.status}
                      </span>
                    </div>
                    <div className="absolute invisible group-hover:visible bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                      Click to view maintenance details
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-blue-200">Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userRole === 'owner' ? (
                  <>
                    <div
                      onClick={handleAddVehicle}
                      className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group"
                    >
                      <div className="flex items-center space-x-4">
                        <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        <div>
                          <h4 className="text-lg font-medium text-blue-200">Add Vehicle</h4>
                          <p className="text-sm text-gray-400">Register a new vehicle to your fleet.</p>
                        </div>
                      </div>
                      <div className="absolute invisible group-hover:visible bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                        Click to add a new vehicle
                      </div>
                    </div>
                    <div
                      onClick={handleViewReports}
                      className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group"
                    >
                      <div className="flex items-center space-x-4">
                        <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-6h6v6m-6 0h6m-3-9V3" />
                        </svg>
                        <div>
                          <h4 className="text-lg font-medium text-blue-200">View Reports</h4>
                          <p className="text-sm text-gray-400">Analyze fleet performance and maintenance.</p>
                        </div>
                      </div>
                      <div className="absolute invisible group-hover:visible bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                        Click to view reports
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      onClick={handleAssignTask}
                      className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group"
                    >
                      <div className="flex items-center space-x-4">
                        <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <div>
                          <h4 className="text-lg font-medium text-blue-200">Assign Task</h4>
                          <p className="text-sm text-gray-400">Schedule maintenance for vehicles.</p>
                        </div>
                      </div>
                      <div className="absolute invisible group-hover:visible bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                        Click to assign a task
                      </div>
                    </div>
                    <div
                      onClick={handleViewCalendar}
                      className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group"
                    >
                      <div className="flex items-center space-x-4">
                        <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <h4 className="text-lg font-medium text-blue-200">View Calendar</h4>
                          <p className="text-sm text-gray-400">See upcoming maintenance schedules.</p>
                        </div>
                      </div>
                      <div className="absolute invisible group-hover:visible bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                        Click to view calendar
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      case 'driver':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-blue-200">Driver Dashboard</h2>
            <p className="text-gray-300">View assigned tasks and report issues.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                onClick={handleReportIssue}
                className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group"
              >
                <div className="flex items-center space-x-4">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-medium text-blue-200">Report Issue</h3>
                    <p className="text-sm text-gray-400">Submit vehicle or task issues.</p>
                  </div>
                </div>
                <div className="absolute invisible group-hover:visible bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                  Click to report an issue
                </div>
              </div>
              <div
                onClick={handleViewTasks}
                className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group"
              >
                <div className="flex items-center space-x-4">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-medium text-blue-200">View Tasks</h3>
                    <p className="text-sm text-gray-400">Check your assigned maintenance tasks.</p>
                  </div>
                </div>
                <div className="absolute invisible group-hover:visible bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                  Click to view tasks
                </div>
              </div>
            </div>
          </div>
        );
      case 'admin':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-blue-200">Administrator Dashboard</h2>
            <p className="text-gray-300">Manage users, configure settings, and monitor system performance.</p>

            {/* System Health */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-blue-200">System Health</h3>
              <div
                className="bg-gradient-to-r from-blue-900 to-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group"
              >
                <div className="flex items-center space-x-4">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="text-lg font-medium text-blue-200">System Status</h4>
                    <p className="text-2xl font-bold text-gray-100">{systemHealth.status}</p>
                    <p className="text-sm text-gray-400">Critical Alerts: {systemHealth.criticalAlerts}</p>
                  </div>
                </div>
                <div className="absolute invisible group-hover:visible bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                  Click to view system health details
                </div>
              </div>
            </div>

            {/* Manage User Accounts and Roles */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-blue-200">Manage User Accounts and Roles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                  onClick={handleManageUsers}
                  className="bg-gradient-to-r from-blue-900 to-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group"
                >
                  <div className="flex items-center space-x-4">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <div>
                      <h4 className="text-lg font-medium text-blue-200">Total Users</h4>
                      <p className="text-2xl font-bold text-gray-100 animate-count">{userSummary.totalUsers}</p>
                      <p className="text-sm text-gray-400">View all users</p>
                    </div>
                  </div>
                  <div className="absolute invisible group-hover:visible bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                    Click to view all users
                  </div>
                </div>
                <div
                  onClick={handleManageUsers}
                  className="bg-gradient-to-r from-blue-900 to-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group"
                >
                  <div className="flex items-center space-x-4">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div>
                      <h4 className="text-lg font-medium text-blue-200">Role Distribution</h4>
                      <p className="text-sm text-gray-100">
                        Admins: {userSummary.admins}, Owners: {userSummary.owners}
                      </p>
                      <p className="text-sm text-gray-400">Manage roles</p>
                    </div>
                  </div>
                  <div className="absolute invisible group-hover:visible bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                    Click to manage roles
                  </div>
                </div>
                <div
                  onClick={handleRolePermissions}
                  className="bg-gradient-to-r from-blue-900 to-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group"
                >
                  <div className="flex items-center space-x-4">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div>
                      <h4 className="text-lg font-medium text-blue-200">Role Permissions</h4>
                      <p className="text-sm text-gray-400">Edit role permissions</p>
                    </div>
                  </div>
                  <div className="absolute invisible group-hover:visible bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                    Click to edit role permissions
                  </div>
                </div>
              </div>
            </div>

            {/* Configure System Settings */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-blue-200">Configure System Settings</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                  onClick={handleManageSettings}
                  className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group"
                >
                  <div className="flex items-center space-x-4">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="text-lg font-medium text-blue-200">Alert Threshold</h4>
                      <p className="text-2xl font-bold text-gray-100">{systemSettings.alertThreshold}</p>
                      <p className="text-sm text-gray-400">Set alert timing</p>
                    </div>
                  </div>
                  <div className="absolute invisible group-hover:visible bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                    Click to configure alert threshold
                  </div>
                </div>
                <div
                  onClick={handleManageSettings}
                  className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group"
                >
                  <div className="flex items-center space-x-4">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24  Ön: 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <h4 className="text-lg font-medium text-blue-200">Maintenance Interval</h4>
                      <p className="text-2xl font-bold text-gray-100">{systemSettings.maintenanceInterval}</p>
                      <p className="text-sm text-gray-400">Set maintenance frequency</p>
                    </div>
                  </div>
                  <div className="absolute invisible group-hover:visible bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                    Click to configure maintenance interval
                  </div>
                </div>
                <div
                  onClick={handleManageSettings}
                  className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group"
                >
                  <div className="flex items-center space-x-4">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37 1 .608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h4 className="text-lg font-medium text-blue-200">System Settings</h4>
                      <p className="text-sm text-gray-400">Configure all settings</p>
                    </div>
                  </div>
                  <div className="absolute invisible group-hover:visible bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                    Click to configure all settings
                  </div>
                </div>
              </div>
            </div>

            {/* Monitor System Performance */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-blue-200">System Performance</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                  className="bg-gradient-to-r from-blue-900 to-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group"
                >
                  <div className="flex items-center space-x-4">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    <div>
                      <h4 className="text-lg font-medium text-blue-200">System Uptime</h4>
                      <p className="text-2xl font-bold text-gray-100 animate-count">{systemPerformance.uptime}%</p>
                      <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${systemPerformance.uptime}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">System availability</p>
                    </div>
                  </div>
                  <div className="absolute invisible group-hover:visible bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                    System uptime status
                  </div>
                </div>
                <div
                  className="bg-gradient-to-r from-blue-900 to-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group"
                >
                  <div className="flex items-center space-x-4">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="text-lg font-medium text-blue-200">Response Time</h4>
                      <p className="text-2xl font-bold text-gray-100 animate-count">{systemPerformance.avgResponseTime}ms</p>
                      <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${Math.min(100, 200 / systemPerformance.avgResponseTime * 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">Average API response</p>
                    </div>
                  </div>
                  <div className="absolute invisible group-hover:visible bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                    API response time
                  </div>
                </div>
                <div
                  className="bg-gradient-to-r from-blue-900 to-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group"
                >
                  <div className="flex items-center space-x-4">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div>
                      <h4 className="text-lg font-medium text-blue-200">Active Sessions</h4>
                      <p className="text-2xl font-bold text-gray-100 animate-count">{systemPerformance.activeSessions}</p>
                      <p className="text-sm text-gray-400">Current users online</p>
                    </div>
                  </div>
                  <div className="absolute invisible group-hover:visible bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                    Active user sessions
                  </div>
                </div>
              </div>
            </div>

            {/* Recent User Activities */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-blue-200">Recent User Activities</h3>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search activities..."
                  value={activityFilter}
                  onChange={(e) => setActivityFilter(e.target.value)}
                  className="w-full p-2 bg-gray-800 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-4">
                {filteredActivities.length > 0 ? (
                  filteredActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          <div>
                            <h4 className="text-lg font-medium text-blue-200">{activity.user}</h4>
                            <p className="text-sm text-gray-400">Action: {activity.action}</p>
                            <p className="text-sm text-gray-400">Time: {activity.timestamp}</p>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            activity.type === 'login'
                              ? 'bg-green-600 text-white'
                              : activity.type === 'update'
                              ? 'bg-yellow-600 text-white'
                              : 'bg-blue-600 text-white'
                          }`}
                        >
                          {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                        </span>
                      </div>
                      <div className="absolute invisible group-hover:visible bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                        Click to view activity details
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No activities match your search.</p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-blue-200">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                  onClick={handleManageUsers}
                  className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group"
                >
                  <div className="flex items-center space-x-4">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <div>
                      <h4 className="text-lg font-medium text-blue-200">Add User</h4>
                      <p className="text-sm text-gray-400">Create a new user account</p>
                    </div>
                  </div>
                  <div className="absolute invisible group-hover:visible bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                    Click to add a new user
                  </div>
                </div>
                <div
                  onClick={handleResetPasswords}
                  className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group"
                >
                  <div className="flex items-center space-x-4">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-12 0 6 6 0 0112 0z" />
                    </svg>
                    <div>
                      <h4 className="text-lg font-medium text-blue-200">Reset Passwords</h4>
                      <p className="text-sm text-gray-400">Initiate password resets</p>
                    </div>
                  </div>
                  <div className="absolute invisible group-hover:visible bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                    Click to reset user passwords
                  </div>
                </div>
                <div
                  className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group"
                >
                  <div className="flex items-center space-x-4">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <h4 className="text-lg font-medium text-blue-200">Export Logs</h4>
                      <p className="text-sm text-gray-400">Download system logs</p>
                    </div>
                  </div>
                  <div className="absolute invisible group-hover:visible bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                    Click to export system logs
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <p className="text-red-400">Invalid role. Please log in again.</p>;
    }
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
      <h1 className="text-4xl font-bold text-blue-300 mb-8">Dashboard</h1>
      {error && <p className="text-red-400 text-sm mb-4 animate-pulse">{error}</p>}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <svg className="animate-spin h-10 w-10 text-blue-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        </div>
      ) : (
        renderDashboardContent()
      )}
    </div>
  );
};

export default Dashboard;