import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './redux/store.js';
import LoginPage from './views/LoginPage';
import RegistrationPage from './views/RegistrationPage';
import Dashboard from './views/Dashboard';
import VehicleDashboard from './views/VehicleDashboard.jsx';
import MaintenanceCalendar from './views/MaintenanceCalendar.jsx';
import ReportsDashboard from './views/ReportsDashboard.jsx';
import SettingsPage from './views/SettingsPage.jsx';
import VehicleDetailPage from './views/VehicleDetailPage.jsx';
import MaintenanceTaskDetailPage from './views/MaintenanceTaskDetailPage.jsx';
import DriverList from './views/DriverList.jsx';
import DriverDetailPage from './views/DriverDetailPage.jsx';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vehicledashboard" element={<VehicleDashboard />} />
          <Route path="/mintenancecalendar" element={<MaintenanceCalendar />} />
          <Route path="/reportsdashboard" element={<ReportsDashboard />} />
          <Route path="/setting" element={<SettingsPage />} />
          <Route path="/vehicledetail" element={<VehicleDetailPage />} />
          <Route path="/maintenancetaskdetail" element={<MaintenanceTaskDetailPage />} />
          <Route path="/driverlist" element={<DriverList />} />
          <Route path="/driverdetail" element={<DriverDetailPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  );
}

export default App;