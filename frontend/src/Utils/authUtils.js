
 
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchAndUpdateUser= createAsyncThunk(
//   'auth/fetchAndUpdateUser',
//   async ({ name, email, phone, address }, thunkAPI) => {
//     try {
//       const response = await axios.get('http://localhost:8000/update-user', {
//         params: { name, email, phone, address },
//       });
//       const updatedUser = response.data.userData;

//       localStorage.setItem('user', JSON.stringify(updatedUser));

//       return updatedUser;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || 'Failed to update user data'
//       );
//     }
//   }
// );
