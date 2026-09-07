import axios from 'axios';

// INFRAESTRUCTURA: Cosas externas (Librerías, HTTP, LocalStorage)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response.data.data ? response.data.data : response.data,
  (error) => {
    return Promise.reject(error);
  }
);
