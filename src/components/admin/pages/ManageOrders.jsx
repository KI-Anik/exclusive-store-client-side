import React from 'react';
import toast from 'react-hot-toast';
import { useGetOrdersQuery, useUpdateOrderStatusMutation } from '../../../features/orders/api/orderApi';

// This should match the enum on the backend
const ORDER_STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const ManageOrders = () => {
    const { data: orders, isLoading, isError, error } = useGetOrdersQuery();
    const [updateOrderStatus, { isLoading: isUpdating }] = useUpdateOrderStatusMutation();

    const handleStatusChange = async (orderId, newStatus) => {
        const originalStatus = orders.find(o => o._id === orderId)?.status;
        if (newStatus === originalStatus) return;

        const toastId = toast.loading('Updating order status...');
        try {
            await updateOrderStatus({ orderId, status: newStatus }).unwrap();
            toast.success('Order status updated successfully!', { id: toastId });
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to update status.', { id: toastId });
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center py-10 text-red-500">
                <h2 className='text-2xl font-bold'>Error Fetching Orders</h2>
                <p>{error?.data?.message || 'An unexpected error occurred.'}</p>
            </div>
        );
    }

    if (!orders || orders.length === 0) {
        return <div className="text-center py-10"><h2 className='text-2xl font-bold'>No orders found.</h2></div>;
    }

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>
            <div className="overflow-x-auto">
                <table className="table w-full table-zebra">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id} className="hover">
                                <td className="font-mono text-xs">{order._id}</td>
                                <td>
                                    <div className="font-bold">{order.userId.name}</div>
                                    <div className="text-sm opacity-50">{order.userId.email}</div>
                                </td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>${order.totalAmount.toFixed(2)}</td>
                                <td>
                                    <select
                                        className="select select-bordered select-sm w-full max-w-xs"
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        disabled={isUpdating}
                                    >
                                        {ORDER_STATUSES.map(status => (
                                            <option key={status} value={status}>
                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageOrders;