
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import UserRoleButton from './UserRoleButton';

const NewDriver = () => {
  const [formData, setFormData] = useState({ name: '', email: '', status: 'active' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/drivers', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Driver added successfully!');
      navigate('/drivers');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add driver.');
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
        <h1 className="text-4xl font-bold text-blue-300 mb-8">Add New Driver</h1>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-2xl shadow-xl space-y-6 max-w-md">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-blue-200">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-blue-200">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-blue-200">Status</label>
            <select
              id="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Adding...' : 'Add Driver'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewDriver;
