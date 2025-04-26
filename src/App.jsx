
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
import LandingPage from './views/LandingPage.jsx';
import NewDriver from './views/NewDriver.jsx';
import VehicleEditPage from './views/VehicleEditPage.jsx';
import UserManagement from './views/UserManagement.jsx';
import RolePermissions from './views/RolePermissions.jsx';
import ResetPasswords from './views/ResetPasswords.jsx';
import ReportIssue from './views/ReportIssue.jsx';
import MainLayout from './views/MainLayout.jsx';
import MaintenanceDashboard from './views/MaintenanceDashboard';


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  console.log('ProtectedRoute: Token present:', !!token); // Debug
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/vehicles" element={<VehicleDashboard />} />
          <Route path="/maintenance" element={<MaintenanceDashboard />} />
          <Route path="/maintenance/tasks/:taskId" element={<MaintenanceTaskDetailPage />} />
          <Route
            path="/dashboard/:role"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/vehicles"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <VehicleDashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/vehicles/:vehicleId"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <VehicleDetailPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/vehicles/edit/:vehicleId"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <VehicleEditPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/maintenance"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <MaintenanceCalendar />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/maintenance/tasks/:taskId"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <MaintenanceTaskDetailPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ReportsDashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <SettingsPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/drivers"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <DriverList />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/drivers/:driverId"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <DriverDetailPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/drivers/new"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <NewDriver />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <UserManagement />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/roles"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <RolePermissions />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/reset-passwords"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ResetPasswords />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/report-issue"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ReportIssue />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  );
}

export default App;