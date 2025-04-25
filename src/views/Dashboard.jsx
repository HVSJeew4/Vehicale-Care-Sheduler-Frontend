/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [fleetStatus, setFleetStatus] = useState({ active: 0, maintenance: 0, inactive: 0 });
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Closed by default on mobile
  const [expandedCard, setExpandedCard] = useState(null);
  const [userRole, setUserRole] = useState('fleetOwner'); // Default role for demo

  useEffect(() => {
    // In a real app, fetch the user role from the backend or auth context
    /*
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserRole(response.data.role); // e.g., 'fleetOwner', 'maintenanceManager', 'driver', 'admin'
      } catch (err) {
        setError('Failed to fetch user role.');
      }
    };
    fetchUserRole();
    */

    const fetchDummyData = async () => {
      try {
        const dummyFleetStatus = {
          active: 12,
          maintenance: 3,
          inactive: 2,
          activeVehicles: [
            { id: 101, name: 'Toyota Camry' },
            { id: 102, name: 'Honda Civic' },
          ],
          maintenanceVehicles: [
            { id: 103, name: 'Ford F-150' },
          ],
          inactiveVehicles: [
            { id: 104, name: 'Chevrolet Malibu' },
          ],
        };

        const dummyUpcomingTasks = [
          {
            taskId: 1,
            vehicleId: 101,
            taskName: 'Oil Change',
            scheduledDate: new Date(2025, 3, 26).toISOString(),
          },
          {
            taskId: 2,
            vehicleId: 102,
            taskName: 'Tire Rotation',
            scheduledDate: new Date(2025, 3, 28).toISOString(),
          },
          {
            taskId: 3,
            vehicleId: 103,
            taskName: 'Brake Inspection',
            scheduledDate: new Date(2025, 3, 30).toISOString(),
          },
        ];

        const dummyNotifications = [
          {
            id: 1,
            message: 'Oil Change due for Vehicle #101 on April 26',
            date: new Date(2025, 3, 24, 9, 0).toISOString(),
            isOverdue: false,
          },
          {
            id: 2,
            message: 'Tire Rotation overdue for Vehicle #104',
            date: new Date(2025, 3, 23, 14, 30).toISOString(),
            isOverdue: true,
          },
          {
            id: 3,
            message: 'Maintenance scheduled for Vehicle #102',
            date: new Date(2025, 3, 24, 11, 15).toISOString(),
            isOverdue: false,
          },
        ];

        // Role-specific dummy data
        const dummyOverdueTasks = [
          {
            taskId: 4,
            vehicleId: 104,
            taskName: 'Tire Rotation',
            dueDate: new Date(2025, 3, 20).toISOString(),
          },
        ];

        const dummyTaskCompletionStatus = {
          completed: 5,
          pending: 3,
          overdue: 1,
        };

        const dummyAssignedVehicles = [
          { vehicleId: 101, driverId: 201, driverName: 'John Doe', make: 'Toyota Camry' },
          { vehicleId: 102, driverId: 202, driverName: 'Jane Smith', make: 'Honda Civic' },
        ];

        const dummyDriverAssignedVehicles = [
          { vehicleId: 101, make: 'Toyota Camry', model: '2020' },
        ];

        const dummyDriverReportedIssues = [
          { issueId: 1, vehicleId: 101, description: 'Brake noise', reportedDate: new Date(2025, 3, 22).toISOString() },
        ];

        const dummyMaintenanceCostSummary = {
          totalCost: 2500,
          recentServices: [
            { vehicleId: 101, service: 'Oil Change', cost: 50, date: new Date(2025, 3, 15).toISOString() },
            { vehicleId: 103, service: 'Brake Repair', cost: 200, date: new Date(2025, 3, 18).toISOString() },
          ],
        };

        const dummyUserActivity = [
          { userId: 301, action: 'Logged in', timestamp: new Date(2025, 3, 24, 8, 0).toISOString() },
          { userId: 302, action: 'Updated settings', timestamp: new Date(2025, 3, 24, 9, 30).toISOString() },
        ];

        const dummySystemPerformance = {
          uptime: '99.8%',
          activeUsers: 10,
        };

        const dummySystemSettings = {
          alertThresholdDays: 7,
          oilChangeInterval: '3 months',
        };

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setFleetStatus(dummyFleetStatus);
        setUpcomingTasks(dummyUpcomingTasks);
        setNotifications(dummyNotifications);

        // In a real app, fetch role-specific data from the backend
        /*
        if (userRole === 'fleetOwner') {
          const fleetRes = await axios.get('http://localhost:5000/api/vehicles/status', { headers: { Authorization: `Bearer ${token}` } });
          const tasksRes = await axios.get('http://localhost:5000/api/maintenance/upcoming', { headers: { Authorization: `Bearer ${token}` } });
          const costRes = await axios.get('http://localhost:5000/api/reports/maintenance-cost', { headers: { Authorization: `Bearer ${token}` } });
          setFleetStatus(fleetRes.data);
          setUpcomingTasks(tasksRes.data);
          setMaintenanceCostSummary(costRes.data);
        } else if (userRole === 'maintenanceManager') {
          const overdueRes = await axios.get('http://localhost:5000/api/maintenance/overdue', { headers: { Authorization: `Bearer ${token}` } });
          const statusRes = await axios.get('http://localhost:5000/api/maintenance/status', { headers: { Authorization: `Bearer ${token}` } });
          const vehiclesRes = await axios.get('http://localhost:5000/api/vehicles/assignments', { headers: { Authorization: `Bearer ${token}` } });
          setOverdueTasks(overdueRes.data);
          setTaskCompletionStatus(statusRes.data);
          setAssignedVehicles(vehiclesRes.data);
        } else if (userRole === 'driver') {
          const vehiclesRes = await axios.get('http://localhost:5000/api/drivers/my-vehicles', { headers: { Authorization: `Bearer ${token}` } });
          const tasksRes = await axios.get('http://localhost:5000/api/maintenance/upcoming/my-vehicles', { headers: { Authorization: `Bearer ${token}` } });
          const issuesRes = await axios.get('http://localhost:5000/api/issues/my-reports', { headers: { Authorization: `Bearer ${token}` } });
          setDriverAssignedVehicles(vehiclesRes.data);
          setUpcomingTasks(tasksRes.data);
          setDriverReportedIssues(issuesRes.data);
        } else if (userRole === 'admin') {
          const activityRes = await axios.get('http://localhost:5000/api/admin/user-activity', { headers: { Authorization: `Bearer ${token}` } });
          const performanceRes = await axios.get('http://localhost:5000/api/admin/performance', { headers: { Authorization: `Bearer ${token}` } });
          const settingsRes = await axios.get('http://localhost:5000/api/admin/settings', { headers: { Authorization: `Bearer ${token}` } });
          setUserActivity(activityRes.data);
          setSystemPerformance(performanceRes.data);
          setSystemSettings(settingsRes.data);
        }
        */
      } catch (err) {
        setError('Failed to load dummy data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDummyData();

    // Update sidebar state based on window size
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [userRole]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCard = (card) => {
    setExpandedCard(expandedCard === card ? null : card);
  };

  // Render sections based on user role
  const renderDashboardContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <svg className="animate-spin h-8 w-8 sm:h-10 sm:w-10 text-blue-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        </div>
      );
    }

    switch (userRole) {
      case 'fleetOwner':
        return (
          <div className="space-y-6 lg:space-y-8">
            {/* Fleet Status (US1.4) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  title: 'Active Vehicles',
                  count: fleetStatus.active,
                  icon: 'fa-car',
                  gradient: 'from-green-500 to-green-700',
                  vehicles: fleetStatus.activeVehicles,
                  key: 'active',
                },
                {
                  title: 'In Maintenance',
                  count: fleetStatus.maintenance,
                  icon: 'fa-tools',
                  gradient: 'from-yellow-500 to-yellow-700',
                  vehicles: fleetStatus.maintenanceVehicles,
                  key: 'maintenance',
                },
                {
                  title: 'Inactive',
                  count: fleetStatus.inactive,
                  icon: 'fa-parking',
                  gradient: 'from-red-500 to-red-700',
                  vehicles: fleetStatus.inactiveVehicles,
                  key: 'inactive',
                },
              ].map((card) => (
                <div
                  key={card.key}
                  className={`bg-gradient-to-r ${card.gradient} p-4 sm:p-6 rounded-2xl shadow-xl transform transition-all duration-300 cursor-pointer`}
                  onClick={() => toggleCard(card.key)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">{card.title}</h2>
                      <p className="text-2xl sm:text-3xl font-bold text-white">{card.count}</p>
                    </div>
                    <i className={`fas ${card.icon} text-2xl sm:text-3xl text-white opacity-75`}></i>
                  </div>
                  {expandedCard === card.key && (
                    <div className="mt-3 sm:mt-4 text-white">
                      <h3 className="text-xs sm:text-sm font-medium">Vehicles:</h3>
                      <ul className="mt-2 space-y-1">
                        {card.vehicles && card.vehicles.length > 0 ? (
                          card.vehicles.map((vehicle) => (
                            <li key={vehicle.id} className="text-xs sm:text-sm">
                              #{vehicle.id}: {vehicle.name}
                            </li>
                          ))
                        ) : (
                          <li className="text-xs sm:text-sm opacity-75">No vehicles in this category.</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Upcoming Maintenance (US1.3) */}
            <div className="bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-xl">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-blue-200 mb-4">
                Upcoming Maintenance
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-blue-200 uppercase tracking-wider">
                        Vehicle ID
                      </th>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-blue-200 uppercase tracking-wider">
                        Task
                      </th>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-blue-200 uppercase tracking-wider">
                        Scheduled Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {upcomingTasks.map((task) => (
                      <tr
                        key={task.taskId}
                        className="hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                      >
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-100">
                          <Link to={`/maintenance/tasks/${task.taskId}`} className="hover:text-blue-400">
                            #{task.vehicleId}
                          </Link>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-100">
                          {task.taskName}
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-100">
                          {new Date(task.scheduledDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Maintenance Cost Summary (US1.5) */}
            <div className="bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-xl">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-blue-200 mb-4">
                Maintenance Cost Summary
              </h2>
              <p className="text-gray-100 mb-4">
                Total Cost: <span className="text-blue-400">$2500</span>
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-blue-200 uppercase tracking-wider">
                        Vehicle ID
                      </th>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-blue-200 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-blue-200 uppercase tracking-wider">
                        Cost
                      </th>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-blue-200 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {[
                      { vehicleId: 101, service: 'Oil Change', cost: 50, date: new Date(2025, 3, 15).toISOString() },
                      { vehicleId: 103, service: 'Brake Repair', cost: 200, date: new Date(2025, 3, 18).toISOString() },
                    ].map((service, index) => (
                      <tr key={index} className="hover:bg-gray-700 transition-colors duration-200">
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-100">
                          #{service.vehicleId}
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-100">
                          {service.service}
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-100">
                          ${service.cost}
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-100">
                          {new Date(service.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'maintenanceManager':
        return (
          <div className="space-y-6 lg:space-y-8">
            {/* Overdue Tasks (US2.3) */}
            <div className="bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-xl">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-blue-200 mb-4">
                Overdue Tasks
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-blue-200 uppercase tracking-wider">
                        Vehicle ID
                      </th>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-blue-200 uppercase tracking-wider">
                        Task
                      </th>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-blue-200 uppercase tracking-wider">
                        Due Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {[
                      {
                        taskId: 4,
                        vehicleId: 104,
                        taskName: 'Tire Rotation',
                        dueDate: new Date(2025, 3, 20).toISOString(),
                      },
                    ].map((task) => (
                      <tr
                        key={task.taskId}
                        className="hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                      >
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-100">
                          <Link to={`/maintenance/tasks/${task.taskId}`} className="hover:text-blue-400">
                            #{task.vehicleId}
                          </Link>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-100">
                          {task.taskName}
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-100">
                          {new Date(task.dueDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Task Completion Status (US2.2) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  title: 'Completed Tasks',
                  count: 5,
                  icon: 'fa-check-circle',
                  gradient: 'from-green-500 to-green-700',
                  key: 'completed',
                },
                {
                  title: 'Pending Tasks',
                  count: 3,
                  icon: 'fa-hourglass-half',
                  gradient: 'from-blue-500 to-blue-700',
                  key: 'pending',
                },
                {
                  title: 'Overdue Tasks',
                  count: 1,
                  icon: 'fa-exclamation-circle',
                  gradient: 'from-red-500 to-red-700',
                  key: 'overdue',
                },
              ].map((card) => (
                <div
                  key={card.key}
                  className={`bg-gradient-to-r ${card.gradient} p-4 sm:p-6 rounded-2xl shadow-xl transform transition-all duration-300`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">{card.title}</h2>
                      <p className="text-2xl sm:text-3xl font-bold text-white">{card.count}</p>
                    </div>
                    <i className={`fas ${card.icon} text-2xl sm:text-3xl text-white opacity-75`}></i>
                  </div>
                </div>
              ))}
            </div>

            {/* Assigned Vehicles (US2.5) */}
            <div className="bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-xl">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-blue-200 mb-4">
                Assigned Vehicles
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-blue-200 uppercase tracking-wider">
                        Vehicle ID
                      </th>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-blue-200 uppercase tracking-wider">
                        Vehicle Make
                      </th>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-blue-200 uppercase tracking-wider">
                        Driver
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {[
                      { vehicleId: 101, driverId: 201, driverName: 'John Doe', make: 'Toyota Camry' },
                      { vehicleId: 102, driverId: 202, driverName: 'Jane Smith', make: 'Honda Civic' },
                    ].map((vehicle) => (
                      <tr key={vehicle.vehicleId} className="hover:bg-gray-700 transition-colors duration-200">
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-100">
                          #{vehicle.vehicleId}
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-100">
                          {vehicle.make}
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-100">
                          {vehicle.driverName}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'driver':
        return (
          <div className="space-y-6 lg:space-y-8">
            {/* Assigned Vehicles (US3.1) */}
            <div className="bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-xl">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-blue-200 mb-4">
                My Assigned Vehicles
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-blue-200 uppercase tracking-wider">
                        Vehicle ID
                      </th>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-blue-200 uppercase tracking-wider">
                        Make
                      </th>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-blue-200 uppercase tracking-wider">
                        Model
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {[
                      { vehicleId: 101, make: 'Toyota Camry', model: '2020' },
                    ].map((vehicle) => (
                      <tr key={vehicle.vehicleId} className="hover:bg-gray-700 transition-colors duration-200">
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-100">
                          #{vehicle.vehicleId}
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-100">
                          {vehicle.make}
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-100">
                          {vehicle.model}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Upcoming Maintenance for Assigned Vehicles (US3.3) */}
            <div className="bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-xl">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-blue-200 mb-4">
                Upcoming Maintenance
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-blue-200 uppercase tracking-wider">
                        Vehicle ID
                      </th>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-blue-200 uppercase tracking-wider">
                        Task
                      </th>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-blue-200 uppercase tracking-wider">
                        Scheduled Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {upcomingTasks
                      .filter((task) => task.vehicleId === 101) // Filter for driver's assigned vehicle
                      .map((task) => (
                        <tr
                          key={task.taskId}
                          className="hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                        >
                          <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-100">
                            <Link to={`/maintenance/tasks/${task.taskId}`} className="hover:text-blue-400">
                              #{task.vehicleId}
                            </Link>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-100">
                            {task.taskName}
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-100">
                            {new Date(task.scheduledDate).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reported Issues (US3.2) */}
            <div className="bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-xl">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-blue-200 mb-4">
                Reported Issues
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-blue-200 uppercase tracking-wider">
                        Vehicle ID
                      </th>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-blue-200 uppercase tracking-wider">
                        Issue
                      </th>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-blue-200 uppercase tracking-wider">
                        Reported Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {[
                      { issueId: 1, vehicleId: 101, description: 'Brake noise', reportedDate: new Date(2025, 3, 22).toISOString() },
                    ].map((issue) => (
                      <tr key={issue.issueId} className="hover:bg-gray-700 transition-colors duration-200">
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-100">
                          #{issue.vehicleId}
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-100">
                          {issue.description}
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-100">
                          {new Date(issue.reportedDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'admin':
        return (
          <div className="space-y-6 lg:space-y-8">
            {/* User Activity (US4.3) */}
            <div className="bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-xl">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-blue-200 mb-4">
                User Activity
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-blue-200 uppercase tracking-wider">
                        User ID
                      </th>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-blue-200 uppercase tracking-wider">
                        Action
                      </th>
                      <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-blue-200 uppercase tracking-wider">
                        Timestamp
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {[
                      { userId: 301, action: 'Logged in', timestamp: new Date(2025, 3, 24, 8, 0).toISOString() },
                      { userId: 302, action: 'Updated settings', timestamp: new Date(2025, 3, 24, 9, 30).toISOString() },
                    ].map((activity) => (
                      <tr key={activity.userId} className="hover:bg-gray-700 transition-colors duration-200">
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-100">
                          #{activity.userId}
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-100">
                          {activity.action}
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-100">
                          {new Date(activity.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* System Performance Metrics (US4.3) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                {
                  title: 'System Uptime',
                  value: '99.8%',
                  icon: 'fa-server',
                  gradient: 'from-blue-500 to-blue-700',
                  key: 'uptime',
                },
                {
                  title: 'Active Users',
                  value: 10,
                  icon: 'fa-users',
                  gradient: 'from-green-500 to-green-700',
                  key: 'activeUsers',
                },
              ].map((metric) => (
                <div
                  key={metric.key}
                  className={`bg-gradient-to-r ${metric.gradient} p-4 sm:p-6 rounded-2xl shadow-xl transform transition-all duration-300`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">{metric.title}</h2>
                      <p className="text-2xl sm:text-3xl font-bold text-white">{metric.value}</p>
                    </div>
                    <i className={`fas ${metric.icon} text-2xl sm:text-3xl text-white opacity-75`}></i>
                  </div>
                </div>
              ))}
            </div>

            {/* System Settings Summary (US4.2) */}
            <div className="bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-xl">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-blue-200 mb-4">
                System Settings Summary
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-100">
                    Alert Threshold: <span className="text-blue-400">7 days</span>
                  </p>
                </div>
                <div>
                  <p className="text-gray-100">
                    Oil Change Interval: <span className="text-blue-400">3 months</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <p className="text-gray-100 text-center">Role not recognized.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-inter flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-gray-800 text-gray-100 transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-0 lg:w-16'
        } lg:min-h-screen flex flex-col overflow-hidden`}
      >
        <div className="p-4 flex items-center justify-between">
          {isSidebarOpen && <h2 className="text-xl font-bold text-blue-300">Menu</h2>}
          <button onClick={toggleSidebar} className="text-blue-400 hover:text-blue-300 lg:hidden">
            <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2 p-4">
            {[
              { to: '/vehicles', icon: 'fa-car', label: 'Manage Vehicles' },
              { to: '/maintenance', icon: 'fa-calendar', label: 'Maintenance Schedules' },
              { to: '/reports', icon: 'fa-chart-bar', label: 'Reports' },
              { to: '/drivers', icon: 'fa-users', label: 'Driver Management' },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)} // Close sidebar on mobile after click
                  className="flex items-center p-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200 text-sm lg:text-base"
                >
                  <i className={`fas ${item.icon} ${isSidebarOpen ? 'mr-3' : 'mx-auto'} text-lg`}></i>
                  {isSidebarOpen && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-300">Dashboard</h1>
          <button onClick={toggleSidebar} className="text-blue-400 hover:text-blue-300">
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>

        {/* Hide title on mobile since it's in the hamburger menu bar */}
        <h1 className="hidden lg:block text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-300 mb-6 lg:mb-8">
          Dashboard
        </h1>

        {error && <p className="text-red-400 text-sm mb-4 animate-pulse">{error}</p>}
        {renderDashboardContent()}
      </div>
    </div>
  );
};

export default Dashboard;