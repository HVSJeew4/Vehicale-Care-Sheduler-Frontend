/* eslint-disable no-undef */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import UserRoleButton from './UserRoleButton';

const ReportIssue = () => {
  const [formData, setFormData] = useState({ vehicleId: '', description: '' });
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:5000/api/vehicles', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVehicles(data);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to fetch vehicles.');
      }
    };
    fetchVehicles();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/issues', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Issue reported successfully!');
      navigate('/maintenance');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to report issue.');
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
        <h1 className="text-4xl font-bold text-blue-300 mb-8">Report Vehicle Issue</h1>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-2xl shadow-xl space-y-6 max-w-md">
          <div>
            <label htmlFor="vehicleId" className="block text-sm font-medium text-blue-200">Vehicle</label>
            <select
              id="vehicleId"
              value={formData.vehicleId}
              onChange={handleChange}
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
            <label htmlFor="description" className="block text-sm font-medium text-blue-200">Issue Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Reporting...' : 'Report Issue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportIssue;
