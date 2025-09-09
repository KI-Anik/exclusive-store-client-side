import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {  RouterProvider} from "react-router-dom";
import './index.css'
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './app/store';
import AuthProvider from './provider/AuthProvider';
import router from './routes/Router';




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </AuthProvider>
    <Toaster />
  </StrictMode>,
)
