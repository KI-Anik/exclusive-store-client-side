import React from 'react';

const ProductDetailsSkeleton = () => {
    return (
        <div>
            {/* This part is static and doesn't cause layout shift, but we include it for visual consistency */}
            <div className='text-white text-center space-y-6 bg-purple-500 pb-44 pt-10'>
                <h1 className='text-5xl font-bold'>Product Details</h1>
                <p className='font-xl'>Explore the latest gadgets that will take your experience to the next level. From smart devices to <br /> the coolest accessories, we have it all!</p>
            </div>

            <div className="hero bg-white w-3/5 mx-auto rounded-3xl py-5 relative bottom-36 animate-pulse">
                <div className="hero-content flex-col lg:flex-row gap-10 w-full">
                    {/* Image Skeleton */}
                    <div className="bg-gray-200 rounded-2xl shadow-2xl w-1/3 aspect-square"></div>

                    {/* Content Skeleton */}
                    <div className='space-y-5 flex-1'>
                        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mt-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>

                        <div className="flex gap-4 pt-4">
                            <div className="h-12 bg-gray-200 rounded w-36"></div>
                            <div className="h-12 bg-gray-200 rounded w-36"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products Skeleton */}
            <div className="w-4/5 mx-auto py-10 relative bottom-20">
                <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-8 animate-pulse"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                    {[...Array(3)].map((_, i) => <div key={i} className="bg-gray-200 rounded-xl h-72"></div>)}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsSkeleton;