import axios from "axios";

// Use environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
console.log("🔧 API Base URL:", API_URL); // Helpful for debugging

const api = axios.create({
   baseURL: "https://mitransh-678a.onrender.com/api",  // ← Use this
  timeout: 10000,
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('mitransh_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request was made but no response
      console.error('Network Error: No response received');
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);
export default api;