



import { createSlice} from '@reduxjs/toolkit';
// Utility functions for localStorage
const saveToLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const loadFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key));
const removeFromLocalStorage = (key) => localStorage.removeItem(key);

// Check if token is expired
const isTokenExpired = (token) => {
  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT token (only if token exists)
    const expiryTime = decodedToken.exp * 1000; // Convert to milliseconds
    return expiryTime < Date.now(); // Check if token has expired
  } catch (e) {
    return true; // In case of any error while decoding, treat it as expired
  }
};

// Initial state
const initialState = {
  user: loadFromLocalStorage('user') || null,
  isAuthenticated: !!localStorage.getItem('token') && !isTokenExpired(localStorage.getItem('token')),
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SIGN_IN_SUCCESS: (state, action) => {
      const { user} = action.payload;
      const token = user.token;
      // Save token and user data to localStorage
      // Save to Redux state
      localStorage.setItem('token', token);
      saveToLocalStorage('user', user);
     
      state.user = user;
      state.isAuthenticated = true;
      state.error = null;
    },
    SIGN_UP_SUCCESS: (state, action) => {
      const { user} = action.payload;

      // Save to Redux state
      state.user = user;
      state.isAuthenticated = true;
      state.error = null;
    },

    UPDATE_USER:(state,action)=>{
      
      if (action.payload && typeof action.payload === 'object') {
        const { user } = action.payload;
        // Update user in the Redux state
        state.user = { ...(state.user || {}), ...(user || {}) };        
        console.log('UJPDATE',state.user)
      } else {
        console.error('Invalid payload for UPDATE_USER:', action.payload);
      }
    },

    authFailure: (state, action) => {
      state.error = action.payload;

      // Clear localStorage on failure if needed
      removeFromLocalStorage('token');
      removeFromLocalStorage('user');
    },
    LOGOUT: (state) => {
      // Clear localStorage when logging out
      removeFromLocalStorage('token');
      removeFromLocalStorage('user');

      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { SIGN_IN_SUCCESS, SIGN_UP_SUCCESS,UPDATE_USER, authFailure, LOGOUT } = authSlice.actions;
export default authSlice.reducer;
