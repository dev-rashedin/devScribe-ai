import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import  ThemeProvider  from './providers/ThemeProvider';
import AuthProvider from './providers/AuthProvider';
import router from './routes/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <HelmetProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </HelmetProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
