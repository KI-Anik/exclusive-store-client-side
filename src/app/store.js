import { configureStore } from "@reduxjs/toolkit";
import productReducer from './slice/productSlice';
import { productApi } from './api/productApi';


export const store = configureStore({
    reducer: {
        product: productReducer,
        [productApi.reducerPath]: productApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(productApi.middleware)

})