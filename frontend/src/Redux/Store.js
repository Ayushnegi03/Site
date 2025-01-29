


import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default: localStorage for web
import { combineReducers } from "redux";
import productsReducer from "./products/productSlice";
import cartReducer from "./cart/cartSlice";
import authReducer from "./auth/authSlice";

// Persist configuration
const persistConfig = {
  key: "root", // Key for local storage
  storage,     // Choose localStorage as the storage engine
  whitelist: ["cart", "auth"], // Only persist these slices
};

// Combine reducers
const rootReducer = combineReducers({
  products: productsReducer, // Products won't be persisted
  cart: cartReducer,
  auth: authReducer,
});

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable warnings for non-serializable actions
    }),
});

// Persistor for managing persisted state
export const persistor = persistStore(store);
