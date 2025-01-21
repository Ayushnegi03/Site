import { notification } from 'antd'
import apiConnect from '../apiConnect';
//import { UPDATE_USER } from '../../Redux/auth/authSlice';
import { useDispatch } from 'react-redux';
import { addProductSuccess, fetchProductsSuccess, updateProductSuccess } from '../../Redux/products/productSlice';
const dispatch= useDispatch;
  // Fetch and Update User Thunk
export const fetchAndUpdateItem = async ({id, name, description, price, imageUrl, quantity }) => {
    try {
      console.log('0-0-0-',id);
      
      const response= await apiConnect.post(`product/items`, {
        name, description, price, imageUrl, quantity ,// Pass query params to API
      });
      //console.log('data shown',response);
      dispatch(addProductSuccess(response.data));
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
  export const updateProduct = async({id, updatedProduct}) =>{
    try {
      const response = await apiConnect.put(`/product/items/${id}`, {
        updatedProduct
      });
    // eventEmitter.emit('IncreaseProductTocart');
    dispatch(updateProductSuccess(response.data)); // Update with correct payload
      notification.success({
        message: 'Cart Updated',
        description: 'Product quantity successfully updated.',
      });
    } catch (error) {
      console.error('Error updating cart:', error);
      notification.error({
        message: 'Update Cart Failed',
        description: error.message || 'Something went wrong.',
      });
    }
  };
export const getAll=async()=>{
  try{
    const response=await apiConnect.get(`product/items`)
    dispatch(fetchProductsSuccess(response.data));
  }
  catch(err){
    console.error('error',err);
  }

}
