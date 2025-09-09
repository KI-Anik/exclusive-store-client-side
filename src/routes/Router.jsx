import { createBrowserRouter } from 'react-router-dom';
import Root from '../components/layout/Root';
import Error from '../components/ui/Error';
import HomePage from '../components/pages/HomePage';
import AllProductsPage from '../components/pages/AllProductsPage';
import DashBoardPage from '../components/pages/DashBoardPage';
import MyOrderPage from '../components/pages/MyOrderPage';
import LoginPage from '../components/pages/LoginPage';
import RegisterPage from '../components/pages/RegisterPage';
import ProductDetailsPage from '../components/product/ProductDetailsPage';



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
        element: <MyOrderPage />
      },
      {
        path: '/auth/login',
        element: <LoginPage />
      },
      {
        path: '/auth/register',
        element: <RegisterPage></RegisterPage>
      }
    ]
  },
]);

export default router