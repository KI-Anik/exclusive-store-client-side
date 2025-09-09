import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5005/api/v1', // Adjust if your backend URL is different
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('authorization', token);
            }
            return headers;
        }
    }),
    endpoints: () => ({}),
    tagTypes: ['User', 'Product', 'Order'],
});