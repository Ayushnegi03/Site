// Utils/authUtils.js

// Function to remove token from localStorage or any storage mechanism
// export const removeToken = () => {
//     try {
//       // Remove the token from localStorage
//       localStorage.removeItem('token');
//       localStorage.removeItem('user'); // Optional: remove user details if stored
  
//       console.log('Token and user data removed successfully');
//     } catch (error) {
//       console.error('Error removing token:', error);
//     }
//   };
 
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAndUpdateUser= createAsyncThunk(
  'auth/fetchAndUpdateUser',
  async ({ name, email, phone, address }, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:8000/update-user', {
        params: { name, email, phone, address },
      });
      const updatedUser = response.data.userData;

      // Save updated user to localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));

      return updatedUser;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to update user data'
      );
    }
  }
);
