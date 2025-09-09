/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../components/provider/AuthProvider";
import Loading from "../components/Loading";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRouter = ({children}) => {
    const {user, loading}= useContext(AuthContext)
    const {pathname} = useLocation()
    
    if(loading){
        return <Loading></Loading>
    }
    if(user && user?.email){
        return children
    }
    return (
       <Navigate to={'/auth/login'} state={pathname}></Navigate>
    );
};

export default PrivateRouter;