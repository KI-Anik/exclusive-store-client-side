import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { logOut } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { useLogoutMutation } from '../../features/auth/api/authApi';
import Loading from '../ui/Loading';

const Navbar = () => {
    const { pathname } = useLocation()
    const { user } = useSelector(state => state.auth);
    const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            dispatch(logOut());
            toast.success('Logged out successfully!');
            navigate('/login');
        } catch (err) {
            toast.error('Logout failed. Please try again.');
            // Force logout on client even if API call fails
            dispatch(logOut());
            navigate('/login');
        }
    }



    return (
        <div className={`w-11/12 mx-auto ${pathname === '/' ? "bg-purple-500 text-white rounded-t-2xl" : ""}`}>

            <div className='flex justify-between items-center mt-3 p-5 '>
                <h1 className='text-xl font-semibold '>Exclusive-store</h1>
                <div className='flex gap-10 font-bold'>
                    <NavLink to={'/'}>Home</NavLink>
                    <NavLink to={'/allproducts'}>All-Products</NavLink>
                    <NavLink to={'/dashboard'}>Dashboard</NavLink>
                    <NavLink to={'/order'}>My order</NavLink>
                    <a href="https://www.facebook.com/iamkhairul101" target='_blank'>Contact</a>
                </div>

                {/* right side two icons */}
                <div className='flex gap-5 text-xl'>

                    {user ? (
                        <>
                            {(user.role === 'Admin' || user.role === "SUPER_ADMIN") && <Link to="/admin" className='btn btn-accent'>Admin Panel</Link>}
                            <button onClick={handleLogout} className="btn btn-warning" disabled={isLoggingOut}>
                                {isLoggingOut ? <Loading></Loading> : 'Logout'}
                            </button>
                        </>
                    ) : (
                        <>
                            <button><Link to={'/login'} className="btn">Log in</Link></button>
                            <button><Link to={'/register'} className="btn">Register</Link></button>
                        </>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Navbar;