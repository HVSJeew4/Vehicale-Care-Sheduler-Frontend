import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DriverDetailPage = () => {
  const { driverId } = useParams();
  const [driver, setDriver] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [issueReport, setIssueReport] = useState({ vehicleId: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [driverRes, vehiclesRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/drivers/${driverId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/api/vehicles', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setDriver(driverRes.data);
        setFormData(driverRes.data);
        setVehicles(vehiclesRes.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [driverId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/drivers/${driverId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDriver(formData);
      setIsEditing(false);
      setSuccess('Driver updated successfully.');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReportIssue = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/issues', issueReport, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIssueReport({ vehicleId: '', description: '' });
      setSuccess('Issue reported successfully.');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-inter p-6">
      <h1 className="text-4xl font-bold text-blue-300 mb-8">Driver Details</h1>
      {error && <p className="text-red-400 text-sm mb-4 animate-pulse">{error}</p>}
      {success && <p className="text-green-400 text-sm mb-4 animate-pulse">{success}</p>}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <svg className="animate-spin h-10 w-10 text-blue-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        </div>
      ) : driver ? (
        <div className="space-y-8">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-blue-200">Driver Information</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>
            {isEditing ? (
              <form onSubmit={handleUpdate} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-blue-200">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200">Assigned Vehicles</label>
                  <select
                    multiple
                    value={formData.assignedVehicles?.map((v) => v.vehicleId) || []}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        assignedVehicles: Array.from(e.target.selectedOptions, (option) => ({
                          vehicleId: option.value,
                          make: vehicles.find((v) => v.vehicleId === option.value).make,
                        })),
                      })
                    }
                    className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  >
                    {vehicles.map((vehicle) => (
                      <option key={vehicle.vehicleId} value={vehicle.vehicleId}>
                        {vehicle.make} {vehicle.model}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-blue-200">Name:</p>
                  <p className="text-gray-100">{driver.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-200">Email:</p>
                  <p className="text-gray-100">{driver.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-200">Status:</p>
                  <p className={`text-${driver.status === 'active' ? 'green' : 'yellow'}-400`}>{driver.status}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-200">Assigned Vehicles:</p>
                  <p className="text-gray-100">
                    {driver.assignedVehicles?.length ? driver.assignedVehicles.map((v) => v.make).join(', ') : 'None'}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold text-blue-200 mb-4">Report Vehicle Issue</h2>
            <form onSubmit={handleReportIssue} className="space-y-4">
              <div>
                <label htmlFor="vehicleId" className="block text-sm font-medium text-blue-200">Vehicle</label>
                <select
                  id="vehicleId"
                  value={issueReport.vehicleId}
                  onChange={(e) => setIssueReport({ ...issueReport, vehicleId: e.target.value })}
                  className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  required
                >
                  <option value="">Select Vehicle</option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.vehicleId} value={vehicle.vehicleId}>
                      {vehicle.make} {vehicle.model}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-blue-200">Issue Description</label>
                <textarea
                  id="description"
                  value={issueReport.description}
                  onChange={(e) => setIssueReport({ ...issueReport, description: e.target.value })}
                  className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  rows="4"
                  placeholder="Describe the issue..."
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Reporting...
                    </span>
                  ) : (
                    'Report Issue'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <p className="text-gray-300">Driver not found.</p>
      )}
    </div>
  );
};

export default DriverDetailPage;
