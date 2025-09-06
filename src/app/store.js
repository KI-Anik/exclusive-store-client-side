import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../features/products/productSlice';
import userReducer from '../features/users/userSlice';
import authReducer from '../features/auth/authSlice';
import orderReducer from '../features/orders/orderSlice';
import { setStoredList } from '../utils/localStorage';
import { apiSlice } from "./apiSlice";

// Middleware to persist cart and wishlist to localStorage
const localStorageMiddleware = (store) => (next) => (action) => {
    const result = next(action);
 
    // After any action from the product slice, save the cart and wishlist for the current user.
    if (action.type?.startsWith('product/')) {
        const state = store.getState();
        const userId = state.auth.user?._id; // Get user ID from auth state

        if (userId) {
            // User is logged in, save to user-specific key
            setStoredList(`cart_${userId}`, state.product.carts);
            setStoredList(`wish-list_${userId}`, state.product.wishLists);
        } else {
            // User is a guest, save to generic guest key
            setStoredList('cart_guest', state.product.carts);
            setStoredList('wish-list_guest', state.product.wishLists);
        }
    }
 
    return result;
};
 
export const store = configureStore({
    reducer: {
        // The central API slice reducer
        [apiSlice.reducerPath]: apiSlice.reducer, // All API endpoints will be handled here
        // Other slice reducers
        product: productReducer,
        order: orderReducer,
        users: userReducer,
        auth: authReducer,
    },
 
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(apiSlice.middleware) // Single API middleware
            .concat(localStorageMiddleware),
});