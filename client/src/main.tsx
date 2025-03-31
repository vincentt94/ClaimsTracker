// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import App from './app';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import AdminDashboard from './components/admindashboard';
import ClaimForm from './components/claimform';
import ErrorPage from './pages/errorpage';
import Home from './pages/home';

// ------------------------
// Apollo Client Setup
// ------------------------

const httpLink = createHttpLink({
  uri: '/graphql', 
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// ------------------------
// Auth-Protected Routes
// ------------------------

const ProtectedRoute = ({ element, allowedRoles }: { element: JSX.Element; allowedRoles: string[] }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token || !allowedRoles.includes(role || '')) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

// ------------------------
// Router Setup
// ------------------------

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute element={<Dashboard />} allowedRoles={['user']} />
        ),
      },
      {
        path: 'submit-claim',
        element: (
          <ProtectedRoute element={<ClaimForm />} allowedRoles={['user']} />
        ),
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute element={<AdminDashboard />} allowedRoles={['admin']} />
        ),
      },
      {
        path: '*',
        element: <Navigate to="/login" replace />,
      },
    ],
  },
]);

// ------------------------
// Render App
// ------------------------

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ApolloProvider client={client}>
          <RouterProvider router={router} />
      </ApolloProvider>
    </React.StrictMode>
  );
}
