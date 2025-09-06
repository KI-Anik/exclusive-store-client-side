import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ card }) => {
    const {id, product_title, product_image, price } = card

    return (
        <div className="card bg-base-100 shadow-xl h-full flex flex-col">
            <figure className="px-10 pt-10 rounded-t-2xl">
                <img
                    src={product_image}
                    alt="gadget"
                    className="rounded-xl h-40 object-contain" />
            </figure>
            <div className="card-body items-center text-center flex-grow flex flex-col">
                <h2 className="card-title">{product_title}</h2>
                <p>Price: ${price}</p>
            </div>
            <div className="card-actions justify-center p-4">
                <Link to={`/details/${id}`} className="w-full text-center">
                    <button className="btn btn-primary ">View Details</button>
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;