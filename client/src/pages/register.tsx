import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../utils/mutations';
import Button from '../components/button';
import { useAuth } from '../components/authcontext';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [registerMutation] = useMutation(REGISTER);

  //  Redirect if already logged in
  if (auth?.isLoggedIn) {
    return <Navigate to={auth.isAdmin ? '/admin' : '/dashboard'} replace />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const { data } = await registerMutation({ variables: formData });
      const token = data.register.token;
      const role = data.register.user.role;

      auth?.login(token, role); 
      navigate(role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <br />
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
        <Button text="Register" type="submit" />
      </form>
    </div>
  );
};

export default Register;
