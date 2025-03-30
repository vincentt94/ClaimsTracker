import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import App from './app';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import AdminDashboard from './components/admindashboard';
import ClaimForm from './components/claimform';
import ErrorPage from './pages/errorpage'; // need to make errorpage

const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />, // optional
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        path: 'dashboard',
        element: token && role === 'user' ? <Dashboard /> : <Navigate to="/login" replace />,
      },
      {
        path: 'submit-claim',
        element: token && role === 'user' ? <ClaimForm /> : <Navigate to="/login" replace />,
      },
      {
        path: 'admin',
        element: token && role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" replace />,
      },
      {
        path: '*',
        element: <Navigate to="/login" replace />,
      },
    ],
  },
]);

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
}
