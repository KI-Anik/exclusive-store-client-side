import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/shared/Navbar';

const App = () => {
    return (
        <div>
            <Toaster position="top-center" reverseOrder={false} />
            <Navbar />
            <main className="container mx-auto px-4">
                <Outlet />
            </main>
        </div>
    );
};

export default App;
