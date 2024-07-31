import React, { useState } from 'react';
import apiClient from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
const apiBaseUrl = 'http://localhost:3000';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post(`${apiBaseUrl}/register`, { name, email, password });
      console.log(res)
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Registration failed.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
