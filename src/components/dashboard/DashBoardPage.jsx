import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CardList from './CardList';
import {  useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, moveToCartFromWishList, removeFromCart, removeFromWishlist, sortByPrice } from '../../features/products/productSlice';
import { useCreateOrderMutation } from '../../features/orders/api/orderApi'; // Corrected path if needed, but hook name is from the right file now
import { openPurchaseModal, closePurchaseModal } from '../../features/orders/orderSlice';
import toast from 'react-hot-toast';
import { FaTimes } from 'react-icons/fa';

const DashBoardPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch();

    const { carts, wishLists } = useSelector(state => state.product);
    const { token, user } = useSelector(state => state.auth);
    const { isPurchaseModalOpen } = useSelector(state => state.order);

    const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();

    // state for handle tab open by default 
    const [tabIndex, setTabIndex] = useState(location.state?.tab === 'wish-list' ? 1 : 0)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [shippingAddress, setShippingAddress] = useState(user?.address || ''); // Pre-fill if user has an address

    // Open the purchase modal automatically if the user was redirected from the login page
    useEffect(() => {
        if (location.state?.from?.pathname === '/dashboard' && token && carts.length > 0) {
            dispatch(openPurchaseModal());
        }
    }, [location.state, token, carts.length, dispatch]);

    const totalPrice = carts.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

    // remove item 
    const handleRemove = (id, type) => {
        if (type === 'cart') {
            dispatch(removeFromCart(id))
        } else {
            dispatch(removeFromWishlist(id))
        }
    };

    const moveToCart = item => {
        dispatch(moveToCartFromWishList(item))
    }

    const handleSortByPrice = () => {
        dispatch(sortByPrice())
    };

    const handlePurchase = () => {
        if (token) {
            // User is logged in, open the confirmation modal
            dispatch(openPurchaseModal());
        } else {
            // User is not logged in, redirect to login page, preserving the current location
            navigate('/login', { state: { from: location } });
        }
    };

    const handleConfirmPurchase = async () => {
        const orderData = {
            // The server gets the userId from the authenticated request
            items: carts.map(item => ({ productId: item.id, quantity: item.quantity })),
            // The server calculates the total amount to prevent price manipulation
            shippingAddress: shippingAddress, // Use the state for shipping address
        };

        try {
            await createOrder(orderData).unwrap();
            dispatch(closePurchaseModal());
            dispatch(clearCart());
            setShowSuccessModal(true);
            toast.success('Order placed successfully!');
        } catch (error) {
            // The server-side fix now provides clearer error messages
            const errorMessage = error?.data?.message || 'Failed to place order. Please try again.';
            toast.error(errorMessage);
            dispatch(closePurchaseModal());
        }
    };

    const shippingCharge = 100;
    const totalCharge = totalPrice + shippingCharge;

    return (
        <div>
            <div className='text-center space-y-6 bg-purple-500 pb-12 pt-10'>
                <h1 className='text-5xl font-bold'>Dashboard</h1>
                <p className='font-xl'>Explore the latest gadgets that will take your experience to the next level. From smart devices to <br /> the coolest accessories, we have it all!</p>
            </div>

            <div className='flex px-5 py-2 justify-end items-center gap-10 '>
                {/* appears only when cart tab is open*/}
                {
                    tabIndex === 0 && carts?.length > 0 &&
                    (<>
                        <h3 className='bg-green-500 text-white p-3 rounded-md'>Total Price : ${totalPrice} </h3>
                        <button onClick={handlePurchase} className='btn hover:bg-green-500 border border-emerald-400'>Purchase</button>
                    </>)
                }
                {/* appears only when dashboard has value more than 1 */}
                {
                    (carts?.length > 1 || wishLists?.length > 1) &&
                    <button onClick={handleSortByPrice} className='btn hover:bg-lime-400 border-emerald-400'>Sort By price</button>
                }
                
            </div>

            {/* wishlist tab will open by-default, after click on 'view wishlist' */}
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList >
                    <Tab>Cart</Tab>
                    <Tab>Wishlists</Tab>
                </TabList>

                <TabPanel>
                    <div className='py-4'>
                        {
                            carts.map(item => <CardList
                                key={item.id}
                                item={item}
                                handleRemove={() => handleRemove(item.id, 'cart')}
                            ></CardList>)
                        }
                    </div>
                    {
                        carts.length == 0 && <h1 className='text-5xl text-center p-5'>No content</h1>
                    }
                </TabPanel>

                <TabPanel>
                    <div className='py-4'>
                        {
                            wishLists.map(item => <CardList
                                key={item.id}
                                item={item}
                                handleRemove={() => handleRemove(item.id, 'wish-list')}
                                moveToCart={() => moveToCart(item)}
                            ></CardList>)
                        }
                    </div>
                    {
                        wishLists.length == 0 && <h1 className='text-5xl text-center p-5'>No content</h1>
                    }
                </TabPanel>
            </Tabs>

            {/* modal start */}
            {isPurchaseModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box relative">
                        <button
                            className="btn btn-sm btn-circle absolute right-2 top-2"
                            onClick={() => dispatch(closePurchaseModal())}
                        >
                            <FaTimes />
                        </button>
                        <h3 className="font-bold text-lg text-center mb-4">Confirm Your Purchase</h3>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Shipping Address</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered h-24"
                                placeholder="Enter your full shipping address"
                                value={shippingAddress}
                                onChange={(e) => setShippingAddress(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="space-y-2">
                            <p className="flex justify-between"><span>Product Price:</span> <span>${totalPrice.toFixed(2)}</span></p>
                            <p className="flex justify-between"><span>Shipping Charge:</span> <span>${shippingCharge.toFixed(2)}</span></p>
                            <hr />
                            <p className="flex justify-between font-bold"><span>Total Charge:</span> <span>${totalCharge.toFixed(2)}</span></p>
                        </div>
                        <div className="modal-action">
                            <button className="btn" onClick={() => dispatch(closePurchaseModal())}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleConfirmPurchase} disabled={isCreatingOrder || !shippingAddress.trim()}>
                                {isCreatingOrder ? <span className="loading loading-spinner"></span> : 'Confirm'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="modal modal-open text-center">
                    <div className="modal-box flex flex-col justify-center items-center space-y-3">
                        <img src="/assets/Group.png" alt="" />
                        <h3 className="font-bold text-lg">Order Placed Successfully!</h3>
                        <p className="py-4">Thank you for your purchase. Your order is being processed.</p>
                        <div className="modal-action">
                            <button className="btn btn-primary" onClick={() => {
                                setShowSuccessModal(false)
                                navigate('/order') // Navigate to order history page
                            }}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* modal end */}
        </div>
    );
};

export default DashBoardPage;