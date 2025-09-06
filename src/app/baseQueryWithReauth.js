import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { logOut, setUser } from '../features/auth/authSlice';

// The core fetchBaseQuery with the base URL and header preparation
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5005/api/v1/',
  credentials: 'include', // Important to include credentials for cookies to be sent
  prepareHeaders: (headers, { getState }) => {
    // Get the token from the Redux state
    const token = getState().auth.token;
    if (token) {
      // Attach the token as a Bearer token
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Check if the request failed with a 401 Unauthorized error
  if (result.error && result.error.status === 401) {
    // The refresh token is in an httpOnly cookie, so we can't access it directly.
    // We just need to make a request to the refresh token endpoint.
    // The browser will automatically send the cookie.
    const refreshResult = await baseQuery(
      {
        url: 'auth/refresh-token',
        method: 'POST',
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      // The refresh endpoint now returns both the user and a new accessToken.
      const { user, accessToken } = refreshResult.data.data;
      api.dispatch(setUser({ user, token: accessToken }));
      // Retry the original request with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // If refresh fails, log the user out completely.
      api.dispatch(logOut());
    }
  }

  return result;
};
