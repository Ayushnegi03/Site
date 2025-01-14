
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
export const fetchAndUpdateUser = async ({id, name, email, contact, address  }) => {
    try {
      console.log('0-0-0-',id);
      
      const response= await apiConnect.put(`auth/profile/${id}`, {
         name, email, contact, address ,// Pass query params to API
      });
      //console.log('data shown',response);
      dispatch(UPDATE_USER(response.data));
      notification.success({
        message: 'Successfully updated',
        description: 'Data updated successfully',
      });
      // Save the updated user data to localStorage
    } catch (error) {
      console.error('error',error);
      const errorMessage = error.response?.data?.message || 'Not fetching the data';
     
      notification.error({
        message: 'Your Signup Failed please try again',
        description: errorMessage,
      });
    }
  }
// export const addonData=async()=>{

// }
