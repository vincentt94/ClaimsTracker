
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/button';
import { useAuth } from '../utils/auth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // TODO: Replace this with a real login mutation call to your backend
      console.log('Logging in:', formData);

      // Simulated role check
      const isAdmin = formData.email === 'admin@admin.com';

      // Simulated successful login
      const fakeToken = 'your-jwt-token';

      // Save to auth context
      login(fakeToken, isAdmin ? 'admin' : 'user');

      // Redirect
      navigate(isAdmin ? '/admin' : '/dashboard');
    } catch (err) {
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
