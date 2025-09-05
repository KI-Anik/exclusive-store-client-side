import React, { useEffect, useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import FilterByCategories from './FilterByCategories';
import { useGetProductsQuery } from '../api/productApi';

const ProductList = ({ }) => {

    // The hook now returns an object, so we destructure it.
    const { data } = useGetProductsQuery({ limit: 100 }); // Fetch all products
    const allProducts = data?.products || [];

    const [category, setCategory] = useState("All Product") // only for display side categories name

    const gadget = useMemo(() => {
        if (category === 'All Product') {
            return allProducts;
        }
        return allProducts.filter(item => item.category === category)
    }, [allProducts, category])

    const handleCategory = (name) => {
        setCategory(name)
    }

    return (
        <div>
            <h1 className='text-center text-3xl font-bold'>Explore Cutting-Edge Gadgets</h1>
            <div className='grid grid-cols-3 gap-6 w-9/12 mx-auto p-10'>

                {
                    gadget.length === 0 ?
                        <p className='sm:col-span-2 lg:col-span-3 text-5xl p-5 text-red-500 font-bold text-center'> Sorry! No Item </p> :
                        gadget.map(card =>
                            <ProductCard
                                key={card.id}
                                card={card}
                            > </ProductCard>)
                }
            </div>
        </div>
    );
};

export default ProductList;