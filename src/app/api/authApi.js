import { baseApi } from '../../app/api/baseApi';
import { setUser, logout } from '../slice/authSlice';

export const authApi = baseApi.injectEndpoints({
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
                    if (data?.data?.user && data?.data?.accessToken) {
                        dispatch(setUser({ user: data.data.user, token: data.data.accessToken }));
                    }
                } catch (error) {
                    // Error is handled in the component
                }
            },
        }),
        getRefreshToken: builder.query({
            query: () => ({
                url: '/auth/refresh-token',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data?.data?.user && data?.data?.accessToken) {
                        dispatch(setUser({ user: data.data.user, token: data.data.accessToken }));
                    }
                } catch (error) {
                    // The user is not logged in, or the refresh token is invalid.
                }
            },
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(logout());
            }
        })
    }),
});

export const { useLoginMutation, useLogoutMutation, useGetRefreshTokenQuery } = authApi;