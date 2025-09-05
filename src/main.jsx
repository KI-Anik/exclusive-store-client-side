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
import OrderPage from './features/orders/OrderPage';
import DashBoardPage from './components/dashboard/DashBoardPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboardHome from './components/admin/pages/AdminDashboardHome';
import ManageProducts from './components/admin/pages/ManageProducts';
import ManageUsers from './components/admin/pages/ManageUsers';
import ManageOrders from './components/admin/pages/ManageOrders';
import LoginPage from './components/auth/LoginPage';
import PrivateRoute from './components/auth/PrivateRoute';
import RegistrationPage from './components/auth/RegistrationPage';


const router = createBrowserRouter([

  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [

      {
        path: '/',
        element: <HomePage></HomePage>,
      },
      {
        path: '/details/:id',
        element: <ProductDetailsPage />
      },
      {
        path: '/allproducts',
        element: <AllProductsPage />,

      },
      {
        path: '/dashboard',
        element: <DashBoardPage></DashBoardPage>,
      },
      {
        path: '/order',
        element: <OrderPage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <RegistrationPage />
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
            element: <AdminDashboardHome />
          },
          {
            path: 'manage-products',
            element: <ManageProducts />
          },
          {
            path: 'manage-users',
            element: <ManageUsers />,
          },
          {
            path: 'manage-orders',
            element: <ManageOrders />,
            loader: () => fetch('/orders.json')
          }
        ]
      }
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
