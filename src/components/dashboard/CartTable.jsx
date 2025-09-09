import { FaRegHeart, FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { updateQuantity } from '../../app/slice/productSlice';

const CardList = ({ item, handleRemove, moveToCart }) => {

    const { id, product_image, product_title, price, description, quantity = 1, availability } = item
    const dispatch = useDispatch()

    const handleIncrement = () => {
        dispatch(updateQuantity({ id, quantity: quantity + 1 }))
    };
    const handleDecrement = () => {
        if (quantity > 1) {
            dispatch(updateQuantity({ id, quantity: quantity - 1 }))
        }
    };

    const totalPrice = price * quantity;

    return (
        <div className="py-2 bg-white">
            <div className="p-5 grid grid-cols-4 items-center justify-items-center">
                <img
                    src={product_image}
                    className="rounded-2xl shadow-2xl " />

                <div className='space-y-2'>
                    <h1 className="text-xl font-bold">{product_title}</h1>
                    <p>
                        {description}
                    </p>
                    {
                        availability ? 
                    <p>Price: ${price} X {quantity} = ${totalPrice}</p>
                    :
                    <p>Price : ${price}</p>

                    }
                </div>
                {/* delete button */}
                <button onClick={handleRemove} className='mx-auto'><FaTrashAlt></FaTrashAlt></button>

                {/* updateQuantity button available only for 'cart' tab */}
                {availability ?
                    (moveToCart ? (
                        <button onClick={moveToCart} className='btn bg-purple-500 mx-auto mt-3'>Add To Cart</button>
                    ) :
                        <div className='flex gap-4 items-center'>
                            <button onClick={handleDecrement} className='btn'>-</button>
                            <p>{quantity}</p>
                            <button onClick={handleIncrement} className='btn'>+</button>
                        </div>) :
                    (<div className='text-center'>
                        <p className='text-red-500 text-xl'>stock out</p>
                    </div>)
                }


            </div>
        </div>
    );
};

export default CardList;