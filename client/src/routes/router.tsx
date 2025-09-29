import { createBrowserRouter } from 'react-router';
import RootLayout from '../layout/RootLayout';
import ServiceLayout from '../layout/ServiceLayout';
import Home from '../pages/Home';
import CodeExplainForm from '../component/forms/CodeExplainForm';
import Summarizer from '../pages/Summarizer';
import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/Login';
import Subscription from '../pages/Subscription';
import CodeRefactorForm from '../component/forms/CodeRefactorForm';
import ArticleGeneratorForm from '../component/forms/ArticleGeneratorForm';
import PrivateRoute from './PrivateRoute';
import ServicesPage from '../pages/ServicesPage';



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