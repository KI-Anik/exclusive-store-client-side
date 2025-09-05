import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../features/products/productSlice';
import { productApi } from '../features/products/api/productApi';
import userReducer from '../features/users/userSlice';
import authReducer from '../features/auth/authSlice';
import { authApi } from '../features/auth/api/authApi';
import { userApi } from '../features/users/api/userApi';

export const store = configureStore({
    reducer: {
        product: productReducer,
        [productApi.reducerPath]: productApi.reducer,
        users: userReducer,
        [userApi.reducerPath]: userApi.reducer,
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(productApi.middleware)
            .concat(userApi.middleware)
            .concat(authApi.middleware),
    
})