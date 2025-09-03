import React from 'react';
import Banner from './Banner';
import { useLoaderData } from 'react-router-dom';
import { ProductList } from '../../features/products';

const HomePage = () => {
    // fethched main 10 data
    const categories = useLoaderData()
    return (
        <div className='w-11/12 mx-auto'>
            <Banner></Banner>
            <ProductList categories={categories}></ProductList>
        </div>
    );
};

export default HomePage;