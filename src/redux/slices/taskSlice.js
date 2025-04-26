import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (params, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/api/maintenance/tasks', {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch tasks');
  }
});

export const fetchTaskTemplates = createAsyncThunk('tasks/fetchTaskTemplates', async (vehicleId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:5000/api/vehicles/${vehicleId}/task-templates`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { vehicleId, templates: response.data };
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch task templates');
  }
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    taskTemplates: {}, // { vehicleId: [templates] }
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTaskTemplates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.taskTemplates[action.payload.vehicleId] = action.payload.templates;
      })
      .addCase(fetchTaskTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;