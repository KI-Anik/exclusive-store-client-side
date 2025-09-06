import { apiSlice } from '../../../app/apiSlice';

const categoriesData = [
  { id: 0, category: 'All Product' },
  { id: 1, category: 'Samsung' },
  { id: 2, category: 'Iphone' },
  { id: 3, category: 'Oppo' },
  { id: 4, category: 'I-pad' },
  { id: 5, category: 'Smart Watch' },
];

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: 'products',
        params,
      }),
      transformResponse: (response, meta, arg) => {
        return {
          products: response.data.map((product) => ({ ...product, id: product._id })),
          totalPages: Math.ceil(response.meta.total / (arg.limit || 10)),
        };
      },
      providesTags: (result) => {
        const products = result?.products ?? [];
        return products.length
          ? [...products.map(({ id }) => ({ type: 'Product', id })), { type: 'Product', id: 'LIST' }]
          : [{ type: 'Product', id: 'LIST' }];
      },
    }),
    getProduct: builder.query({
      query: (id) => `products/${id}`,
      transformResponse: (response) => ({ ...response.data, id: response.data._id }),
      providesTags: (result, error, id) => [{ type: 'Product', id: result?.id || id }],
    }),
    getCategories: builder.query({
      queryFn: () => ({ data: categoriesData }),
      providesTags: ['Category'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `products/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      transformResponse: (response) => ({ ...response.data, id: response.data._id }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }, { type: 'Product', id: 'LIST' }],
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          productApiSlice.util.updateQueryData('getProduct', id, (draft) => {
            Object.assign(draft, patch);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: 'products',
        method: 'POST',
        body: newProduct,
      }),
      transformResponse: (response) => ({ ...response.data, id: response.data._id }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response) => ({ ...response.data, id: response.data._id }),
      async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
        const patchResults = [];
        for (const { endpointName, originalArgs } of productApiSlice.util.selectCachedSubscribers(getState())) {
          if (endpointName === 'getProducts') {
            patchResults.push(
              dispatch(
                productApiSlice.util.updateQueryData(endpointName, originalArgs, (draft) => {
                  const productIndex = draft.products.findIndex((p) => p.id === id);
                  if (productIndex > -1) {
                    draft.products.splice(productIndex, 1);
                  }
                }),
              ),
            );
          }
        }

        try {
          await queryFulfilled;
        } catch {
          patchResults.forEach((patchResult) => patchResult.undo());
        }
      },
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
} = productApiSlice;