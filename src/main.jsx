import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './components/layout/Root';
import Error from './components/ui/Error';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './app/store';
import HomePage from './components/pages/HomePage';
import AllProductsPage from './components/pages/AllProductsPage';
import MyOrderPage from './components/pages/MyOrderPage';
import DashBoardPage from './components/pages/DashBoardPage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import ProductDetailsPage from './components/product/ProductDetailsPage';


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
        element: <ProductDetailsPage/>
      },
      {
        path: '/allproducts',
        element: <AllProductsPage/>,

      },
      {
        path: '/dashboard',
        element: <DashBoardPage></DashBoardPage>,
      },
      {
        path: '/order',
        element: <MyOrderPage/>
      },
      {
        path: '/auth/login',
        element: <LoginPage/>
      },
      {
        path: '/auth/register',
        element: <RegisterPage></RegisterPage>
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
