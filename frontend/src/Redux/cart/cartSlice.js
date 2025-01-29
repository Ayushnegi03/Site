
import {createSlice} from '@reduxjs/toolkit';
 


const cartSlice = createSlice({
    name:'cart',
    initialState:{
        items:[ 
            
        ],
    },
    reducers:{
        setCartItems: (state, action) => {
            state.items = action.payload;
          },
          cartQuantity:(state,action)=>{
            state.cartCount=action.payload
            
          },
        addToCart:(state,action)=>{
            const product = action.payload?.response?.data?.cartItem;

            // Ensure product exists
            if (!product || !product._id) {
              console.error("Invalid product in addToCart:", action.payload);
              return;
            }
      
            // Check for existing product in the cart
            const existingItem = state.items.find((item) => item._id === product._id);
      
            if (existingItem) {
              // Update the quantity of the existing item
              existingItem.quantity += 1;
            } else {
              // Add the new product with an initial quantity
              state.items.push({ ...product, quantity: 1 });
            }
        },
        
          
        removeFromCart:(state,action)=>{
            state.items=state.items.filter((item)=>item._id !== action.payload._id)
        },
        decreaseItemCart:(state,action)=>{
            const product=action.payload;
            const existingItem=state.items.find((item)=>item._id===product._id)
            if (existingItem){
                if(!existingItem.quantity===0 || existingItem.quantity>1){
                existingItem.quantity-=1;
                }
                else
                {
                    state.items=state.items.filter((item)=>item._id !== action.payload._id)
                }
            }
            else{
                state.items.push({...product,quantity:1})
            }   
        },
        clearCart:(state)=>{
            state.items=[];
        },
    },
});
export const {setCartItems,addToCart,removeFromCart, decreaseItemCart,clearCart,cartQuantity}=cartSlice.actions;


  export default cartSlice.reducer;


