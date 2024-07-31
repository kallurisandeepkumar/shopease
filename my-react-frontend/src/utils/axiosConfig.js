// src/utils/axiosConfig.js
import axios from 'axios';

// Create an instance of axios
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_UR,
  withCredentials: true, // Include cookies with each request
});

export default apiClient;
