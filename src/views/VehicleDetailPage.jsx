import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VehicleDetailPage = () => {
  const { vehicleId } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [maintenanceHistory, setMaintenanceHistory] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [vehicleRes, historyRes, driversRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/vehicles/${vehicleId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:5000/api/maintenance/logs/${vehicleId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/api/drivers', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setVehicle(vehicleRes.data);
        setFormData(vehicleRes.data);
        setMaintenanceHistory(historyRes.data);
        setDrivers(driversRes.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [vehicleId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/vehicles/${vehicleId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicle(formData);
      setIsEditing(false);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-inter p-6">
      <h1 className="text-4xl font-bold text-blue-300 mb-8">Vehicle Details</h1>
      {error && <p className="text-red-400 text-sm mb-4 animate-pulse">{error}</p>}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <svg className="animate-spin h-10 w-10 text-blue-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        </div>
      ) : vehicle ? (
        <div className="bg-gray-800 p-6 rounded-2xl shadow-xl space-y-8">
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-blue-200">Vehicle Information</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>
            {isEditing ? (
              <form onSubmit={handleUpdate} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-blue-200">Make</label>
                  <input
                    type="text"
                    value={formData.make}
                    onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                    className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200">Model</label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200">Year</label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200">VIN</label>
                  <input
                    type="text"
                    value={formData.vin}
                    onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
                    className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200">Status</label>
                  <select
                    value={formData.currentStatus}
                    onChange={(e) => setFormData({ ...formData, currentStatus: e.target.value })}
                    className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200">Assigned Driver</label>
                  <select
                    value={formData.assignedDriver?.id || ''}
                    onChange={(e) => setFormData({ ...formData, assignedDriver: { id: e.target.value } })}
                    className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">None</option>
                    {drivers.map((driver) => (
                      <option key={driver.userId} value={driver.userId}>{driver.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-blue-200">Make:</p>
                  <p className="text-gray-100">{vehicle.make}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-200">Model:</p>
                  <p className="text-gray-100">{vehicle.model}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-200">Year:</p>
                  <p className="text-gray-100">{vehicle.year}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-200">VIN:</p>
                  <p className="text-gray-100">{vehicle.vin}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-200">Status:</p>
                  <p className={`text-${vehicle.currentStatus === 'Active' ? 'green' : 'yellow'}-400`}>{vehicle.currentStatus}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-200">Assigned Driver:</p>
                  <p className="text-gray-100">{vehicle.assignedDriver?.name || 'None'}</p>
                </div>
              </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-blue-200 mb-4">Maintenance History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Task</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {maintenanceHistory.map((log) => (
                    <tr key={log.logId} className="hover:bg-gray-700 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">{log.taskName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">{new Date(log.performedOn).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">{log.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-300">Vehicle not found.</p>
      )}
    </div>
  );
};

export default VehicleDetailPage;
