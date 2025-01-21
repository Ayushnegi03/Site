import {configureStore} from "@reduxjs/toolkit";
import productsReducer from './products/productSlice';
import cartReducer from './cart/cartSlice';
import authReducer from './auth/authSlice';
 
 
export const store = configureStore({
    reducer:
    {
        products:productsReducer,
        cart:cartReducer,
        auth:authReducer,
        
    }
}
)