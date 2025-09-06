import { Link, useParams } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToWishlist } from '../productSlice';
import { useGetProductQuery, useGetProductsQuery } from '../api/productApi';
import ProductDetailsSkeleton from '../components/ProductDetailsSkeleton';
import RelatedProducts from '../components/RelatedProducts';


const ProductDetailsPage
    = () => {
        const { id } = useParams()
        const { data: singleProductCard, isLoading, isError } = useGetProductQuery(id, {
            skip: !id, // Prevent query from running if id is undefined
        });

        // Fetch related products from the same category
        const category = singleProductCard?.category;
        const { data: relatedProductsData } = useGetProductsQuery(
            {
                ...(category && { category }), // Only add category to params if it exists
                limit: 4, // Fetch 4 to have enough items after filtering
            },
            {
                skip: !category, // Don't run this query until the category is known
            }
        );

        const dispatch = useDispatch()

        const isInCart = useSelector(state => !!state.product.carts.find(item => item.id === id));
        const isWishlist = useSelector(state => !!state.product.wishLists.find(item => item.id === id));

        // Show loading spinner if the query is running or if we are waiting for the id
        if (isLoading || !id) {
            return (
                <ProductDetailsSkeleton />
            );
        }

        if (isError || !singleProductCard) {
            return (
                <div className="text-center py-40 text-red-500">
                    <h2 className='text-3xl font-bold'>Error: Product not found.</h2>
                    <p>The product you are looking for does not exist.</p>
                </div>
            );
        }

        // Filter out the current product from the related list and take the first 3
        const relatedProducts = relatedProductsData?.products
            ?.filter((product) => product.id !== singleProductCard.id)
            .slice(0, 8);

        const { product_image, product_title, price, description, specification, rating, availability } = singleProductCard

        const handleAddToCart = () => {
            dispatch(addToCart(singleProductCard))
        }

        const handleAddToWishList = () => {
            dispatch(addToWishlist(singleProductCard))
        }

        return (
            <div>
                <div className='text-white text-center space-y-6 bg-purple-500 pb-44 pt-10'>

                    <h1 className='text-5xl font-bold'>Product Details</h1>
                    <p className='font-xl'>Explore the latest gadgets that will take your experience to the next level. From smart devices to <br /> the coolest accessories, we have it all!</p>
                </div>

                <div className="hero bg-white w-3/5 mx-auto rounded-3xl py-5 relative bottom-36">
                    <div className="hero-content flex-col lg:flex-row gap-10">
                        <figure className="w-1/3 ">
                            <img
                                src={product_image}
                                alt={product_title}
                                className="rounded-2xl w-full h-full object-contain" />
                        </figure>
                        <div className='space-y-4'>
                            <h1 className="text-2xl font-bold">{product_title}</h1>
                            <p className='font-semibold'>Price: ${price}</p>
                            <p>{description}</p>

                            <p>
                                Specification:
                                {
                                    specification.map((spec, idx) => <li key={idx}>{spec}</li>)
                                }
                            </p>

                            <p>Rating: {rating}</p>

                            {/* value store in local storage */}
                            <div className='flex gap-4 items-center'>
                                {availability ?
                                    (isInCart ? (
                                        <Link to={'/dashboard'}
                                            className="btn btn-primary">
                                            View cart <FaCartShopping></FaCartShopping>
                                        </Link>
                                    ) :
                                        (<button
                                            onClick={handleAddToCart}
                                            disabled={isWishlist}
                                            className="btn btn-secondary">
                                            Add to cart <FaCartShopping></FaCartShopping>
                                        </button>
                                        )) :
                                    (<p className='text-red-500 text-xl'>stock out</p>)
                                }

                                {/* wishlist */}
                                {
                                    isWishlist ? (
                                        <Link to={'/dashboard'} state={{ tab: "wish-list" }} className="btn btn-primary">
                                            View Wishlist <FaRegHeart />
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={handleAddToWishList}
                                            disabled={isInCart}
                                            className={`${availability? 'btn hover:btn-secondary' : 'btn btn-secondary'}`} >
                                            Add to Wishlist <FaRegHeart />
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                <RelatedProducts products={relatedProducts} />
            </div>
        );
    };

export default ProductDetailsPage
    ;