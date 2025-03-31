import React from 'react';
import { Link } from 'react-router-dom';

// Navbar for the user to navigate
const Navbar: React.FC = () => {
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;
  const isAdmin = localStorage.getItem('role') === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login';
  };

  return (
    <nav>
      <Link to="/">ClaimsTracker</Link>

      <div>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/submit-claim">Submit Claim</Link>
            {isAdmin && <Link to="/admin">Admin Panel</Link>}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
