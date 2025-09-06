import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { useGetProductsQuery } from '../api/productApi';

const ProductList = () => {
    const [page, setPage] = useState(1);
    const limit = 12; // Display 12 products per page

    const { data, isLoading, isError } = useGetProductsQuery({ page, limit });
    // Destructure with defaults to handle loading state gracefully
    const { products = [], totalPages = 1 } = data || {};

    console.log(products, 'products');

    const handlePreviousPage = () => {
        setPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setPage((prev) => Math.min(prev + 1, totalPages));
    };

    const handlePageClick = (pageNumber) => {
        setPage(pageNumber);
    };

    const getPaginationRange = (totalPages, currentPage, siblings = 1) => {
        // The total page numbers to show in the pagination bar
        const totalPageNumbers = siblings * 2 + 5; // 1 (current) + 2*siblings + 2 (first, last) + 2 (ellipses)

        // Case 1: If the number of pages is less than the page numbers we want to show
        if (totalPageNumbers >= totalPages) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const leftSiblingIndex = Math.max(currentPage - siblings, 1);
        const rightSiblingIndex = Math.min(currentPage + siblings, totalPages);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

        const firstPageIndex = 1;
        const lastPageIndex = totalPages;

        // Case 2: No left dots to show, but right dots to be shown
        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblings;
            let leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
            return [...leftRange, '...', totalPages];
        }

        // Case 3: No right dots to show, but left dots to be shown
        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblings;
            let rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1);
            return [firstPageIndex, '...', ...rightRange];
        }

        // Case 4: Both left and right dots to be shown
        let middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i);
        return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
    };

    const pageNumbers = totalPages > 1 ? getPaginationRange(totalPages, page) : [];

    return (
        <div>
            <h1 className='text-center text-3xl font-bold'>Explore Cutting-Edge Gadgets</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-11/12 mx-auto p-10'>
                {isLoading && (
                    <div className="col-span-full text-center py-10">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                )}
                {isError && <p className='col-span-full text-5xl p-5 text-red-500 font-bold text-center'>Could not fetch products.</p>}
                {!isLoading && !isError && products.length === 0 && (
                    <p className='col-span-full text-5xl p-5 text-red-500 font-bold text-center'>Sorry! No Items Found.</p>
                )}
                {!isLoading && products.map(card => (
                    <ProductCard key={card.id} card={card} />
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="join flex justify-center pb-10">
                    <button
                        onClick={handlePreviousPage}
                        disabled={page === 1 || isLoading}
                        className="join-item btn"
                    >
                        «
                    </button>
                    {pageNumbers.map((number, index) => {
                        if (number === '...') {
                            return <button key={`dots-${index}`} className="join-item btn btn-disabled">...</button>;
                        }
                        return (
                            <button
                                key={number}
                                onClick={() => handlePageClick(number)}
                                className={`join-item btn ${page === number ? 'btn-active' : ''}`}
                            >{number}</button>
                        );
                    })}
                    <button
                        onClick={handleNextPage}
                        disabled={page === totalPages || isLoading}
                        className="join-item btn"
                    >
                        »
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductList;