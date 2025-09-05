import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { logOut, setUser } from '../authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5005/api/v1/',
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = getState().auth.user?.token;

    // Endpoints that should not receive the authorization header
    const publicEndpoints = ['login', 'registerUser'];

    if (token && !publicEndpoints.includes(endpoint)) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery({ url: 'auth/refresh-token', method: 'POST' }, api, extraOptions);
    if (refreshResult.data) {
      // store the new token
      api.dispatch(setUser({ ...api.getState().auth.user, token: refreshResult.data.accessToken }));
      // retry the original query with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};