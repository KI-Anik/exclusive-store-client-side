import { baseApi } from './baseApi';
import { setUser } from '../slice/authSlice';

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userInfo) => ({
                url: '/user/register',
                method: 'POST',
                body: userInfo,
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
    }),
});

export const { useRegisterMutation } = userApi;