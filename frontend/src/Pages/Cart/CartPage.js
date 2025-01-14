import React, { useEffect, useMemo } from "react";
import { notification } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {getCart,updateCart,removeCart,} from "../../Redux/cart/cartAPI";
import { Box, Typography, Button } from "@mui/material";
//const EventEmitter = require('events');
import eventEmitter from "../../Utils/handlingEvents";
//let eventEmitter = new EventEmitter();


const CartPage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const cartItems = useSelector((state) => state.cart.items);
  //console.log('cartItem',cartItems)
  const users = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  // Fetch cart items from the backend when the component mounts
  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.productId.price * item.quantity, 0),
    [cartItems]
  );

  const fetchCartItems = () => {
    if (!isAuthenticated) return;
    try {
      // eventEmitter.emit("getCart", { userId: users.id });
      dispatch(getCart(users.id));
    } catch (error) {
      console.error("Error fetching cart items:", error);
      notification.error({
        message: "Error",
        description: "Failed to fetch cart items.",
      });
    }
  };

  const handleAddToCart = async (item) => {
    if (!isAuthenticated) {
      notification.error({
        message: "Login Required",
        description: "Please log in to add products to your cart.",
      });
      return;
    }
    try {
      const existingItem = cartItems.find(
        (cartItem) => cartItem.productId._id === item.productId._id
      );         
    // eventEmitter.emit('addCart', item);
    if (existingItem) {
      // Update the quantity immutably
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      dispatch(updateCart(updatedItem)); // Ensure this updates the state properly
      
    } else {
      // Add new item with quantity 1
      const newItem = { ...item, quantity: 1 };
      dispatch(updateCart(newItem));
     
    }

    } catch (error) {
      console.error("Error adding item to cart:", error);
      notification.error({
        message: "Error",
        description: "Failed to add item to the cart.",
      });
    }
  };

  useEffect(() => {
    fetchCartItems();
    //handleAddToCart();
  }, [users?.id, isAuthenticated, dispatch]);


  useEffect(() => {
    eventEmitter.on('IncreaseProductTocart', fetchCartItems);
    eventEmitter.on('RemoveProductTocart', fetchCartItems);
    return () => {
        // Cleanup the listener when the component unmounts
        eventEmitter.removeListener('IncreaseProductTocart', fetchCartItems);
        eventEmitter.removeListener('RemoveProductTocart', fetchCartItems);
    };
}, []);

  const handleDecreaseItemCart = async (item) => {
    try {
      const existingItem = cartItems.find(
        (cartItem) => cartItem.productId._id === item.productId._id
      );
     // eventEmitter.emit('decreaseCart', item);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          // Decrease the item quantity
          const updatedItem = {
            ...existingItem,
            quantity: existingItem.quantity - 1,
          };
          dispatch(updateCart(updatedItem)); // Ensure this updates Redux state
          //console.log("Decreased item quantity:", updatedItem);
        } else {
          // Remove the item if quantity reaches 0 or less
          handleRemoveFromCart(existingItem);
          //console.log("Removed item from cart:", existingItem);
        }
      } else {
        console.warn("Item not found in the cart:", item);
      }
    } catch (error) {
      console.error("Error decreasing item quantity:", error);
      notification.error({
        message: "Error",
        description: "Failed to update item quantity.",
      });
    }
  };

  const handleRemoveFromCart = async (item) => {
    try {
      dispatch(removeCart(item));
      //eventEmitter.emit('removeCart', item);
    } catch (error) {
      console.error("Error removing item from cart:", error);
      notification.error({
        message: "Error",
        description: "Failed to remove item from the cart.",
      });
    }
  };
  

  return (
  
    <Box
      sx={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#EDEADE",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">No items in the cart.</Typography>
      ) : (
        <>
          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            {cartItems.map((item) => (
              
              <li key={item._id} style={{ marginBottom: "20px" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "10px",
                    backgroundColor: "#fff",
                  }}
                >
                  <Box
                    component="img"
                    src={item.productId.imageUrl || "fallback-image-url.jpg"}
                    alt={item.productId.name}
                    sx={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                  {/* <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#555' }}>
                      ₹{item.price.toFixed(2)} x {item.quantity} = ₹{(item.price.toFixed(2) * item.quantity)}
                    
                    </Typography>
                  </Box> */}
            
                 
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {item.productId.name || "Unnamed Item"}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#555" }}>
                      ₹{item.productId.price ? item.productId.price.toFixed(2) : "0.00"} x{" "}
                      {item.quantity || 0} = ₹
                      {item.productId.price && item.quantity
                        ? (item.productId.price * item.quantity).toFixed(2)
                        : "0.00"}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDecreaseItemCart(item)}
                    sx={{ fontWeight: "bold" }}
                    aria-label="Decrease quantity"
                  >
                    -
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleRemoveFromCart(item)}
                    sx={{ fontWeight: "bold" }}
                    aria-label="Remove item"
                  >
                    Remove
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddToCart(item)}
                    sx={{ fontWeight: "bold" }}
                    aria-label="Increase quantity"
                  >
                    +
                  </Button>
                </Box>
              </li>
            ))}
          </ul>
          <hr />
          <Typography variant="h6" sx={{ marginTop: "20px" }}>
            Total: ₹{total.toFixed(2)}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default CartPage;
