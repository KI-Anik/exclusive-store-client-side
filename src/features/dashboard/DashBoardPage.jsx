import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CardList from './CardList';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, moveToCartFromWishList, removeFromCart, removeFromWishlist, sortByPrice } from '../products/productSlice';

const DashBoardPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const { carts, wishLists } = useSelector(state => state.product)
    console.log('cart', carts);

    // state for handle tab open by default 
    const [tabIndex, setTabIndex] = useState(location.state?.tab === 'wish-list' ? 1 : 0)
    const [Modal, setModal] = useState(false)

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
        dispatch(clearCart())
        setModal(true);
    };

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
            {Modal && (
                <div className="modal modal-open text-center">
                    <div className="modal-box flex flex-col justify-center items-center space-y-3">
                        <img src="/assets/Group.png" alt="" />
                        <h3 className="font-bold text-lg">Successfully Paid!</h3>
                        <p className="py-4">Your payment was successful, and your cart is now empty.</p>
                        <div className="modal-action">
                            <button className="btn btn-primary" onClick={() => {
                                setModal(false)
                                navigate('/')
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