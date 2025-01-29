import React, { useEffect, useMemo, useState } from "react";
import { notification } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {getCart,updateCart,removeCart,} from "../../Redux/cart/cartAPI";
import { Box, Typography, Button } from "@mui/material";

import eventEmitter from "../../Utils/handlingEvents";
const CartPage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const cartItems = useSelector((state) => state.cart.items);
  
  const users = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
 
  const [loadings,setLoadings] = useState(false);
  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = item?.productId?.price || 0; 
      const quantity = item?.quantity || 0;     
      return sum + price * quantity;
    }, 0);
  }, [cartItems]);

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
      setLoadings(true);
      const existingItem = cartItems.find(
        (cartItem) => cartItem?.productId?._id === item?.productId?._id
      );         
    
    if (existingItem) {
     
      const updatedItem = {
        ...existingItem,
        quantity: existingItem?.quantity + 1,
      };
      dispatch(updateCart(updatedItem)); 
      
    } 
   
    } catch (error) {
      console.error("Error adding item to cart:", error);
      notification.error({
        message: "Error",
        description: "Failed to add item to the cart.",
      });
    }
    setLoadings(false);
  };

  useEffect(() => {
    fetchCartItems();
    
  }, [users?.id, isAuthenticated, dispatch]);


  useEffect(() => {
    eventEmitter.on('IncreaseProductTocart', fetchCartItems);
    eventEmitter.on('RemoveProductTocart', fetchCartItems);
    return () => {
        
        eventEmitter.removeListener('IncreaseProductTocart', fetchCartItems);
        eventEmitter.removeListener('RemoveProductTocart', fetchCartItems);
    };
}, [fetchCartItems]);

  const handleDecreaseItemCart = async (item) => {
    try {
      setLoadings(true);
      const existingItem = cartItems.find(
        (cartItem) => cartItem?.productId?._id === item?.productId?._id
      );
 
      if (existingItem) {
        if (existingItem.quantity > 1) {
         
          const updatedItem = {
            ...existingItem,
            quantity: existingItem.quantity - 1,
          };
          dispatch(updateCart(updatedItem)); 
        } else {
         
          handleRemoveFromCart(existingItem);
          
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
    setLoadings(false);
  };

  const handleRemoveFromCart = async (item) => {
    try {
      dispatch(removeCart(item));
   
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
      // maxWidth: "700px",
      margin: "auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      backgroundColor: "#FAF9F6",
      textAlign: "center",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    }}
  >
    <Typography
      variant="h4"
      sx={{ marginBottom: "20px", fontWeight: "bold", color: "#333" }}
    >
      Cart
    </Typography>
    {cartItems.length === 0 ? (
      <Typography variant="body1">No items in the cart.</Typography>
    ) : (
      <>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0,display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'20px' }}>
          {cartItems.map((item) => (
            <li key={item?._id} style={{ marginBottom: "20px" }}>
              <Box
                sx={{
                  // display: "flex",
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
                  src={item?.productId?.imageUrl || "fallback-image-url.jpg"}
                  alt={item?.productId?.name}
                  sx={{
                    width: "80px",
                    height: "80px",
                    objectFit: "",
                    borderRadius: "4px",
                  }}
                />
                <Box sx={{ flex: 1, textAlign: "center" }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", fontSize: "1.1rem", color: "#333" }}
                  >
                    {item?.productId?.name || "Unnamed Item"}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    ₹{item?.productId?.price?.toFixed(2) || "0.00"} x{" "}
                    {item?.quantity || 0} = ₹
                    {(item?.productId?.price * item?.quantity)?.toFixed(2) || "0.00"}
                  </Typography>
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
    onClick={() => handleDecreaseItemCart(item)}
    sx={{
      fontWeight: "bold",
      color: "#fff",
      background: "#36454F",
      boxShadow: "0 4px 8px rgba(255, 138, 0, 0.4)",
      "&:hover": {
        background: "#0096FF",
        boxShadow: "0 6px 12px rgba(255, 87, 34, 0.5)",
      },
      padding: "10px 20px",
      borderRadius: "50px",
      minWidth: "50px",
    }}
  >
    -
  </Button>
  <Button
    onClick={() => handleRemoveFromCart(item)}
    sx={{
      fontWeight: "bold",
      color: "#D32F2F",
      backgroundColor: "#FFFFFF",
      border: "2px solid #E57373",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      "&:hover": {
        backgroundColor: "#FFEBEE",
        borderColor: "#C62828",
        boxShadow: "0 4px 8px rgba(244, 67, 54, 0.3)",
      },
      padding: "10px 20px",
      borderRadius: "12px",
    }}
  >
    Remove
  </Button>
  <Button
    onClick={() => handleAddToCart(item)}
    sx={{
      fontWeight: "bold",
      color: "#fff",
      background: "#36454F",
      boxShadow: "0 4px 8px rgba(109, 242, 244, 0.4)",
      "&:hover": {
        background: "#0096FF",
        boxShadow: "0 6px 12px rgba(76, 175, 80, 0.5)",
      },
      padding: "10px 20px",
      borderRadius: "50px",
      minWidth: "50px",
    }}
  >
    +
  </Button>
</Box>

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
