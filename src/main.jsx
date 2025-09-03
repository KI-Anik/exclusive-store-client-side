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
import { ProductDetails } from './features/products';
import HomePage from './components/Home/HomePage';
import AllProductsPage from './features/products/AllProductsPage';
import OrderPage from './features/orders/OrderPage';
import DashBoardPage from './features/dashboard/DashBoardPage';


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
        loader: () => fetch(`/fakeData.json`),
        element: <ProductDetails/>
      },
      {
        path: '/allproducts',
        loader: ()=> fetch('/categories.json'),
        element: <AllProductsPage/>,

      },
      {
        path: '/dashboard',
        loader: () => fetch('/fakeData.json'),
        element: <DashBoardPage></DashBoardPage>,
      },
      {
        path: '/order',
        element: <OrderPage/>
      }
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
    <Toaster/>
  </StrictMode>,
)
