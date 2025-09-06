import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';

/**
 * The central API slice for the entire application.
 * All other API slices will inject their endpoints into this one.
 */
export const apiSlice = createApi({
  reducerPath: 'api', // A single reducer path for the entire API
  baseQuery: baseQueryWithReauth, // Use our custom base query with re-auth logic
  tagTypes: ['User', 'Product', 'Order'], // Define tags for caching and invalidation
  endpoints: (builder) => ({}), // Endpoints are injected from other files
});