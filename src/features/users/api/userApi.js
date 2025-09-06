import { apiSlice } from "../../../app/apiSlice";
import { setUser } from "../../auth/authSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => ({
        url: 'user/all-users',
        params,
      }),
      transformResponse: (response, meta, params) => {
        return {
          users: response.data.map((user) => ({ ...user, id: user._id })),
          totalPages: Math.ceil(response.meta.total / (params?.limit || 10)),
        };
      },
      providesTags: (result) =>
        result?.users
          ? [...result.users.map(({ id }) => ({ type: 'User', id })), { type: 'User', id: 'LIST' }]
          : [{ type: 'User', id: 'LIST' }],
    }),
    getUserById: builder.query({
      query: (id) => `user/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `user/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
    registerUser: builder.mutation({
      query: (userInfo) => {
        return { url: 'user/register', method: 'POST', body: userInfo };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // On successful registration, the server returns the user and an access token.
          // Dispatch `setUser` to log the user in automatically.
          dispatch(setUser({ user: data.data.user, token: data.data.accessToken }));
        } catch (error) {
          // Error is handled by the component's catch block.
          console.error('Auto-login after registration failed:', error);
        }
      },
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({ url: `user/${id}`, method: 'DELETE' }),
      invalidatesTags: () => [{ type: 'User', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useRegisterUserMutation,
  useDeleteUserMutation,
} = userApi;