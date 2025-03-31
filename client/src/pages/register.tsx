import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import Button from '../components/button';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../utils/mutations';
import AuthService from '../utils/auth';

const Register: React.FC = () => {
 // const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState<string | null>(null);
  const [registerMutation] = useMutation(REGISTER);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const { data } = await registerMutation({ variables: formData });
      const token = data.register.token;

      AuthService.login(token); // Logs in and redirects to home
    } catch (err) {
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
