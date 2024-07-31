import React, { useState } from 'react';
import apiClient from '../utils/axiosConfig';
//import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const apiBaseUrl = 'http://localhost:3000';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post(`${apiBaseUrl}/login`, { email, password });
     
      alert('Login successful!');
      navigate('/products')
    } catch (err) {
      
      console.error(err);
      alert('Login failed.');
      if (err.response && err.response.status === 401){
        navigate('/register');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
