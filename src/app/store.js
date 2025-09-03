import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../features/products/productSlice';
import { productApi } from '../features/products/api/productApi';

export const store = configureStore({
    reducer: {
        product: productReducer,
        [productApi.reducerPath]: productApi.reducer
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(productApi.middleware)
    
})