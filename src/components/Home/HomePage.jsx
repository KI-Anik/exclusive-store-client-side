import React from 'react';
import Banner from './Banner';
import { ProductList } from '../../features/products';
import AvailableProduct from './AvailableProduct';

const HomePage = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <Banner></Banner>
            <AvailableProduct></AvailableProduct>
        </div>
    );
};

export default HomePage;