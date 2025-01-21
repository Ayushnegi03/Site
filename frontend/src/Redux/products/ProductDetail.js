import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { notification } from 'antd';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { fetchProducts } from './productSlice';
import { addCart } from '../cart/cartAPI';
import { debounce } from 'lodash';

const EventEmitter = require('events');
let eventEmitter = new EventEmitter();

const ProductDetail = () => {
  const { id } = useParams();
  
  const products = useSelector((state) => state.products.items || []); 
  const cartItems = useSelector((state) => state.cart.items || []); 
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const users = useSelector((state) => state.auth.user);
  const status = useSelector((state) => state.products.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const product = products.find((item) => item._id === id);
  

  const productInCartQuantity = cartItems.reduce((total, item) => {
    if (item?._id === product?._id) {
      return total + (item.quantity || 0); 
    }
    return total; 
  }, 0);
  
 
  

  const availableStock = product?.quantity ? product.quantity - productInCartQuantity : 0;
 
  useEffect(() => {
    if (!product && status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [product, status, dispatch]);
 
  useEffect(() => {
    const handleIncrease = debounce(() => {
      dispatch(fetchProducts());
    }, 300); // Wait 300ms between calls
  
    eventEmitter.on('AddData', handleIncrease);
  
    return () => {
      eventEmitter.off('AddData', handleIncrease);
      handleIncrease.cancel(); // Cancel debounced calls
    };
  }, [dispatch]);

  const handleAddToCart = async () => {
    if (isAuthenticated) {
      
      if (availableStock > 0) {
        try {
        
          dispatch(addCart({
            userId: users.id,
            productId: product._id,
            quantity:1}));
  
          notification.success({
            message: 'Added to Cart',
            description: `${product.name} has been added to your cart!`,
          });
        } catch (error) {
          console.error('Error adding to cart:', error);
          notification.error({
            message: 'Error',
            description: 'Failed to add the product to the cart.',
          });
        }
      } else {
        notification.error({
          message: 'Out of Stock',
          description: `${product.name} is currently out of stock.`,
        });
      }
    } else {
      notification.error({
        message: 'Login Required',
        description: 'Please log in to add products to your cart.',
      });
      navigate('/signin');
    }
  };
  const clicking = cartItems.find((cartItem) => cartItem?.productId?._id === product?._id);
  console.log('clicking',clicking);
  

  if (status === 'loading') {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ color: '#888' }}>
          Loading product details...
        </Typography>
      </Box>
    );
  }

  if (!product) {
    return (
      <Typography variant="h6" sx={{ textAlign: 'center', marginTop: '20px', color: '#888' }}>
        Product not found. Please try again later.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        padding: '12px',
        maxWidth: '420px',
        margin: '15px auto',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f2f3f4',
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
        {product.name}
      </Typography>
      <img
        src={product.imageUrl || '/placeholder.jpg'}
        alt={product.name || 'Product Image'}
        style={{
          width: '100%',
          maxHeight: '300px',
          objectFit: 'contain',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      />
      <Typography variant="body1" sx={{ color: '#555', marginBottom: '20px', fontStyle: 'italic' }}>
        {product.description || 'No description available for this product.'}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px' ,textAlign:"center"}}>
        Price: ₹{product.price.toFixed(2)}
        <Box component="span" sx={{ marginLeft: '5px', fontWeight: 'normal' }}>
          
        </Box>
      </Typography>
      <Button
        onClick={clicking ? () =>  navigate('/cart') : handleAddToCart}
        variant="contained"
        disabled={availableStock <= 0}
        sx={{
          width: '100%',
          fontWeight: 'bold',
          padding: '10px',
          backgroundColor: availableStock > 0 ? '#3a3d3b' : '#ccc',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: availableStock > 0 ? '#0056cc' : '#ccc',
          },
        }}
      >
        {clicking
    ? 'Go to Cart'
    : 'Add to Cart'}
      </Button>
    </Box>
  );
};

export default ProductDetail;
