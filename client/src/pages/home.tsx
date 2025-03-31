import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to ClaimsTracker</h1>
      <p style={styles.subtext}>
        Easily track and manage your insurance claims.
      </p>
      <div style={styles.buttonContainer}>
        <Link to="/login" style={styles.button}>Login</Link>
        <Link to="/register" style={styles.button}>Register</Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: '2rem',
    textAlign: 'center' as const,
  },
  heading: {
    fontSize: '2.5rem',
    color: '#333',
  },
  subtext: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '2rem',
  },
  buttonContainer: {
    display: 'flex',
    gap: '1rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    textDecoration: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '6px',
  },
};

export default Home;
