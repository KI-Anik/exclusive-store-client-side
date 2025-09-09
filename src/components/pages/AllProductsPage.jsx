import React from 'react';
import ProductCard from '../product/ProductCard';
import { useGetProductsQuery } from '../../app/api/productApi';

const AllProductsPage = () => {
       const { data: allProducts = []} = useGetProductsQuery()

    return (
        <div className='pt-5'>
            <h1 className='text-center text-3xl font-bold'>Explore Cutting-Edge Gadgets</h1>
            <div className='grid grid-cols-3 gap-6 w-9/12 mx-auto p-10'>

                {
                    allProducts.length === 0 ?
                        <p className='sm:col-span-2 lg:col-span-3 text-5xl p-5 text-red-500 font-bold text-center'> Sorry! No Item </p> :
                        allProducts.map(card =>
                            <ProductCard
                                key={card.id}
                                card={card}
                            > </ProductCard>)
                }
            </div>
        </div>
    );
};

export default AllProductsPage;