import { createBrowserRouter } from 'react-router';
import RootLayout from '../layout/RootLayout';
import ServiceLayout from '../layout/ServiceLayout';
import Home from '../pages/Home';
import CodeExplainForm from '../component/forms/CodeExplainForm';
import {
  ErrorPage,
  Summarizer,
  Login,
  Subscription,
  ServicesPage,
} from '../pages';
import CodeRefactorForm from '../component/forms/CodeRefactorForm';
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
      { path: 'code-explainer', element: <CodeExplainForm /> },
      { path: 'doc-summarizer', element: <Summarizer /> },
      { path: 'code-refactor', element: <CodeRefactorForm /> },
      { path: 'article-generator', element: <ServicesPage /> },
    ],
  },
]);


export default router