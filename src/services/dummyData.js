// src/services/dummyData.js
// Mock data to simulate backend API responses for testing
export const dummyVehicles = [
  {
    vehicleId: '1',
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    vin: '4T1BF1FK0LU123456',
    vehicleType: 'Car',
    currentStatus: 'Active',
    assignedDriver: { id: '1', name: 'John Doe' },
  },
  {
    vehicleId: '2',
    make: 'Trek',
    model: 'Marlin 5',
    year: 2022,
    vin: 'WTU123456789',
    vehicleType: 'Bicycle',
    currentStatus: 'Maintenance',
    assignedDriver: null,
  },
];

export const dummyTasks = [
  {
    taskId: '1',
    vehicleId: '1',
    templateId: 't1',
    taskName: 'Oil Change',
    scheduledDate: '2025-05-01T10:00:00Z',
    status: 'Pending',
    assignedTo: { id: '1', name: 'John Doe' },
    notes: 'Check oil filter.',
  },
  {
    taskId: '2',
    vehicleId: '2',
    templateId: 't2',
    taskName: 'Chain Lubrication',
    scheduledDate: '2025-05-02T14:00:00Z',
    status: 'Completed',
    assignedTo: null,
    notes: '',
  },
];

export const dummyUsers = [
  { userId: '1', name: 'John Doe', role: 'driver' },
  { userId: '2', name: 'Jane Smith', role: 'manager' },
];

export const dummyDrivers = [
  { userId: '1', name: 'John Doe', email: 'john@example.com', status: 'active' },
  { userId: '3', name: 'Mike Johnson', email: 'mike@example.com', status: 'inactive' },
];

export const dummyMaintenanceHistory = [
  {
    logId: '1',
    taskName: 'Oil Change',
    performedOn: '2025-04-01T10:00:00Z',
    status: 'Completed',
  },
];

export const dummyVehicleTypes = ['Car', 'Bicycle', 'Truck'];

export const dummyTaskTemplates = {
  '1': [
    { templateId: 't1', taskName: 'Oil Change', vehicleType: 'Car', interval: '3 months' },
    { templateId: 't3', taskName: 'Tire Rotation', vehicleType: 'Car', interval: '6 months' },
  ],
  '2': [
    { templateId: 't2', taskName: 'Chain Lubrication', vehicleType: 'Bicycle', interval: '1 month' },
  ],
};

export const dummySettings = {
  emailAlerts: true,
  smsAlerts: false,
  alertThresholdDays: 7,
  t1: '3 months',
  t3: '6 months',
  t2: '1 month',
};

// Mock login response
export const dummyLogin = (credentials) => {
  if (credentials.email === 'test@example.com' && credentials.password === 'password123') {
    return { token: 'dummy-token', user: { id: '1', name: 'John Doe', role: 'admin' } };
  }
  throw new Error('Invalid credentials');
};

// Mock registration response
export const dummyRegister = (data) => {
  return { userId: '4', name: data.name, email: data.email, role: data.role };
};
