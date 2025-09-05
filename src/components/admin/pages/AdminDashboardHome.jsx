import React, { useEffect, useState } from 'react';
import { useGetProductsQuery } from '../../../features/products/api/productApi';
import { useGetUsersQuery } from '../../../features/users/api/userApi';

const AdminDashboardHome = () => {
    const { data: usersData, isLoading: isLoadingUsers } = useGetUsersQuery();
    // A dedicated count endpoint would be better than fetching all products to get the length.
    const { data: productsData, isLoading: isLoadingProducts } = useGetProductsQuery({ limit: 999 });
    const [orders, setOrders] = useState([]);
    const [isLoadingOrders, setIsLoadingOrders] = useState(true);

    useEffect(() => {
        fetch('/orders.json')
            .then((res) => res.json())
            .then((data) => setOrders(data))
            .catch(console.error)
            .finally(() => setIsLoadingOrders(false));
    }, []);

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
            <p className="mb-8">Welcome to the admin panel. Use the sidebar to manage products, users, and orders.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Total Products</h2>
                        <p>Manage all products in the store.</p>
                        <div className="card-actions justify-end">
                            {isLoadingProducts ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                <div className="stat-value">{productsData?.products?.length ?? 0}</div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Total Users</h2>
                        <p>View and manage user accounts.</p>
                        <div className="card-actions justify-end">
                            {isLoadingUsers ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                <div className="stat-value">{usersData?.meta?.total ?? 0}</div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Total Orders</h2>
                        <p>Track and manage customer orders.</p>
                        <div className="card-actions justify-end">
                            {isLoadingOrders ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                <div className="stat-value">{orders.length}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AdminDashboardHome;