import './index.css'
import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './components/Root/Root';
import Error from './components/ui/Error';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { AllProductsPage, ProductDetailsPage } from './features/products';
import HomePage from './components/Home/HomePage';
import { OrderPage, SingleOrderPage } from './features/orders';
import DashBoardPage from './components/dashboard/DashBoardPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboardHome from './components/admin/pages/AdminDashboardHome';
import ManageProducts from './components/admin/pages/ManageProducts';
import ManageUsers from './components/admin/pages/ManageUsers';
import ManageOrders from './components/admin/pages/ManageOrders';
import LoginPage from './components/auth/LoginPage';
import PrivateRoute from './components/auth/PrivateRoute';
import RegistrationPage from './components/auth/RegistrationPage';
import PersistLogin from './components/auth/PersistLogin';
import UserRoute from './components/auth/UserRoute';


const router = createBrowserRouter([

  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [

      // Public routes
      {
        path: '/',
        element: <HomePage></HomePage>,
      },
      {
        path: '/details/:id',
        element: <ProductDetailsPage />,
      },
      {
        path: '/allproducts',
        element: <AllProductsPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegistrationPage />,
      },

      // Protected routes wrapped with PersistLogin
      {
        element: <PersistLogin />,
        children: [
          {
            path: '/dashboard',
            element: <DashBoardPage />,
          },
          {
            path: '/order',
            element: (
              <UserRoute>
                <OrderPage />
              </UserRoute>
            ),
          },
          {
            path: '/order/:id',
            element: (
              <UserRoute>
                <SingleOrderPage />
              </UserRoute>
            ),
          },
          {
            path: '/admin',
            element: (
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            ),
            children: [
              {
                index: true,
                element: <AdminDashboardHome />,
              },
              {
                path: 'manage-products',
                element: <ManageProducts />,
              },
              {
                path: 'manage-users',
                element: <ManageUsers />,
              },
              {
                path: 'manage-orders',
                element: <ManageOrders />,
              },
            ],
          },
        ],
      },
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    <Toaster />
  </StrictMode>,
)
