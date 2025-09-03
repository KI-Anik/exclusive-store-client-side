import React from 'react';
import { useGetCategoriesQuery } from '../api/productApi';

const FilterByCategories = ({handleCategory}) => {

    const {data : categories = []} = useGetCategoriesQuery()
    return (
        <div className='card bg-base-100 items-center shadow-xl py-8 gap-5 flex flex-col'>
                        {/* map for display side category name as btn, addEvent for filter */}
                        {
                            categories.map(item =>
                                <button key={item.id}
                                    className='btn hover:bg-purple-500'
                                    onClick={() => handleCategory(item.category)}
                                >
                                    {item.category}
                                </button>)
                        }
                    </div>
    );
};

export default FilterByCategories;