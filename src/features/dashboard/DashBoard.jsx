import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { addToStoredList, getStoredList, removeList } from '../../utils/localStorage';
import CardList from '../../features/dashboard/CardList';
import { useLocation, useNavigate } from 'react-router-dom';

const DashBoard = () => {
    const navigate = useNavigate()
    const location=useLocation()

    const [carts, setCarts] = useState([]);
    const [wishLists, setwishLists] = useState([])
    const [tabIndex, setTabIndex]= useState(location.state?.tab === 'wish-list' ? 1 : 0)
    const [totalPrice, setTotalPrice] = useState(0); // update price
    const [Modal, setModal] = useState(false)

    useEffect(() => {
        const storedCarts = getStoredList('cart')
        setCarts(storedCarts)
        setTotalPrice(calculateTotalPrice(storedCarts))
        setwishLists(getStoredList('wish-list'))
    }, [])

    const calculateTotalPrice = (list) => {
        return list.reduce((sum, item)=> sum + item.price, 0)
    };

    const handleRemove = (id, type) => {
        removeList(id, type);

        if (type === 'cart') {
            const updatedCarts = getStoredList('cart')
            setCarts(updatedCarts)
            setTotalPrice(calculateTotalPrice(updatedCarts))
        } else {
            setwishLists(getStoredList('wish-list'))
        }
    };

    const moveToCart = item => {
        handleRemove(item.id, 'wish-list')
        addToStoredList(item, 'cart')
        const updatedCarts = getStoredList('cart')
        setCarts(updatedCarts)
        setTotalPrice(calculateTotalPrice(updatedCarts))
    }

    const handleSortByPrice = () => {
        const sortedCarts = [...carts].sort((a,b) => a.price - b.price);
        setCarts(sortedCarts);
    };

    const handlePurchase = () => {
        setModal(true);
        setCarts([]);
        setTotalPrice(0);
        localStorage.setItem('cart', JSON.stringify([])); // empty all
    };

    return (
        <div>
            <div className='text-center space-y-6 bg-purple-500 pb-12 pt-10'>

                <h1 className='text-5xl font-bold'>Dashboard</h1>
                <p className='font-xl'>Explore the latest gadgets that will take your experience to the next level. From smart devices to <br /> the coolest accessories, we have it all!</p>
            </div>

            <div className='flex px-5 py-2 justify-end items-center gap-10 '>
                <h3 className='bg-green-500 text-white p-3 rounded-md'>Total Price : ${totalPrice} </h3>
                <button onClick={handleSortByPrice} className='btn hover:bg-lime-400'>Sort By price</button>
                <button onClick={handlePurchase} className='btn hover:bg-green-500'>Purchase</button>
            </div>
            <Tabs selectedIndex={tabIndex} onSelect={(index)=> setTabIndex(index)}>
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

        </div>
    );
};

export default DashBoard;