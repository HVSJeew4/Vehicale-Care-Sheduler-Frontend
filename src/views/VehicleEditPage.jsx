import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import UserRoleButton from './UserRoleButton';

const VehicleEditPage = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState({ make: '', model: '', year: '', vin: '', status: 'active', vehicleType: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`http://localhost:5000/api/vehicles/${vehicleId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVehicle(data);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to fetch vehicle.');
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [vehicleId]);

  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/vehicles/${vehicleId}`, vehicle, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Vehicle updated successfully!');
      navigate('/vehicles');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update vehicle.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-inter flex">
      <Sidebar />
      <div className="flex-1 p-6 ml-64">
        <div className="flex justify-end mb-6">
          <UserRoleButton />
        </div>
        <h1 className="text-4xl font-bold text-blue-300 mb-8">Edit Vehicle</h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <svg className="animate-spin h-10 w-10 text-blue-500" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-2xl shadow-xl space-y-6 max-w-md">
            <div>
              <label htmlFor="make" className="block text-sm font-medium text-blue-200">Make</label>
              <input
                type="text"
                id="make"
                value={vehicle.make}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-blue-200">Model</label>
              <input
                type="text"
                id="model"
                value={vehicle.model}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-blue-200">Year</label>
              <input
                type="number"
                id="year"
                value={vehicle.year}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="vin" className="block text-sm font-medium text-blue-200">VIN</label>
              <input
                type="text"
                id="vin"
                value={vehicle.vin}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-blue-200">Status</label>
              <select
                id="status"
                value={vehicle.status}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label htmlFor="vehicleType" className="block text-sm font-medium text-blue-200">Vehicle Type</label>
              <select
                id="vehicleType"
                value={vehicle.vehicleType}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Type</option>
                <option value="Car">Car</option>
                <option value="Bicycle">Bicycle</option>
                <option value="Truck">Truck</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Updating...' : 'Update Vehicle'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default VehicleEditPage;
