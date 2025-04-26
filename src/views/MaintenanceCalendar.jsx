/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { dummyVehicles, dummyTasks, dummyUsers, dummyTaskTemplates } from '../services/dummyData';

const MaintenanceCalendar = () => {
  // State for tasks, view, modal, and new task
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState('month');
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    vehicleId: '',
    templateId: '',
    taskName: '',
    scheduledDate: '',
    assignedTo: '',
  });
  const [vehicles, setVehicles] = useState([]);
  const [users, setUsers] = useState([]);
  const [taskTemplates, setTaskTemplates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching data with dummy data
    // TODO: Replace with backend API calls
    // Example: const tasksRes = await axios.get('http://localhost:5000/api/maintenance/tasks', {
    //   headers: { Authorization: `Bearer ${token}` },
    //   params: { view },
    // });
    // Example: const vehiclesRes = await axios.get('http://localhost:5000/api/vehicles', { headers: { Authorization: `Bearer ${token}` } });
    // Example: const usersRes = await axios.get('http://localhost:5000/api/users', { headers: { Authorization: `Bearer ${token}` } });
    const fetchData = () => {
      try {
        setTasks(dummyTasks);
        setVehicles(dummyVehicles);
        setUsers(dummyUsers.filter((u) => u.role === 'manager' || u.role === 'driver'));
        setTaskTemplates(dummyTaskTemplates);
      } catch (err) {
        setError(err.message || 'Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [view]);

  const handleVehicleChange = (vehicleId) => {
    // Update task templates based on vehicle selection
    setNewTask({ ...newTask, vehicleId, taskName: '', templateId: '' });
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate adding a task
    // TODO: Replace with backend API call
    // Example: await axios.post('http://localhost:5000/api/maintenance/tasks', newTask, {
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    try {
      const newTaskData = {
        ...newTask,
        taskId: String(dummyTasks.length + 1),
        status: 'Pending',
        notes: '',
      };
      setTasks([...tasks, newTaskData]);
      setIsModalOpen(false);
      setNewTask({ vehicleId: '', templateId: '', taskName: '', scheduledDate: '', assignedTo: '' });
      toast.success('Task added successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to add task.');
    } finally {
      setLoading(false);
    }
  };

  // Simplified calendar grid for demo
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-inter p-6">
      <h1 className="text-4xl font-bold text-blue-300 mb-8">Maintenance Calendar</h1>
      {error && <p className="text-red-400 text-sm mb-4 animate-pulse">{error}</p>}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex gap-4">
          <button
            onClick={() => setView('month')}
            className={`px-4 py-2 rounded-lg ${view === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-100'}`}
          >
            Month
          </button>
          <button
            onClick={() => setView('week')}
            className={`px-4 py-2 rounded-lg ${view === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-100'}`}
          >
            Week
          </button>
        </div>
        <button
          onClick={() => {
            setSelectedDate(new Date().toISOString().split('T')[0]);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700"
        >
          Add Task
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
          {/* Simplified task list instead of calendar for demo */}
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.taskId}
                className="p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600"
                onClick={() => navigate(`/maintenance/tasks/${task.taskId}`)}
              >
                <p className="text-blue-200">{task.taskName}</p>
                <p className="text-gray-300">
                  {new Date(task.scheduledDate).toLocaleDateString()} - {task.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
            <h2 className="text-2xl font-bold text-blue-300 mb-6">Add New Task</h2>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label htmlFor="vehicleId" className="block text-sm font-medium text-blue-200">
                  Vehicle
                </label>
                <select
                  id="vehicleId"
                  value={newTask.vehicleId}
                  onChange={(e) => handleVehicleChange(e.target.value)}
                  className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Vehicle</option>
                  {vehicles.map((v) => (
                    <option key={v.vehicleId} value={v.vehicleId}>
                      {v.make} {v.model}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="taskName" className="block text-sm font-medium text-blue-200">
                  Task Name
                </label>
                <select
                  id="taskName"
                  value={newTask.taskName}
                  onChange={(e) => {
                    const template = taskTemplates[newTask.vehicleId]?.find((t) => t.taskName === e.target.value);
                    setNewTask({
                      ...newTask,
                      taskName: e.target.value,
                      templateId: template?.templateId || '',
                    });
                  }}
                  className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Task</option>
                  {taskTemplates[newTask.vehicleId]?.map((template) => (
                    <option key={template.templateId} value={template.taskName}>
                      {template.taskName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="scheduledDate" className="block text-sm font-medium text-blue-200">
                  Scheduled Date
                </label>
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
                <label htmlFor="assignedTo" className="block text-sm font-medium text-blue-200">
                  Assigned To
                </label>
                <select
                  id="assignedTo"
                  value={newTask.assignedTo}
                  onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                  className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Unassigned</option>
                  {users.map((u) => (
                    <option key={u.userId} value={u.userId}>
                      {u.name}
                    </option>
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
    </div>
  );
};

export default MaintenanceCalendar;
