// src/utils/axiosConfig.js
import axios from 'axios';

// Create an instance of axios
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, // Include cookies with each request
});

export default apiClient;
