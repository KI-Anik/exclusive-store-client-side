import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div>
            {/* description */}
            <div className='text-center space-y-6 bg-purple-500 pb-64 pt-10 rounded-b-2xl'>

                <h1 className='text-5xl font-bold'>Upgrade Your Tech Accessorize with <br /> Exclusive-store Accessories</h1>
                <p className='font-xl'>Explore the latest gadgets that will take your experience to the next level. From smart devices <br /> to the coolest accessories, we have it all!</p>
                <Link to={'/dashboard'} className='btn bg-white text-purple-600 rounded-full px-6 font-bold'>Shop Now</Link>
            </div>

            {/* Image section */}
            <div className='flex justify-center'>
                <div className='relative bottom-60 border w-1/2 p-4 backdrop-blur-2xl rounded-3xl mt-7'>
                    <img className='rounded-2xl w-full' src="/assets/banner.jpg" alt="" />
                </div>
            </div>

        </div>
    );
};

export default Banner;