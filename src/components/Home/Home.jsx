import React from 'react';
import Banner from './Banner';
import AllProducts from '../AllProducts/AllProducts';
import { useLoaderData } from 'react-router-dom';

const Home = () => {
    // fethched main 10 data
    const categories = useLoaderData()
    return (
        <div className='w-11/12 mx-auto'>
            <Banner></Banner>
            <AllProducts categories={categories}></AllProducts>
        </div>
    );
};

export default Home;