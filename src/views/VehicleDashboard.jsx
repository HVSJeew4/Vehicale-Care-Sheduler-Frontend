import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const VehicleDashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    make: '',
    model: '',
    year: '',
    vin: '',
    status: 'active', // Frontend uses string for UI
    vehicleType: '',
  });
  const navigate = useNavigate();

  // Vehicle types matching backend VehicleTypeEnum
  const vehicleTypes = ['Car', 'Bicycle', 'Truck', 'Motorcycle'];

  // Map frontend status strings to backend CurrentStatusTypeEnum values
  const statusToEnumMap = {
    active: 1, // Active = 1
    inactive: 2, // Inactive = 2
    maintenance: 3, // Maintenance = 3
  };

  // Reverse map for displaying status in UI
  const enumToStatusMap = {
    1: 'active',
    2: 'inactive',
    3: 'maintenance',
  };

  // Map frontend vehicleType strings to backend VehicleTypeEnum values
  const vehicleTypeToEnumMap = {
    Car: 1, // Car = 1
    Bicycle: 2, // Bicycle = 2
    Truck: 3, // Truck = 3
    Motorcycle: 4, // Motorcycle = 4
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        // Fetch vehicles from backend
        const response = await axios.get('https://localhost:7016/api/Vehicle/GetAllVehicles', {
          headers: { Authorization: `Bearer ${token}` },
          params: {
          search: search || '',  // if search is undefined, send empty string
          status: filter || '',
        },
        });

        let fetchedVehicles = response.data;

        // Apply search and filter on the frontend (can be moved to backend if needed)
        if (search) {
          fetchedVehicles = fetchedVehicles.filter(
            (v) =>
              v.make.toLowerCase().includes(search.toLowerCase()) ||
              v.model.toLowerCase().includes(search.toLowerCase())
          );
        }
        if (filter) {
          fetchedVehicles = fetchedVehicles.filter(
            (v) => enumToStatusMap[v.currentStatusType].toLowerCase() === filter.toLowerCase()
          );
        }

        setVehicles(fetchedVehicles);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch vehicles.');
        toast.error(err.response?.data?.message || 'Failed to fetch vehicles.');
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, [search, filter, navigate]);

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // Map the status and vehicleType to backend enum values
      const vehicleData = {
        make: newVehicle.make,
        model: newVehicle.model,
        year: parseInt(newVehicle.year),
        vin: newVehicle.vin,
        vehicleType: vehicleTypeToEnumMap[newVehicle.vehicleType], // Convert to integer (e.g., "Car" -> 1)
        currentStatusType: statusToEnumMap[newVehicle.status], // Map to enum value
      };

      const response = await axios.post('https://localhost:7016/api/Vehicle/AddVehicle', vehicleData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setVehicles([...vehicles, response.data]);
      setIsModalOpen(false);
      setNewVehicle({ make: '', model: '', year: '', vin: '', status: 'active', vehicleType: '' });
      toast.success('Vehicle added successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add vehicle.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (vehicleId) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        await axios.delete(`https://localhost:7016/api/Vehicle/DeleteVehicle/${vehicleId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setVehicles(vehicles.filter((v) => v.id !== vehicleId));
        toast.success('Vehicle deleted successfully!');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to delete vehicle.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-inter p-6">
      <h1 className="text-4xl font-bold text-blue-300 mb-8">Vehicle Dashboard</h1>
      {error && <p className="text-red-400 text-sm mb-4 animate-pulse">{error}</p>}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search vehicles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 w-full sm:w-64"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 w-full sm:w-48"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="maintenance">Maintenance</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        >
          Add New Vehicle
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
        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Make</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Model</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Year</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-700 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                    <Link to={`/vehicles/${vehicle.id}`} className="hover:text-blue-400">
                      {vehicle.make}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">{vehicle.model}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">{vehicle.year}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400">
                    {enumToStatusMap[vehicle.currentStatusType]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link to={`/vehicles/edit/${vehicle.id}`} className="text-blue-400 hover:text-blue-300 mr-4">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(vehicle.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
            <h2 className="text-2xl font-bold text-blue-300 mb-6">Add New Vehicle</h2>
            <form onSubmit={handleAddVehicle} className="space-y-4">
              <div>
                <label htmlFor="make" className="block text-sm font-medium text-blue-200">
                  Make
                </label>
                <input
                  type="text"
                  id="make"
                  value={newVehicle.make}
                  onChange={(e) => setNewVehicle({ ...newVehicle, make: e.target.value })}
                  className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-blue-200">
                  Model
                </label>
                <input
                  type="text"
                  id="model"
                  value={newVehicle.model}
                  onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                  className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-blue-200">
                  Year
                </label>
                <input
                  type="number"
                  id="year"
                  value={newVehicle.year}
                  onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
                  className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="vin" className="block text-sm font-medium text-blue-200">
                  VIN
                </label>
                <input
                  type="text"
                  id="vin"
                  value={newVehicle.vin}
                  onChange={(e) => setNewVehicle({ ...newVehicle, vin: e.target.value })}
                  className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-blue-200">
                  Status
                </label>
                <select
                  id="status"
                  value={newVehicle.status}
                  onChange={(e) => setNewVehicle({ ...newVehicle, status: e.target.value })}
                  className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label htmlFor="vehicleType" className="block text-sm font-medium text-blue-200">
                  Vehicle Type
                </label>
                <select
                  id="vehicleType"
                  value={newVehicle.vehicleType}
                  onChange={(e) => setNewVehicle({ ...newVehicle, vehicleType: e.target.value })}
                  className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Type</option>
                  {vehicleTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
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
                  {loading ? 'Adding...' : 'Add Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleDashboard;