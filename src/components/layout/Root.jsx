import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Root = () => {
   
    return (
            <>
                <Navbar />
                <div className='min-h-[calc(100vh-460px)] bg-base-200'>
                    <Outlet />
                </div>
                <Footer />
            </>
    );
};

export default Root;