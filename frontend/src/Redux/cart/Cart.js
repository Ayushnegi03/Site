/*

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, decreaseItemCart,addToCart } from './cartSlice';
import { Box, Button, Typography, List, ListItem, Divider } from '@mui/material';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    
    <Box
      sx={{
        backgroundColor: '#1ed0d0',
        color: 'white',
        minHeight: '100vh',
        padding: '20px',
        textAlign: 'center',
        borderRadius: '8px',
        border: '2px-solid-#36454F'
      }}
    >
      <Box sx={{ width: '80%', margin: '0 auto', backgroundColor: '#e5e8e8', padding: '20px', borderRadius: '8px', color: '#333' }}>
        <Typography variant="h4" sx={{ marginBottom: '20px' }}>
          Cart
        </Typography>

        {cartItems.length === 0 ? (
          <Typography variant="body1">No items in the cart.</Typography>
        ) : (
          <>
            <List>
              {cartItems.map((item) => (
                <ListItem key={item.id} sx={{ marginBottom: '10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Typography>
                    <strong>{item.name}</strong> - ₹{item.price.toFixed(2)} x {item.quantity} = ₹
                    {(item.price * item.quantity).toFixed(2)}
                  </Typography>
                  <Box sx={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                    <Button
                      // variant="contained"
                      size="small"
                      color="secondary"
                      onClick={() => dispatch(decreaseItemCart(item))}
                    >
                      Decrease
                    </Button>
                    <Button
                      // variant="contained"
                      size="small"
                      color="error"
                      onClick={() => dispatch(removeFromCart(item))}
                    >
                      Remove
                    </Button>
                    <Button
                      // variant="contained"
                      size="small"
                      color="primary"
                      onClick={() => dispatch(addToCart(item))}
                      sx={{ '&:hover': { backgroundColor: '#1976d2' } }}
                    >
                      Increase
                    </Button>
                  </Box>
                  <Divider sx={{ marginTop: '10px', width: '100%' }} />
                </ListItem>
              ))}
            </List>

            <Typography variant="h5" sx={{ marginTop: '20px' }}>
              Total: ₹{total.toFixed(2)}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Cart;



*/