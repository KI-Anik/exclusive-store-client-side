import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../features/products';
import FilterByCategories from '../../features/products/components/FilterByCategories';
import ProductCard from '../../features/products/components/ProductCard';

const AvailableProduct = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get('category') || "All Product";
    const limit = 9; // Display 9 products

    // Prepare query parameters for the API call
    const params = {
        limit,
        // Only include the category parameter if it's not 'All Product'
        ...(category !== 'All Product' && { category }),
    };

    const { data, isLoading, isError } = useGetProductsQuery(params);
    // Destructure with defaults to handle loading state gracefully
    const { products = [] } = data || {};

    const handleCategory = (name) => {
        if (name === 'All Product') {
            // When 'All Product' is selected, we remove the query parameter for a cleaner URL.
            setSearchParams({});
        } else {
            setSearchParams({ category: name });
        }
    };

    return (
        <div>
            <h1 className='text-center text-3xl font-bold'>Avaiable Products</h1>
            <div className='grid grid-cols-1 md:grid-cols-4 my-12 pb-10 gap-6'>
                <aside className='md:sticky top-5 h-fit w-9/12 mx-auto'>
                    <FilterByCategories
                        handleCategory={handleCategory}
                        activeCategory={category}
                    ></FilterByCategories>
                </aside>

                <main className='md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {isLoading && (
                        <div className="sm:col-span-2 lg:col-span-3 text-center py-10">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    )}
                    {isError && <p className='sm:col-span-2 lg:col-span-3 text-5xl p-5 text-red-500 font-bold text-center'>Could not fetch products.</p>}
                    {!isLoading && !isError && products.length === 0 && (
                        <p className='sm:col-span-2 lg:col-span-3 text-5xl p-5 text-red-500 font-bold text-center'>Sorry! No Items Found.</p>
                    )}
                    {!isLoading && products.map(card => (
                        <ProductCard key={card.id} card={card} />
                    ))}
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