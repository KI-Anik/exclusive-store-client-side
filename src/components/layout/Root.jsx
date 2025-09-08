import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Root = () => {
   
    return (
        <div>
           <Navbar></Navbar> 
           <div className='min-h-[calc(100vh-460px)] bg-base-200'>
           <Outlet></Outlet>
           </div>
           <Footer></Footer>
        </div>
    );
};

export default Root;