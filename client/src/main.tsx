import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router';
import { ThemeProvider } from './providers/ThemeProvider';
import Home from './pages/Home';
import CodeExplainForm from './component/forms/CodeExplainForm';
import Summarizer from './pages/Summarizer';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import Subscription from './pages/Subscription';
import CodeRefactorForm from './component/forms/CodeRefactorForm';
import ArticleGeneratorForm from './component/forms/ArticleGeneratorForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
    <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
