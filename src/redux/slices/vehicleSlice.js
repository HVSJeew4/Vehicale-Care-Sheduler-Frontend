import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchVehicles = createAsyncThunk('vehicles/fetchVehicles', async (params, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/api/vehicles', {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch vehicles');
  }
});

export const fetchVehicleTypes = createAsyncThunk('vehicles/fetchVehicleTypes', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/api/vehicle-types', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // e.g., ["Car", "Bicycle", "Truck"]
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch vehicle types');
  }
});

const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState: {
    vehicles: [],
    vehicleTypes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchVehicleTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicleTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicleTypes = action.payload;
      })
      .addCase(fetchVehicleTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default vehicleSlice.reducer;