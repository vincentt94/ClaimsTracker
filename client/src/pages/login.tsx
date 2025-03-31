import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import Button from '../components/button';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';

const Login: React.FC = () => {
  const navigate = useNavigate();

  //  Redirect if already logged in
  if (localStorage.getItem('token')) {
    return <Navigate to="/dashboard" />;
  }

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [loginMutation] = useMutation(LOGIN);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const { data } = await loginMutation({ variables: formData });

      const token = data.login.token;
      const role = data.login.user.role;

      //  Store token and role
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      //  Redirect based on role
      navigate(role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <Button text="Login" type="submit" />
      </form>
    </div>
  );
};

export default Login;
