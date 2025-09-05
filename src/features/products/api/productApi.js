import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../auth/api/baseQueryWithReauth';

const categoriesData = [
  {
    "id": 0,
    "category": "All Product"
  },
  {
    "id": 1,
    "category": "Samsung"
  },
  {
    "id": 2,
    "category": "Iphone"
  },
  {
    "id": 3,
    "category": "Oppo"
  },
  {
    "id": 4,
    "category": "I-pad"
  },
  {
    "id": 5,
    "category": "Smart Watch"
  }
];

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Products', 'Categories'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      // The query now accepts an object with page and limit
      query: ({ page = 1, limit = 10 } = {}) => `products?page=${page}&limit=${limit}`,
      // The result is now expected to be an object like { products: [], totalPages: 5 }
      providesTags: (result) => {
        const products = result?.products || [];
        return products.length
          ? [
              ...products.map(({ id }) => ({ type: 'Products', id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }];
      },
    }),
    getProduct: builder.query({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),
    getCategories: builder.query({
      queryFn: () => ({ data: categoriesData }),
      providesTags: ['Categories'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `products/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Products', id }],
    }),
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: 'products',
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoriesQuery,
  useUpdateProductMutation,
  useAddProductMutation,
  useDeleteProductMutation,
} = productApi;