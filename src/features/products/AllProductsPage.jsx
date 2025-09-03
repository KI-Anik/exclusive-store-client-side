import React from 'react';
import ProductList from './components/ProductList';
import { useLoaderData } from 'react-router-dom';

const AllProductsPage = () => {
    const categories = useLoaderData()
    return (
        <div className='pt-5'>
            <ProductList categories={categories}></ProductList>
        </div>
    );
};

export default AllProductsPage;