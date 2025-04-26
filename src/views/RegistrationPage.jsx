
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post('https://localhost:7016/api/Authentication/Register', formData);
      const { token } = data;
      localStorage.setItem('token', token);

      // Decode JWT to get role
      const decoded = jwtDecode(token);
      const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']?.toLowerCase() || 'driver';

      // Ensure token is persisted
      if (localStorage.getItem('token')) {
        toast.success('Registered successfully.');
        navigate(`/dashboard/${role}`, { replace: true });
      } else {
        throw new Error('Token not persisted');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 font-inter">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all hover:scale-105 duration-300">
        <h2 className="text-3xl font-bold text-center text-blue-300 mb-6">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-blue-200">Name</label>
            <input
              type="text"
              id="userName"
              value={formData.userName}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Enter your name"
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
              className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-blue-200">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-blue-200">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Enter your password"
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-blue-200">Role</label>
            <select
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            >
              <option value="">Select Role</option>
              <option value="owner">Fleet Owner</option>
              <option value="manager">Maintenance Manager</option>
              <option value="driver">Driver</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Registering...
              </span>
            ) : (
              'Register'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;