import {configureStore} from "@reduxjs/toolkit";
import productsReducer from './cart/productSlice';
import cartReducer from './cart/cartSlice';
import authReducer from './auth/authSlice';
import personReucer from './person/personSlice'
 
export const store = configureStore({
    reducer:
    {
        products:productsReducer,
        cart:cartReducer,
        auth:authReducer,
        person:personReucer,
    }
}
)