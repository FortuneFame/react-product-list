import { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import App from './App';
import LoaderPage from './pages/LoaderPage/LoaderPage';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const CommentsPage = lazy(() => import('./pages/CommentsPage'));
const UserPage = lazy(() => import('./pages/UserPage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <LoginPage />,
      },
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'comments/:id',
        element: <CommentsPage />,
      },
      {
        path: 'user/:id',
        element: <UserPage />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ]
  }])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Suspense fallback={<LoaderPage />}>
    <RouterProvider router={router} />
  </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
