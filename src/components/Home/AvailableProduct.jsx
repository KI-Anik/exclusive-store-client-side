import React, { useMemo, useState } from 'react';
import FilterByCategories from './FilterByCategories';
import ProductCard from '../product/ProductCard';
import { Link, useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../features/api/productApi';

const AvailableProduct = () => {
    const { data: allProducts = [] } = useGetProductsQuery()

    const [category, setCategory] = useState("All Product") // only for display side categories name

    const gadget = useMemo(() => {
        if (category === 'All Product') {
            return allProducts.slice(0, 9)
        }
        return allProducts.filter(item => item.category === category)
    }, [allProducts, category])

    const handleCategory = (name) => {
        setCategory(name)
    }


    return (
        <div>
            <h1 className='text-center text-3xl font-bold'>Avaiable Products</h1>
            <div className='grid grid-cols-1 md:grid-cols-4 my-12 pb-10 gap-6'>

                <aside className='md:sticky top-5 h-fit w-9/12 mx-auto'>
                    <FilterByCategories
                        handleCategory={handleCategory}
                    ></FilterByCategories>
                </aside>

                <main className='md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {
                        gadget.length === 0 ?
                            <p className='sm:col-span-2 lg:col-span-3 text-5xl p-5 text-red-500 font-bold text-center'> Sorry! No Item </p> :
                            gadget.map(card =>
                                <ProductCard
                                    key={card.id}
                                    card={card}
                                > </ProductCard>)
                    }
                </main>


            </div>
            {/* View All Button */}
            <div className="text-end pb-10">
                <Link to="/allproducts" className="btn btn-accent">
                    View All Products
                </Link>
            </div>
        </div>
    );
};

export default AvailableProduct;