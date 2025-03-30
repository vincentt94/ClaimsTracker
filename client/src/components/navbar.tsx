import React from 'react';
import { Link } from 'react-router-dom';


//navbar for the user to navigate 
const Navbar: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem('token'); // Simple token check for demo
  const isAdmin = localStorage.getItem('role') === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login';
  };

  return (
    <nav>
      <Link to="/" >ClaimsTracker</Link>
      <div>
        {isLoggedIn && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            {isAdmin && <Link to="/admin" >Admin Panel</Link>}
            <button onClick={handleLogout} >Logout</button>
          </>
        )}
        {!isLoggedIn && (
          <>
            <Link to="/login" >Login</Link>
            <Link to="/register" >Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
