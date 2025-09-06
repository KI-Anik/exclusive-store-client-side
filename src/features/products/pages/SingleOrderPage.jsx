import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetOrderQuery } from '../../orders/api/orderApi';
import { FaBox, FaMapMarkerAlt } from 'react-icons/fa';

const SingleOrderPage = () => {
    const { id } = useParams();
    const { data: order, isLoading, isError, error } = useGetOrderQuery(id, {
        skip: !id,
    });

    if (isLoading || !id) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-460px)]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[calc(100vh-460px)] text-center text-red-500">
                <h2 className='text-3xl font-bold'>Error Fetching Order</h2>
                <p>{error?.data?.message || 'The order could not be found or you do not have permission to view it.'}</p>
                <Link to="/order" className="btn btn-primary mt-4">Back to My Orders</Link>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[calc(100vh-460px)] text-center">
                <h2 className='text-3xl font-bold'>Order Not Found</h2>
                <Link to="/order" className="btn btn-primary mt-4">Back to My Orders</Link>
            </div>
        );
    }

    const getStatusSteps = (currentStatus) => {
        const statuses = ['pending', 'processing', 'shipped', 'delivered'];
        const currentIndex = statuses.indexOf(currentStatus.toLowerCase());

        if (currentStatus.toLowerCase() === 'cancelled') {
            return (
                <ul className="steps w-full">
                    <li className="step step-error" data-content="✕">Cancelled</li>
                </ul>
            );
        }

        return (
            <ul className="steps w-full">
                {statuses.map((status, index) => (
                    <li key={status} className={`step ${index <= currentIndex ? 'step-primary' : ''}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 pb-4 border-b border-base-300">
                        <div>
                            <h1 className="text-2xl font-bold">Order Details</h1>
                            <p className="text-sm text-gray-500">Order ID: <span className="font-mono">{order._id}</span></p>
                            <p className="text-sm text-gray-500">Placed on: {new Date(order.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="text-left sm:text-right">
                            <p className="text-sm">Total Amount</p>
                            <p className="font-bold text-2xl text-primary">${order.totalAmount.toFixed(2)}</p>
                        </div>
                    </div>

                    {/* Status Timeline */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Order Status</h2>
                        {getStatusSteps(order.status)}
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Shipping Details */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><FaMapMarkerAlt /> Shipping Address</h2>
                            <div className="p-4 bg-base-200 rounded-lg">
                                <p className="font-semibold">{order.userId.name}</p>
                                <p>{order.userId.email}</p>
                                <p className="mt-2">{order.shippingAddress}</p>
                            </div>
                        </div>

                        {/* Items Ordered */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><FaBox /> Items Ordered ({order.items.length})</h2>
                            <div className="space-y-3">
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
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="card-actions justify-end mt-8 pt-4 border-t border-base-300">
                        <Link to="/order" className="btn btn-ghost">Back to My Orders</Link>
                        <button className="btn btn-primary">Contact Support</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleOrderPage;