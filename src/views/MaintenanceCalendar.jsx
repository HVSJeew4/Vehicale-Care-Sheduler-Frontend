import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MaintenanceCalendar = () => {
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState('monthly');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ vehicleId: '', taskName: '', scheduledDate: '', assignedTo: '' });
  const [vehicles, setVehicles] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [tasksRes, vehiclesRes, usersRes] = await Promise.all([
          axios.get('http://localhost:5000/api/maintenance/tasks', {
            headers: { Authorization: `Bearer ${token}` },
            params: { view },
          }),
          axios.get('http://localhost:5000/api/vehicles', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/api/users', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setTasks(tasksRes.data);
        setVehicles(vehiclesRes.data);
        setUsers(usersRes.data.filter((u) => u.role === 'manager' || u.role === 'driver'));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [view]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/maintenance/tasks', newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsModalOpen(false);
      setNewTask({ vehicleId: '', taskName: '', scheduledDate: '', assignedTo: '' });
      const tasksRes = await axios.get('http://localhost:5000/api/maintenance/tasks', {
        headers: { Authorization: `Bearer ${token}` },
        params: { view },
      });
      setTasks(tasksRes.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-inter p-6">
      <h1 className="text-4xl font-bold text-blue-300 mb-8">Maintenance Calendar</h1>
      {error && <p className="text-red-400 text-sm mb-4 animate-pulse">{error}</p>}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <select
          value={view}
          onChange={(e) => setView(e.target.value)}
          className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 w-full sm:w-48"
        >
          <option value="monthly">Monthly View</option>
          <option value="weekly">Weekly View</option>
        </select>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        >
          Add Maintenance Task
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <svg className="animate-spin h-10 w-10 text-blue-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        </div>
      ) : (
        <div className="bg-gray-800 p-6 rounded-2xl shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-7 gap-2 text-center">
            <div className="font-semibold text-blue-200">Sun</div>
            <div className="font-semibold text-blue-200">Mon</div>
            <div className="font-semibold text-blue-200">Tue</div>
            <div className="font-semibold text-blue-200">Wed</div>
            <div className="font-semibold text-blue-200">Thu</div>
            <div className="font-semibold text-blue-200">Fri</div>
            <div className="font-semibold text-blue-200">Sat</div>
            {[...Array(35)].map((_, i) => (
              <div key={i} className="border border-gray-700 p-2 h-24 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                <span className="text-sm text-gray-300">{i + 1}</span>
                {tasks
                  .filter((task) => new Date(task.scheduledDate).getDate() === i + 1)
                  .map((task) => (
                    <Link
                      to={`/maintenance/tasks/${task.taskId}`}
                      key={task.taskId}
                      className={`block mt-1 text-xs text-white rounded p-1 ${
                        task.status === 'Pending' ? 'bg-yellow-500' : task.status === 'Overdue' ? 'bg-red-500' : 'bg-green-500'
                      } hover:scale-105 transition-transform duration-200`}
                    >
                      {task.taskName}
                    </Link>
                  ))}
              </div>
            ))}
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
            <h2 className="text-2xl font-bold text-blue-300 mb-6">Schedule Maintenance Task</h2>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label htmlFor="vehicleId" className="block text-sm font-medium text-blue-200">Vehicle</label>
                <select
                  id="vehicleId"
                  value={newTask.vehicleId}
                  onChange={(e) => setNewTask({ ...newTask, vehicleId: e.target.value })}
                  className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Vehicle</option>
                  {vehicles.map((v) => (
                    <option key={v.vehicleId} value={v.vehicleId}>{v.make} {v.model}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="taskName" className="block text-sm font-medium text-blue-200">Task Name</label>
                <input
                  type="text"
                  id="taskName"
                  value={newTask.taskName}
                  onChange={(e) => setNewTask({ ...newTask, taskName: e.target.value })}
                  className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="scheduledDate" className="block text-sm font-medium text-blue-200">Scheduled Date</label>
                <input
                  type="date"
                  id="scheduledDate"
                  value={newTask.scheduledDate}
                  onChange={(e) => setNewTask({ ...newTask, scheduledDate: e.target.value })}
                  className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="assignedTo" className="block text-sm font-medium text-blue-200">Assigned To</label>
                <select
                  id="assignedTo"
                  value={newTask.assignedTo}
                  onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                  className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Unassigned</option>
                  {users.map((u) => (
                    <option key={u.userId} value={u.userId}>{u.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Adding...' : 'Add Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenanceCalendar;
