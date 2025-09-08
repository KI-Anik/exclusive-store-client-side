import React from 'react';
import Banner from '../Home/Banner';
import AvailableProduct from '../Home/AvailableProduct';

const HomePage = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <Banner></Banner>
            <AvailableProduct></AvailableProduct>
        </div>
    );
};

export default HomePage;