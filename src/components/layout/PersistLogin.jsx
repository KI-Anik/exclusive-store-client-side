import { useGetRefreshTokenQuery } from "../../app/api/authApi";
import { useSelector } from "react-redux";
import React from "react";
import { selectCurrentToken } from "../../app/slice/authSlice";

/**
 * This component is responsible for re-authenticating the user when the app is reloaded.
 * It calls the `getRefreshToken` endpoint only if no token is present in the Redux state.
 * While the refresh token is being validated, it displays a loading indicator.
 * Once the check is complete, it renders its children, which will then have access
 * to the correct authentication state.
 */
const PersistLogin = ({ children }) => {
    const token = useSelector(selectCurrentToken);

    const { isLoading } = useGetRefreshTokenQuery(undefined, {
        skip: !!token, // If we already have a token, don't fetch a new one
    });

    if (isLoading) {
        // This loading state will be shown for the entire page, preventing any
        // flash of unauthenticated content in the Navbar or other components.
        return <p className="text-center text-2xl p-10">Loading session...</p>;
    }

    // Once the query is done (or skipped), render the actual application.
    return <>{children}</>;
};

export default PersistLogin;