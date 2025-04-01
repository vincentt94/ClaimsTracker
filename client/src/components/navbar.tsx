import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/authcontext';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  if (!auth) return null; // safeguard

  const { isLoggedIn, isAdmin, logout } = auth;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/">ClaimsTracker</Link>

      <div>
        {isLoggedIn ? (
          <>
            {isAdmin ? (
              <Link to="/admin">Admin Panel</Link>
            ) : (
              <>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/submit-claim">Submit Claim</Link>
              </>
            )}
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
