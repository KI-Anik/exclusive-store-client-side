import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaBox, FaCheckCircle, FaClipboardList, FaShippingFast, FaTimesCircle } from 'react-icons/fa';
import { useGetOrdersQuery } from './api/orderApi';


const OrderPage = () => {
    const { user } = useSelector(state => state.auth);
    // Skip the query if the user is not logged in
    // Provide a default empty array to `data` to avoid checking for it later.
    const { data: orders = [], isLoading, isError, error } = useGetOrdersQuery(undefined, {
        skip: !user,
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-460px)]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[calc(100vh-460px)] text-center text-red-500">
                <h2 className='text-3xl font-bold'>Error Fetching Orders</h2>
                <p>{error?.data?.message || 'An unexpected error occurred.'}</p>
            </div>
        );
    }

    if (!isLoading && orders.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[calc(100vh-460px)] text-center">
                <h2 className='text-3xl font-bold'>No Orders Found</h2>
                <p>You haven't placed any orders yet.</p>
                <Link to="/allproducts" className="btn btn-primary mt-4">Start Shopping</Link>
            </div>
        );
    }

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return <FaClipboardList className="text-warning" />;
            case 'processing':
                return <FaBox className="text-info" />;
            case 'shipped':
                return <FaShippingFast className="text-primary" />;
            case 'delivered':
                return <FaCheckCircle className="text-success" />;
            case 'cancelled':
                return <FaTimesCircle className="text-error" />;
            default:
                return <FaClipboardList />;
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold text-center mb-8">My Orders</h1>
            <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order._id} className="card lg:card-side bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                                <div className="flex-1">
                                    <h2 className="card-title text-lg">Order ID: <span className="font-mono text-sm">{order._id}</span></h2>
                                    <p className="text-sm text-gray-500">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="text-left sm:text-right">
                                    <p className="font-bold text-xl">${order.totalAmount.toFixed(2)}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        {getStatusIcon(order.status)}
                                        <span className="font-semibold">{order.status}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="divider my-2"></div>

                            <div className="space-y-4 mb-4">
                                <h3 className="font-semibold">Items Ordered</h3>
                                {order.items.map((item) => (
                                    <div key={item.productId._id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-base-200 transition-colors">
                                        <Link to={`/details/${item.productId._id}`} className="avatar">
                                            <div className="w-16 rounded">
                                                <img src={item.productId.product_image} alt={item.productId.product_title} />
                                            </div>
                                        </Link>
                                        <div className="flex-grow min-w-0">
                                            <Link to={`/details/${item.productId._id}`} className="font-semibold truncate hover:underline">{item.productId.product_title}</Link>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="card-actions justify-end">
                                <Link to={`/order/${order._id}`}>
                                    <button className="btn btn-outline btn-primary">Track Order</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderPage;