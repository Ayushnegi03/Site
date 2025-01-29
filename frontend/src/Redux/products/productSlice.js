


import { createSlice } from '@reduxjs/toolkit';
import apiConnect from '../../Services/apiConnect';
import eventEmitter from '../../Utils/handlingEvents';

 
const initialState = {
    items: [],
    status: 'idle',  
    error: null,
};

 
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
       
        fetchProductsSuccess(state, action) {
            state.items = action.payload; 
        },
       
       
        
    },
});

export const {
    
    fetchProductsSuccess,
   
} = productSlice.actions;


export const fetchProducts = (search="") => async (dispatch) => {
    try {
        const params=!search?{}:{search};
        const response = await apiConnect.get(`/product/items`,{params});  

        dispatch(fetchProductsSuccess(response.data));
    } catch (error) {
       
       console.error('Failed to load product:', error);
    }
};
export const fetchLimitProducts = (page,limit,search= " ") => async (dispatch) => {
    try {
        const params=!search?{page,limit}:{page,limit,search}
        const response = await apiConnect.get(`/product/items/`,{params});  
        dispatch(fetchProductsSuccess(response.data));
    } catch (error) {
      
       console.error('Failed to load product:', error);
    }
};

export const addProduct = async (newProduct) => {
    try {
        const response = await apiConnect.post(`/product/items`, newProduct);  
        eventEmitter.emit('AddData');
        console.log('reponse0',response.data)
      
    } catch (error) {
        console.error('Failed to add product:', error);
    }
};

export const updateProduct = async (productId, updatedProducting) => {
    try {
        
        const response = await apiConnect.put(`/product/items/${productId}`, updatedProducting);  
        
        eventEmitter.emit('UpdateData');
    } catch (error) {
        console.error('Failed to update product:', error);
    }
};

export const deleteToProduct =async (productId)=>{
    try{
        const response = await apiConnect.delete(`/product/items/${productId}/soft-delete`)
        eventEmitter.emit('DeleteData');
        console.log('response',response.data);
        
        
    }
    catch(err)
     {
        console.error('Failed to delete the data ',err)
     }    
}


export default productSlice.reducer;
