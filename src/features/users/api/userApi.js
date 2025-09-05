import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../auth/api/baseQueryWithReauth';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'user/all-users',
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'Users', id })),
              { type: 'Users', id: 'LIST' },
            ]
          : [{ type: 'Users', id: 'LIST' }],
    }),
    getUserById: builder.query({
      query: (id) => `user/${id}`,
      providesTags: (result, error, id) => [{ type: 'Users', id }],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `user/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Users', id }],
    }),
    registerUser: builder.mutation({
      query: (userInfo) => {
        // If userInfo is FormData, it will be sent as multipart/form-data
        // Otherwise, it will be sent as application/json
        return { url: 'user/register', method: 'POST', body: userInfo };
      },
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    addUser: builder.mutation({
      query: (newUser) => ({
        url: 'user',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({ url: `user/${id}`, method: 'DELETE' }),
      invalidatesTags: () => [{ type: 'Users', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useRegisterUserMutation,
  useAddUserMutation,
  useDeleteUserMutation,
} = userApi;