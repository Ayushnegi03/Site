


import { createSlice } from '@reduxjs/toolkit';
import apiConnect from '../../Services/apiConnect';
import eventEmitter from '../../Utils/handlingEvents';

// Initial state
const initialState = {
    items: [],
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
};

// Product slice
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
       
        fetchProductsSuccess(state, action) {
            state.items = action.payload; // Update the state with fetched products
            console.log('=-=-',state.items)
        },
       
        addProductSuccess(state, action) {
            state.items.push(action.payload); // Add the new product to the state
        },
        updateProductSuccess(state, action) {
            const index = state.items.findIndex(
                (item) => item.id === action.payload.id || item._id === action.payload._id
              );
            
              if (index !== -1) {
                state.items[index] = { ...state.items[index], ...action.payload }; // Update the product
              }
            },
        deleteProduct(state, action) {
            const productIdToDelete = action.payload; // This should be the product's id
            state.items = state.items.filter((item) => item.id !== productIdToDelete);
          },
    },
});

export const {
    
    fetchProductsSuccess,
    addProductSuccess,
    updateProductSuccess,
    deleteProduct,
} = productSlice.actions;

// Thunk-like async functions (to be called manually)
export const fetchProducts = () => async (dispatch) => {
    
    //dispatch(fetchProductsStart);
    try {
        const response = await apiConnect.get(`/product/items`); // Replace with your backend endpoint
        eventEmitter.emit('ShownAllData');
        dispatch(fetchProductsSuccess(response.data));
    } catch (error) {
       // dispatch(fetchProductsFailure(error.message));
       console.error('Failed to load product:', error);
    }
};
export const fetchLimitProducts = (page,limit) => async (dispatch) => {
    //dispatch(fetchProductsStart);
    try {
        const response = await apiConnect.get(`/product/items`,{params:{page,limit},}); // Replace with your backend endpoint
        console.log('response=---->',response)
        eventEmitter.emit('ShownAllData');
        dispatch(fetchProductsSuccess(response.data));
    } catch (error) {
       // dispatch(fetchProductsFailure(error.message));
       console.error('Failed to load product:', error);
    }
};

export const addProduct = (newProduct) => async (dispatch) => {
    try {
        const response = await apiConnect.post(`/product/items`, newProduct); // Replace with your backend endpoint
        eventEmitter.emit('AddData');
        console.log('reponse0',response.data)
        dispatch(addProductSuccess(response.data));
    } catch (error) {
        console.error('Failed to add product:', error);
    }
};

export const updateProduct = (productId, updatedProducting) => async (dispatch) => {
    console.log('once1')
    try {
        
        const response = await apiConnect.put(`/product/items/${productId}`, updatedProducting); // Replace with your backend endpoint
        
       
        eventEmitter.emit('UpdateData');
        dispatch(updateProductSuccess(response.data));
    } catch (error) {
        console.error('Failed to update product:', error);
    }
};

export const deleteToProduct =(productId)=>async (dispatch)=>{
    try{
        const response = await apiConnect.delete(`/product/items/${productId}`)
        eventEmitter.emit('DeleteData');
        console.log('response',response.data);
        //console.log('response',response.data);
        dispatch(deleteProduct(response));
    }
    catch(err)
     {
        console.error('Failed to delete the data ',err)
     }    
}

export default productSlice.reducer;
