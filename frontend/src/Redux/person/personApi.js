
// personApi.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch user data
// export const fetchingData = createAsyncThunk(
//   'person/fetchUser',
//   async (userId, thunkAPI) => {
//     try {
//       const response = await axios.get(`/person/${userId}`);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || 'Failed to fetch profile data'
//       );
//     }
//   }
// );

// Update user data
export const UpdateData = createAsyncThunk(
  'person/updateUser',
  async ({ id, updates }, thunkAPI) => {
    try {
      const response = await axios.put(`/person/${id}`, updates);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to update profile'
      );
    }
  }
);
