import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => `fakeData.json`,
        }),
        getCategories: builder.query({
            query: () => `categories.json`,
        }),
    })
});


export const {useGetProductsQuery, useGetCategoriesQuery} = productApi