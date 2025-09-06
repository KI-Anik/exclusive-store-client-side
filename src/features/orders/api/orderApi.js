import { apiSlice } from '../../../app/apiSlice';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Query to get all orders for the current user, or all orders for an admin.
     * The server will determine which orders to return based on the user's role.
     */
    getOrders: builder.query({
      query: (params) => ({
        url: '/orders',
        params, // For any filtering or pagination
      }),
      // The response is expected to be in the format { success: boolean, data: [...] }
      transformResponse: (response) => response.data,
      /**
       * Provides tags for the cached data.
       * A general 'LIST' tag for the collection, and a specific tag for each order.
       */
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Order', id: _id })), { type: 'Order', id: 'LIST' }]
          : [{ type: 'Order', id: 'LIST' }],
    }),

    /**
     * Query to get a single order by its ID.
     */
    getOrder: builder.query({
      query: (orderId) => `/orders/${orderId}`,
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),

    /**
     * Mutation to create a new order.
     * The payload should include `items` and `shippingAddress`.
     */
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: '/orders',
        method: 'POST',
        body: newOrder,
      }),
      /**
       * Invalidates the 'LIST' tag, forcing RTK Query to refetch any query that provides this tag (e.g., getOrders).
       */
      invalidatesTags: [{ type: 'Order', id: 'LIST' }],
    }),

    /**
     * Mutation to update an order's status. (Admin only)
     * The payload should include `orderId` and the new `status`.
     */
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/orders/${orderId}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (result, error, { orderId }) => [{ type: 'Order', id: orderId }, { type: 'Order', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
} = orderApiSlice;