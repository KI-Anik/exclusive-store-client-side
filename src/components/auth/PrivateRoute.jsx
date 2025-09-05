import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const user = useSelector(state => state.auth.user);
    const location = useLocation();

    if (user && user.role === 'ADMIN' || user.role==='SUPER_ADMIN') {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;