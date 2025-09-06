import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useLogoutMutation } from '../../features/auth/api/authApi';
import { logOut } from '../../features/auth/authSlice';
import { apiSlice } from '../../app/apiSlice';

const Navbar = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

    const handleLogout = async () => {
        // Instantly clear client-side state to prevent unauthorized access.
        dispatch(logOut());
        dispatch(apiSlice.util.resetApiState());

        // Navigate to a public page immediately.
        navigate('/login', { replace: true });

        // Inform the server in the background.
        logout()
            .unwrap()
            .then(() => {
                toast.success('Logged out successfully!');
            })
            .catch((err) => {
                // This is a non-critical error since the user is already logged out on the client.
                console.error('Server logout failed:', err);
                toast.error('Server logout failed, but you are logged out locally.');
            });
    }

    const navLinks = (
        <div className='flex flex-col  lg:flex-row text-lg font-semibold m-2'>
            <li><NavLink to={'/'}>Home</NavLink></li>
            <li><NavLink to={'/allproducts'}>All Products</NavLink></li>
            <li><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
            {user && <li><NavLink to={'/order'}>My Orders</NavLink></li>}
            <li><a href="https://www.linkedin.com/in/iamkhairul101/" target='_blank' rel="noopener noreferrer">Contact</a></li>
        </div>
    );


    return (
        <div className={`navbar w-11/12 mx-auto px-9 ${pathname === '/' ? "bg-purple-500 lg:text-white rounded-t-2xl" : ""}`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-2xl">Exclusive-store</Link>
            </div>
            <div className={`navbar-center hidden lg:flex `}>
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end mt-5 text-black">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom" data-tip={user.name}>
                            {/* Check if user.photoURL is a non-empty string */}
                            {user.photoURL ? (
                                <div className="w-10 rounded-full">
                                    <img alt="User profile" src={user.photoURL} />
                                </div>
                            ) : (
                                <div className="avatar placeholder">
                                    <div className="bg-neutral text-neutral-content rounded-full w-10">
                                        <span>{user.name?.charAt(0).toUpperCase()}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link to="/dashboard">My Profile</Link></li>
                            {(user.role === 'ADMIN' || user.role === "SUPER_ADMIN") && (
                                <li><Link to="/admin">Admin Panel</Link></li>
                            )}
                            <li>
                                <button onClick={handleLogout} className="w-full text-left" disabled={isLoggingOut}>
                                    {isLoggingOut ? <span className="loading loading-spinner text-xs"></span> : 'Logout'}
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex gap-3">
                        <Link to={'/login'} className="btn">Log in</Link>
                        <Link to={'/register'} className="btn">Register</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;