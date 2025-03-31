import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1 className="home-heading">Welcome to ClaimsTracker</h1>
      <p className="home-subtext">
        Easily track and manage your insurance claims.
      </p>
      <div className="home-button-group">
        <Link to="/login" className="home-button">Login</Link>
        <Link to="/register" className="home-button">Register</Link>
      </div>
    </div>
  );
};

export default Home;
