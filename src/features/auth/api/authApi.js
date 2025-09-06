import { apiSlice } from '../../../app/apiSlice';
import { setUser } from '../authSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // On successful login, dispatch setUser to update the auth state.
          dispatch(setUser({ user: data.data.user, token: data.data.accessToken }));
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
        // The onQueryStarted hook is removed. Logout logic is now handled in the
        // Navbar component to ensure immediate client-state clearing for security.
    }),
    resetPassword: builder.mutation({
      query: (passwordInfo) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: passwordInfo, // e.g., { oldPassword, newPassword }
      }),
    }),
    refresh: builder.mutation({
        query: () => ({
            url: '/auth/refresh-token',
            method: 'POST',
        }),
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
            try {
                const { data } = await queryFulfilled;
                const { user, accessToken } = data.data;
                dispatch(setUser({ user, token: accessToken }));
            } catch (error) {
                // This will fail if the refresh token is invalid or expired.
                // The user will remain logged out, which is the correct behavior.
            }
        }
    })
  }),
});

export const { useLoginMutation, useLogoutMutation, useResetPasswordMutation, useRefreshMutation } = authApi;