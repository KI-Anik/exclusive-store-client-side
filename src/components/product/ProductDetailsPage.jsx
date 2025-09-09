import { Link, useLoaderData, useParams } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToWishlist } from '../../app/slice/productSlice';
import RelatedProducts from './RelatedProducts';


const ProductDetailsPage
    = () => {
        const { id } = useParams()
        const pId = parseInt(id)
        const data = useLoaderData()
        console.log(data);

        const singleProductCard = data.find(ProductCard => ProductCard.id === pId)
        const { id: currentBookId, product_image, product_title, price, description, specification, rating, availability, category } = singleProductCard

        const dispatch = useDispatch()

        const isInCart = useSelector(state => !!state.product.carts.find(item => item.id === pId));
        const isWishlist = useSelector(state => !!state.product.wishLists.find(item => item.id === pId));

        const handleAddToCart = () => {
            dispatch(addToCart(singleProductCard))
        }

        const handleAddToWishList = () => {
            dispatch(addToWishlist(singleProductCard))
        }

        const categoryFilter = data.filter(item => item.category === category)

        return (
            <div>
                <div className='text-white text-center space-y-6 bg-purple-500 pb-44 pt-10'>

                    <h1 className='text-5xl font-bold'>Product Details</h1>
                    <p className='font-xl'>Explore the latest gadgets that will take your experience to the next level. From smart devices to <br /> the coolest accessories, we have it all!</p>
                </div>

                <div className="hero bg-white w-3/5 mx-auto rounded-3xl py-5 relative bottom-36">
                    <div className="hero-content flex-col lg:flex-row gap-10">
                        <img
                            src={product_image}
                            className="rounded-2xl shadow-2xl w-1/3" />
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
                <RelatedProducts categoryFilter={categoryFilter}></RelatedProducts>
            </div>
        );
    };

export default ProductDetailsPage
    ;