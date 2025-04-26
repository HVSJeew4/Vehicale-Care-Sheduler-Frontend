import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import vehicleReducer from './slices/vehicleSlice';
import taskReducer from './slices/taskSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    vehicles: vehicleReducer,
    tasks: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values in actions (e.g., dates in tasks)
        ignoredActions: ['tasks/setTasks'],
        ignoredPaths: ['tasks.tasks'],
      },
    }),
});