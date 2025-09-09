import { configureStore } from "@reduxjs/toolkit";
import productReducer from './slice/productSlice';
import { productApi } from './api/productApi';
import { baseApi } from './api/baseApi';
import authReducer from '../app/slice/authSlice';


export const store = configureStore({
    reducer: {
        product: productReducer,
        [productApi.reducerPath]: productApi.reducer,
        [baseApi.reducerPath]: baseApi.reducer,
        auth: authReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(productApi.middleware)
            .concat(baseApi.middleware)

})