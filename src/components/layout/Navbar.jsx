import React from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { FaRegHeart } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
    const {pathname} = useLocation()

    return (
        <div className={`w-11/12 mx-auto ${pathname === '/' ? "bg-purple-500 text-white rounded-t-2xl" : ""}`}>
            
            <div className='flex justify-between items-center mt-3 p-5 '>
                <h1>Exclusive-store</h1>
                <div className='flex gap-10 font-bold'>
                    <NavLink to={'/'}>Home</NavLink>
                    <NavLink to={'/allproducts'}>All-Products</NavLink>
                    <NavLink to={'/dashboard'}>Dashboard</NavLink>
                    <NavLink to={'/order'}>My order</NavLink>
                    <a href="https://www.facebook.com/iamkhairul101">Contact</a>
                </div>
                
                {/* right side two icons */}
                <div className='flex gap-5 text-xl'>
                    <IoCartOutline></IoCartOutline>
                    <FaRegHeart></FaRegHeart>
                </div>
            </div>
            
        </div>
    );
};

export default Navbar;