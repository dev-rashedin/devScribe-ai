import { createBrowserRouter } from 'react-router';
import RootLayout from '../layout/RootLayout';
import ServiceLayout from '../layout/ServiceLayout';
import {
  Home,
  ErrorPage,
  Login,
  Subscription,
  ServicesPage,
} from '../pages';
import PrivateRoute from './PrivateRoute';



const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'subscription', element: <Subscription /> },
      { path: 'signin', element: <Login /> },
      { path: 'signup', element: <Login /> },
    ],
  },
  {
    path: '/services',
    element: (
      <PrivateRoute>
        <ServiceLayout />
      </PrivateRoute>
    ),
    children: [
      { path: 'code-explainer', element: <ServicesPage/> },
      { path: 'doc-summarizer', element: <ServicesPage /> },
      { path: 'code-refactor', element: <ServicesPage/> },
      { path: 'article-generator', element: <ServicesPage /> },
    ],
  },
]);


export default router