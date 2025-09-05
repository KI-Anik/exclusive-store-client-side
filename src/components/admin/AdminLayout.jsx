import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center p-4">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                <Outlet />
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <li className='text-2xl font-bold p-4'>Admin Panel</li>
                    <li><NavLink to="/admin" end>Dashboard</NavLink></li>
                    <li><NavLink to="/admin/manage-products">Manage Products</NavLink></li>
                    <li><NavLink to="/admin/manage-users">Manage Users</NavLink></li>
                    <li><NavLink to="/admin/manage-orders">Manage Orders</NavLink></li>
                    <div className="divider"></div>
                    <li><NavLink to="/">Back to Store</NavLink></li>
                </ul>
            </div>
        </div>
    );
};

export default AdminLayout;