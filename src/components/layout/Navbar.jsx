import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
    const { pathname } = useLocation()

    const links = (
        <div className='flex flex-col lg:flex-row text-lg font-semibold m-2'>
            <li><NavLink to={'/'}>Home</NavLink></li>
            <li><NavLink to={'/allproducts'}>All Products</NavLink></li>
            <li><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
            <li><NavLink to={'/order'}>My Orders</NavLink></li>
            <li><a href="https://www.linkedin.com/in/iamkhairul101/" target='_blank' rel="noopener noreferrer">Contact</a></li>
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
                    <>
                    <button><Link to={'/auth/login'} className="btn">Log in</Link></button>
                    <button><Link to={'/auth/register'} className="btn">Register</Link></button>
                    </>
            </div>
        </div>
    );
};

export default Navbar;