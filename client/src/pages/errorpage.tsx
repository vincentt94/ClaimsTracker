import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.subtext}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <button onClick={() => navigate('/login')} style={styles.button}>
        Go to Login
      </button>
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
    backgroundColor: '#f8f9fa',
    textAlign: 'center' as const,
    padding: '2rem',
  },
  heading: {
    fontSize: '3rem',
    color: '#343a40',
  },
  subtext: {
    fontSize: '1.2rem',
    margin: '1rem 0',
    color: '#6c757d',
  },
  button: {
    padding: '0.6rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default ErrorPage;
