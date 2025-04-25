import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    oilChange: '',
    tireRotation: '',
    emailAlerts: false,
    smsAlerts: false,
    alertThresholdDays: 7,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('maintenance');

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/settings', settings, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Settings updated successfully.');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-inter p-6">
      <h1 className="text-4xl font-bold text-blue-300 mb-8">Settings</h1>
      {error && <p className="text-red-400 text-sm mb-4 animate-pulse">{error}</p>}
      {success && <p className="text-green-400 text-sm mb-4 animate-pulse">{success}</p>}
      <div className="bg-gray-800 p-6 rounded-2xl shadow-xl">
        <div className="flex border-b border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab('maintenance')}
            className={`py-2 px-4 text-sm font-medium ${activeTab === 'maintenance' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-300'}`}
          >
            Maintenance Intervals
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`py-2 px-4 text-sm font-medium ${activeTab === 'notifications' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-300'}`}
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`py-2 px-4 text-sm font-medium ${activeTab === 'users' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-300'}`}
          >
            User Management
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          {activeTab === 'maintenance' && (
            <div>
              <h2 className="text-2xl font-semibold text-blue-200 mb-4">Maintenance Intervals</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="oilChange" className="block text-sm font-medium text-blue-200">Oil Change Interval</label>
                  <input
                    type="text"
                    id="oilChange"
                    value={settings.oilChange}
                    onChange={handleChange}
                    className="mt-2 w-full max-w-xs px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder="e.g., 3 months or 3000 miles"
                  />
                </div>
                <div>
                  <label htmlFor="tireRotation" className="block text-sm font-medium text-blue-200">Tire Rotation Interval</label>
                  <input
                    type="text"
                    id="tireRotation"
                    value={settings.tireRotation}
                    onChange={handleChange}
                    className="mt-2 w-full max-w-xs px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder="e.g., 6 months"
                  />
                </div>
              </div>
            </div>
          )}
          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-2xl font-semibold text-blue-200 mb-4">Notification Preferences</h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="emailAlerts"
                    checked={settings.emailAlerts}
                    onChange={handleChange}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                  />
                  <label htmlFor="emailAlerts" className="ml-3 text-sm text-blue-200">Enable Email Alerts</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="smsAlerts"
                    checked={settings.smsAlerts}
                    onChange={handleChange}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                  />
                  <label htmlFor="smsAlerts" className="ml-3 text-sm text-blue-200">Enable SMS Alerts</label>
                </div>
                <div>
                  <label htmlFor="alertThresholdDays" className="block text-sm font-medium text-blue-200">Alert Threshold (Days)</label>
                  <input
                    type="number"
                    id="alertThresholdDays"
                    value={settings.alertThresholdDays}
                    onChange={handleChange}
                    className="mt-2 w-full max-w-xs px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    min="1"
                  />
                </div>
              </div>
            </div>
          )}
          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-semibold text-blue-200 mb-4">User Management</h2>
              <p className="text-gray-300 mb-4">Manage user accounts and roles.</p>
              <Link
                to="/users"
                className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                Go to User Management
              </Link>
            </div>
          )}
          {(activeTab === 'maintenance' || activeTab === 'notifications') && (
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
                    Saving...
                  </span>
                ) : (
                  'Save Settings'
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
