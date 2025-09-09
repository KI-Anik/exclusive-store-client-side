import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import React from 'react';
import PersistLogin from './PersistLogin';

const Root = () => {
   
    return (
        <PersistLogin>
            <>
                <Navbar />
                <div className='min-h-[calc(100vh-460px)] bg-base-200'>
                    <Outlet />
                </div>
                <Footer />
            </>
        </PersistLogin>
    );
};

export default Root;