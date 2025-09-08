import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../features/slice/productSlice';
import { productApi } from '../features/api/productApi';

export const store = configureStore({
    reducer: {
        product: productReducer,
        [productApi.reducerPath]: productApi.reducer
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(productApi.middleware)
    
})