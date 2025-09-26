import { createBrowserRouter } from 'react-router';

import Home from '../pages/Home';
import CodeExplainForm from '../component/forms/CodeExplainForm';
import Summarizer from '../pages/Summarizer';
import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/Login';
import Subscription from '../pages/Subscription';
import CodeRefactorForm from '../component/forms/CodeRefactorForm';
import ArticleGeneratorForm from '../component/forms/ArticleGeneratorForm';
import RootLayout from '../layout/RootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage/>,
    children: [
      { index: true, element: <Home /> },
      { path: 'subscription', element: <Subscription /> },
      { path: 'signin', element: <Login /> },
      { path: 'signup', element: <Login /> },
      {
        path: 'services', children: [
          { path: 'code-explainer', element: <CodeExplainForm/> },
          { path: 'doc-summarizer', element: <Summarizer /> },
          { path: 'code-refactor', element: <CodeRefactorForm /> },
          {path: 'article-generator', element: <ArticleGeneratorForm/>},
      ]},
    ],
  },
]);


export default router