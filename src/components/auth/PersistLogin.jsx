import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useRefreshMutation } from '../../features/auth/api/authApi';
import Loading from '../ui/Loading';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [refresh] = useRefreshMutation();
    const { token } = useSelector((state) => state.auth);
    const effectRan = useRef(false);

    useEffect(() => {
        // This effect should only run once on initial app load to persist the session.
        // Using an empty dependency array `[]` prevents it from re-running after logout.
        // The `effectRan` ref handles React 18's StrictMode running effects twice in development.
        if (effectRan.current === false || process.env.NODE_ENV !== 'development') {
            const verifyRefreshToken = async () => {
                try {
                    // The refresh mutation will automatically handle setting the user and token.
                    await refresh().unwrap();
                } catch (err) {
                    // This is expected if the refresh token is expired or invalid.
                    console.error('Session expired or invalid. User needs to log in.');
                } finally {
                    setIsLoading(false);
                }
            };

            // Only try to refresh if we don't have a token in memory.
            if (!token) {
                verifyRefreshToken();
            } else {
                setIsLoading(false);
            }
        }

        return () => (effectRan.current = true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // <-- Empty dependency array is crucial for the fix.

    // Show a loading spinner while we're trying to refresh the token.
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loading />
            </div>
        );
    }

    // Once loading is complete, render the child routes.
    return <Outlet />;
};

export default PersistLogin;