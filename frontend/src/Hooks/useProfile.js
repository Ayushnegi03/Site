// import { useSelector ,useDispatch} from 'react-redux';
// import { setUser } from '../Redux/person/personSlice';


// export const useProfile = () => {
//   const { user } = useSelector((state) => state.person);
//   const dispatch = useDispatch(); // Use dispatch from react-redux

//   const updateProfile = async (updates) => {
//     try {
//       // Dispatch the action using useDispatch
//       dispatch(setUser({ data: updates }));
//       return { success: true, message: 'Profile updated successfully!' };
//     } catch (err) {
//       return { success: false, message: 'Failed to update profile.' };
//     }
//   };

//   return { user, updateProfile };
// };



import { useSelector, useDispatch } from 'react-redux';
import { UpdateData } from '../Redux/person/personSlice';

export const useProfile = () => {
  const { user, status, error } = useSelector((state) => state.person);
  const dispatch = useDispatch();

  const updateProfile = async (updates) => {
    try {
      if (!user || !user.id) {
        throw new Error('User not found or ID missing');
      }

      // Dispatch the UpdateData async thunk
      const resultAction = await dispatch(UpdateData({ id: user.id, updates }));
       console.log(resultAction) 
      if (UpdateData.fulfilled.match(resultAction)) {
        return { success: true, message: 'Profile updated successfully!' };
      } else {
        throw new Error(resultAction.payload || 'Failed to update profile.');
      }
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  return { user, updateProfile, status, error };
};



// import { useSelector, useDispatch } from 'react-redux';
// import { UPDATE_DATA } from '../Redux/person/personSlice'; // Redux action to update profile
// import { removeToken } from '../Utils/authUtils.js'; // Utility to remove token from localStorage

// export const UserProfile = () => {
//   const { user } = useSelector((state) => state.person); // Select user data from Redux state
//   const dispatch = useDispatch();

//   const updateProfile = async (updates) => {
//     try {
//       // Update profile through Redux action
//       dispatch(UPDATE_DATA({ data: updates }));

//       // Save updated user data in localStorage (if required)
//       localStorage.setItem('user', JSON.stringify(updates));

//       return { success: true, message: 'Profile updated successfully!' };
//     } catch (err) {
//       console.error(err);
//       return { success: false, message: 'Failed to update profile.' };
//     }
//   };

//   const logout = () => {
//     // Clear token and user from localStorage
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');

//     // Perform any Redux cleanup (optional)
//     removeToken(); // Example utility to handle token removal globally
//   };

//   return { user, updateProfile, logout };
// };




/*

import { useSelector, useDispatch } from 'react-redux';
import { UpdateingData, LOGOUT } from '../Redux/person/personSlice';
import axios from 'axios';

export const useProfile = () => {
  const { user, token } = useSelector((state) => state.person); // Access user and token from Redux
  const dispatch = useDispatch();

  // Update profile with token-based API request
  const updateProfile = async (updates) => {
    try {
      const response = await axios.put(
        '/api/profile', // Replace with your API endpoint
        updates,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request header
          },
        }
      );

      // Dispatch the updated user data to Redux
      dispatch(UpdateingData({ data: response.data }));

      return { success: true, message: 'Profile updated successfully!' };
    } catch (error) {
      console.error('Error updating profile:', error.response?.data || error.message);
      return { success: false, message: 'Failed to update profile. Please try again.' };
    }
  };

  // Logout function to clear user and token
  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    dispatch(LOGOUT()); // Clear Redux state
  };

  return { user, token, updateProfile, logout };
};

*/