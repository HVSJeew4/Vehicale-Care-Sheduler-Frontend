import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { dummyTasks, dummyUsers, dummyTaskTemplates, dummyVehicles } from '../services/dummyData';

const MaintenanceTaskDetailPage = () => {
  // Get task ID from URL
  const { taskId } = useParams();
  // State for task, vehicle, notes, status, assignee, users, and templates
  const [task, setTask] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [users, setUsers] = useState([]);
  const [taskTemplates, setTaskTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Simulate fetching task and related data with dummy data
    // TODO: Replace with backend API calls
    // Example: const taskRes = await axios.get(`http://localhost:5000/api/maintenance/tasks/${taskId}`, {
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    // Example: const vehicleRes = await axios.get(`http://localhost:5000/api/vehicles/${task.vehicleId}`, {
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    // Example: const usersRes = await axios.get('http://localhost:5000/api/users', {
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    // Example: const templatesRes = await axios.get(`http://localhost:5000/api/vehicles/${task.vehicleId}/task-templates`, {
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    const fetchData = () => {
      try {
        const foundTask = dummyTasks.find((t) => t.taskId === taskId);
        if (!foundTask) throw new Error('Task not found');
        const foundVehicle = dummyVehicles.find((v) => v.vehicleId === foundTask.vehicleId);
        setTask(foundTask);
        setVehicle(foundVehicle);
        setNotes(foundTask.notes || '');
        setStatus(foundTask.status);
        setAssignedTo(foundTask.assignedTo?.id || '');
        setUsers(dummyUsers.filter((u) => u.role === 'manager' || u.role === 'driver'));
        setTaskTemplates(dummyTaskTemplates[foundTask.vehicleId] || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch task.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [taskId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Simulate updating task
    // TODO: Replace with backend API call
    // Example: await axios.put(`http://localhost:5000/api/maintenance/tasks/${taskId}`, {
    //   ...task, notes, status, assignedTo
    // }, { headers: { Authorization: `Bearer ${token}` } });
    try {
      const updatedTask = {
        ...task,
        notes,
        status,
        assignedTo: assignedTo ? { id: assignedTo, name: users.find((u) => u.userId === assignedTo)?.name } : null,
      };
      setTask(dummyTasks.map((t) => (t.taskId === taskId ? updatedTask : t)));
      setTask(updatedTask);
      toast.success('Task updated successfully.');
    } catch (err) {
      toast.error(err.message || 'Failed to update task.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-inter p-6">
      <h1 className="text-4xl font-bold text-blue-300 mb-8">Maintenance Task Details</h1>
      {error && <p className="text-red-400 text-sm mb-4 animate-pulse">{error}</p>}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <svg className="animate-spin h-10 w-10 text-blue-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        </div>
      ) : task ? (
        <form onSubmit={handleUpdate} className="bg-gray-800 p-6 rounded-2xl shadow-xl space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-blue-200 mb-4">Task Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-200">Task Type:</label>
                <select
                  value={task.taskName}
                  onChange={(e) => {
                    const template = taskTemplates.find((t) => t.taskName === e.target.value);
                    setTask({
                      ...task,
                      taskName: e.target.value,
                      templateId: template?.templateId || '',
                    });
                  }}
                  className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {taskTemplates.map((template) => (
                    <option key={template.templateId} value={template.taskName}>
                      {template.taskName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-200">Scheduled Date:</p>
                <p className="text-gray-100">{new Date(task.scheduledDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-200">Vehicle Type:</p>
                <p className="text-gray-100">{vehicle?.vehicleType || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-200">Status:</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-200">Assigned To:</label>
                <select
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
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
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-blue-200 mb-4">Notes</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              rows="4"
              placeholder="Add notes or comments..."
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Updating...
                </span>
              ) : (
                'Update Task'
              )}
            </button>
          </div>
        </form>
      ) : (
        <p className="text-gray-300">Task not found.</p>
      )}
    </div>
  );
};

export default MaintenanceTaskDetailPage;
