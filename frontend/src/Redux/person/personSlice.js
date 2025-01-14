
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch profile data
export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState(); // Retrieve token from state
      const response = await axios.get('/profile', {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      return response.data.user; // Return the user profile
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || 'Failed to fetch profile data');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload }; // Update user profile dynamically
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Profile Fetch
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Update the state with fetched user profile
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateProfile, logout } = authSlice.actions;

export default authSlice.reducer;
