/* eslint-disable react-hooks/rules-of-hooks */

import { notification } from 'antd';
import apiConnect from '../../Services/apiConnect';
import { setCartItems, addToCart, removeFromCart, decreaseItemCart ,cartQuantity} from './cartSlice';
import eventEmitter from '../../Utils/handlingEvents';

// Add product to cart
export const addCart = ({ userId, productId, quantity }) => async (dispatch) => {
  try {
    const response = await apiConnect.post(`/cart/add`, {
      userId,
      productId,
      quantity
    });
        dispatch(addToCart({response}));
  
    eventEmitter.emit('IncreaseProductTocart');
  } catch (error) {
    console.error('Error adding product to cart:', error);
    notification.error({
      message: 'Add to Cart Failed',
      description: error.message || 'Something went wrong.',
    });
  }
};

// Get user cart
export const getCart = (userId) => async (dispatch) => {

  try {
    const response = await apiConnect.get(`/cart/${userId}`); // Dynamically insert userId
    // notification.success({
    //   message: 'Cart Loaded',
    //   description: 'Your cart has been successfully loaded.',
    // });
   
    dispatch(setCartItems( response?.data?.cartItems));
    dispatch(cartQuantity(response?.data?.cartItems?.length))

  } catch (error) {
    console.error('Error fetching cart:', error);
    notification.error({
      message: 'Fetching Cart Failed',
      description: error.message || 'Something went wrong.',
    });
  }
};

 
export const updateCart = ({ userId, productId, quantity }) => async (dispatch) => {
  try {
    const response = await apiConnect.put(`/cart/update`, {
      userId,
      productId,
      quantity,
    });
    
    eventEmitter.emit('IncreaseProductTocart');
  } catch (error) {
    console.error('Error updating cart:', error);
    notification.error({
      message: 'Update Cart Failed',
      description: error.message || 'Something went wrong.',
    });
  }
};


export const removeCart = ({ userId, productId }) => async (dispatch) => {
  console.log('once',productId)
  try {
    
    const response = await apiConnect.delete(`/cart/remove`,{data: { userId, productId:productId?._id }, });
    
    dispatch(removeFromCart({productId} )); // Pass correct payload
    notification.success({
      message: 'Cart Updated',
      description: 'Product successfully removed from cart.',
    });
    eventEmitter.emit('RemoveProductTocart');
  } catch (error) {
    console.error('Error removing product from cart:', error);
    notification.error({
      message: 'Remove from Cart Failed',
      description: error.message || 'Something went wrong.',
    });
  }
};
