import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useLogoutMutation } from "../../app/api/authApi";
import { selectCurrentUser } from "../../app/slice/authSlice";

const Navbar = () => {
    const { pathname } = useLocation()
    const user = useSelector(selectCurrentUser);
    console.log(user);
    const navigate = useNavigate();

    const [logout] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            toast.success("Logged out successfully!");
            navigate("/auth/login");
        } catch (err) {
            toast.error("Failed to log out. Please try again.");
        }
    };

    const links = (
        <div className='flex flex-col lg:flex-row text-lg font-semibold m-2 gap-5'>
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'/allproducts'}>All Products</NavLink>
            <NavLink to={'/dashboard'}>Dashboard</NavLink>
            <NavLink to={'/order'}>My Orders</NavLink>
            <a href="https://www.linkedin.com/in/iamkhairul101/" target='_blank' rel="noopener noreferrer">Contact</a>
        </div>
    );


    return (
        <div className={`navbar w-11/12 mx-auto px-9  ${pathname === '/' ? "bg-purple-500 lg:text-white rounded-t-2xl" : ""}`}>
             <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow z-10">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-2xl font-bold">Exclusive Store</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end gap-4 items-center text-black">
                {user ? (
                    <button onClick={handleLogout} className="btn">
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to={'/auth/login'} className="btn">Log in</Link>
                        <Link to={'/auth/register'} className="btn">Register</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;