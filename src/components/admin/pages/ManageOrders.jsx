import React from 'react';
import { useLoaderData } from 'react-router-dom';

const ManageOrders = () => {
    const orders = useLoaderData();

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mb-4">Manage Orders</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <th>{order.id}</th>
                                <td>{order.customer_name}</td>
                                <td>{order.date}</td>
                                <td>${order.total}</td>
                                <td><span className="badge badge-ghost">{order.status}</span></td>
                                <td className='space-x-2'>
                                    <button className="btn btn-sm btn-info">View</button>
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