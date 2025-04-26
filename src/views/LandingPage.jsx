import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-inter flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-2xl animate-fade-in">
        <h1 className="text-5xl font-bold text-blue-300 mb-6">Vehicle Care Scheduler</h1>
        <p className="text-xl text-gray-300 mb-8">
          Streamline your fleet management with our intuitive vehicle maintenance system. Schedule tasks, track vehicles, and generate reports effortlessly.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-lg"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-gray-700 text-gray-100 py-3 px-8 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-lg"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;