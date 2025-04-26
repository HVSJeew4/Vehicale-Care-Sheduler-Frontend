import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const MaintenanceDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [vehicles, setVehicles] = useState([]); // To populate vehicle dropdown
  const [drivers, setDrivers] = useState([]); // To populate driver dropdown
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false); // New state for schedule modal
  const [newTask, setNewTask] = useState({
    vehicleId: '',
    userId: '',
    taskDescription: '',
    dueDate: '',
    status: 'Pending',
  });
  const [newSchedule, setNewSchedule] = useState({
    vehicleId: '',
    maintenanceDate: '',
    description: '',
    isAlertEnabled: false,
    alertDate: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        // Fetch maintenance tasks
        const tasksRes = await axios.get('https://localhost:7016/api/MaintenanceTask/GetAllTask', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(tasksRes.data);

        // Fetch maintenance schedules
        const schedulesRes = await axios.get('https://localhost:7016/api/MaintenanceSchedule', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSchedules(schedulesRes.data);

        // Fetch vehicles for dropdown
        const vehiclesRes = await axios.get('https://localhost:7016/api/Vehicle/GetAllVehicles', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVehicles(vehiclesRes.data);

        // Fetch users and filter for drivers
        const usersRes = await axios.get('https://localhost:7016/api/Users/All-Users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const fetchedDrivers = usersRes.data.filter((user) => user.role === 'Driver');
        setDrivers(fetchedDrivers);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch data.');
        toast.error(err.response?.data?.message || 'Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const taskData = {
        vehicleId: parseInt(newTask.vehicleId),
        userId: newTask.userId || null,
        taskDescription: newTask.taskDescription,
        dueDate: newTask.dueDate,
        status: newTask.status,
      };

      const response = await axios.post('https://localhost:7016/api/MaintenanceTask/AddNewTask', taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks([...tasks, response.data]);
      setIsTaskModalOpen(false);
      setNewTask({ vehicleId: '', userId: '', taskDescription: '', dueDate: '', status: 'Pending' });
      toast.success('Task added successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add task.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSchedule = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const scheduleData = {
        vehicleId: parseInt(newSchedule.vehicleId),
        maintenanceDate: newSchedule.maintenanceDate,
        description: newSchedule.description || null,
        isAlertEnabled: newSchedule.isAlertEnabled,
        alertDate: newSchedule.isAlertEnabled ? newSchedule.alertDate : null,
      };

      const response = await axios.post('https://localhost:7016/api/MaintenanceSchedule', scheduleData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSchedules([...schedules, response.data]);
      setIsScheduleModalOpen(false);
      setNewSchedule({
        vehicleId: '',
        maintenanceDate: '',
        description: '',
        isAlertEnabled: false,
        alertDate: '',
      });
      toast.success('Schedule added successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add schedule.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`https://localhost:7016/api/MaintenanceTask/DeleteTask${taskId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(tasks.filter((t) => t.id !== taskId));
        toast.success('Task deleted successfully.');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to delete task.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-inter p-6">
      <h1 className="text-4xl font-bold text-blue-300 mb-8">Maintenance Dashboard</h1>
      {error && <p className="text-red-400 text-sm mb-4 animate-pulse">{error}</p>}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <svg className="animate-spin h-10 w-10 text-blue-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        </div>
      ) : (
        <>
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-blue-200">Maintenance Tasks</h2>
              <button
                onClick={() => setIsTaskModalOpen(true)}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add New Task
              </button>
            </div>
            <div className="bg-gray-800 rounded-2xl shadow-xl overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Task Description</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Vehicle ID</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Due Date</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Assigned To</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {tasks.map((task) => (
                    <tr key={task.id} className="hover:bg-gray-700 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                        <Link to={`/maintenance/tasks/${task.id}`} className="hover:text-blue-400">
                          {task.taskDescription}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">{task.vehicleId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">{new Date(task.dueDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400">{task.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">{task.assinedUser || 'Unassigned'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Link to={`/maintenance/tasks/${task.id}`} className="text-blue-400 hover:text-blue-300 mr-4">
                          View
                        </Link>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-blue-200">Maintenance Schedules</h2>
              <button
                onClick={() => setIsScheduleModalOpen(true)}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add New Schedule
              </button>
            </div>
            <div className="bg-gray-800 rounded-2xl shadow-xl overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Vehicle ID</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Maintenance Date</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Alert Enabled</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Alert Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {schedules.map((schedule) => (
                    <tr key={schedule.id} className="hover:bg-gray-700 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">{schedule.vehicleId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">{new Date(schedule.maintenanceDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">{schedule.description || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400">{schedule.isAlertEnabled ? 'Yes' : 'No'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                        {schedule.alertDate ? new Date(schedule.alertDate).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {isTaskModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
                <h2 className="text-2xl font-bold text-blue-300 mb-6">Add New Maintenance Task</h2>
                <form onSubmit={handleAddTask} className="space-y-4">
                  <div>
                    <label htmlFor="vehicleId" className="block text-sm font-medium text-blue-200">
                      Vehicle
                    </label>
                    <select
                      id="vehicleId"
                      value={newTask.vehicleId}
                      onChange={(e) => setNewTask({ ...newTask, vehicleId: e.target.value })}
                      className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Vehicle</option>
                      {vehicles.map((vehicle) => (
                        <option key={vehicle.id} value={vehicle.id}>
                          {vehicle.make} {vehicle.model} ({vehicle.year})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="userId" className="block text-sm font-medium text-blue-200">
                      Assigned To (Driver)
                    </label>
                    <select
                      id="userId"
                      value={newTask.userId}
                      onChange={(e) => setNewTask({ ...newTask, userId: e.target.value })}
                      className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Unassigned</option>
                      {drivers.map((driver) => (
                        <option key={driver.id} value={driver.id}>
                          {driver.userName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="taskDescription" className="block text-sm font-medium text-blue-200">
                      Task Description
                    </label>
                    <input
                      type="text"
                      id="taskDescription"
                      value={newTask.taskDescription}
                      onChange={(e) => setNewTask({ ...newTask, taskDescription: e.target.value })}
                      className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium text-blue-200">
                      Due Date
                    </label>
                    <input
                      type="date"
                      id="dueDate"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-blue-200">
                      Status
                    </label>
                    <select
                      id="status"
                      value={newTask.status}
                      onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                      className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setIsTaskModalOpen(false)}
                      className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {loading ? 'Adding...' : 'Add Task'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {isScheduleModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
                <h2 className="text-2xl font-bold text-blue-300 mb-6">Add New Maintenance Schedule</h2>
                <form onSubmit={handleAddSchedule} className="space-y-4">
                  <div>
                    <label htmlFor="scheduleVehicleId" className="block text-sm font-medium text-blue-200">
                      Vehicle
                    </label>
                    <select
                      id="scheduleVehicleId"
                      value={newSchedule.vehicleId}
                      onChange={(e) => setNewSchedule({ ...newSchedule, vehicleId: e.target.value })}
                      className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Vehicle</option>
                      {vehicles.map((vehicle) => (
                        <option key={vehicle.id} value={vehicle.id}>
                          {vehicle.make} {vehicle.model} ({vehicle.year})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="maintenanceDate" className="block text-sm font-medium text-blue-200">
                      Maintenance Date
                    </label>
                    <input
                      type="date"
                      id="maintenanceDate"
                      value={newSchedule.maintenanceDate}
                      onChange={(e) => setNewSchedule({ ...newSchedule, maintenanceDate: e.target.value })}
                      className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-blue-200">
                      Description
                    </label>
                    <input
                      type="text"
                      id="description"
                      value={newSchedule.description}
                      onChange={(e) => setNewSchedule({ ...newSchedule, description: e.target.value })}
                      className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="isAlertEnabled" className="block text-sm font-medium text-blue-200">
                      Enable Alert
                    </label>
                    <input
                      type="checkbox"
                      id="isAlertEnabled"
                      checked={newSchedule.isAlertEnabled}
                      onChange={(e) => setNewSchedule({ ...newSchedule, isAlertEnabled: e.target.checked })}
                      className="mt-2 h-5 w-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                  </div>
                  {newSchedule.isAlertEnabled && (
                    <div>
                      <label htmlFor="alertDate" className="block text-sm font-medium text-blue-200">
                        Alert Date
                      </label>
                      <input
                        type="date"
                        id="alertDate"
                        value={newSchedule.alertDate}
                        onChange={(e) => setNewSchedule({ ...newSchedule, alertDate: e.target.value })}
                        className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required={newSchedule.isAlertEnabled}
                      />
                    </div>
                  )}
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setIsScheduleModalOpen(false)}
                      className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {loading ? 'Adding...' : 'Add Schedule'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MaintenanceDashboard;