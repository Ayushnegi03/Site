
import { notification } from 'antd'
import apiConnect from '../apiConnect';
import { UPDATE_USER } from '../../Redux/auth/authSlice';
import { useDispatch } from 'react-redux';
const dispatch= useDispatch;
export const signIn = async(userData) => {
  //console.log(userData)
    try {
      return await apiConnect.post(`auth/login`, userData);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Sign-in failed';
      notification.error({
        message: 'Your Login Failed please try again',
        description: errorMessage,
      });
    }
  }; 
  // Thunk for Sign Up
export  const signUp = async(userData) =>  {
    try {

      return await apiConnect.post(`auth/signup`, userData); 
      //  if (role === 'admin'){
      //   const existingUser = await UserActivation.findOne({role:1});
      //  }

    } catch (error) {
        console.log(error)
      const errorMessage = error.response?.data?.message || 'Sign-up failed';
     
      notification.error({
        message: 'Your Signup Failed please try again',
        description: errorMessage,
      });
    }
  };
  // Fetch and Update User Thunk



export const fetchAndUpdateUser = async ({ id, name, email, contact, address }) => {
  try {
    console.log('Updating user with ID:', { id});

    // API request
    const response = await apiConnect.put(`auth/profile/${id}`, {
      name,
      email,
      contact,
      address,
    });

    // Success notification
    notification.success({
      message: 'Successfully Updated',
      description: 'Your profile has been updated successfully.',
    });

    return response.data; // Return the updated user data
  } catch (error) {
    console.error('Error updating user:', {
      message: error.message,
      response: error.response,
    });

    const errorMessage = error.response?.data?.message || 'An error occurred while updating your profile.';

    notification.error({
      message: 'Profile Update Failed',
      description: errorMessage,
    });

    throw error; // Rethrow the error for further handling
  }
};