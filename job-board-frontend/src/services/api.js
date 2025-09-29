import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.message);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const fetchJobs = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.category) params.append('category', filters.category);
  if (filters.location) params.append('location', filters.location);
  if (filters.experience_level) params.append('experience_level', filters.experience_level);

  const response = await apiClient.get(`/jobs/?${params.toString()}`);
  return response.data;
};

export const fetchJobById = async (id) => {
  const response = await apiClient.get(`/jobs/${id}/`);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await apiClient.get('/categories/');
  return response.data;
};

export const fetchLocations = async () => {
  const response = await apiClient.get('/locations/');
  return response.data;
};

export const submitApplication = async (applicationData) => {
  const response = await apiClient.post('/applications/', applicationData);
  return response.data;
};

export default apiClient;
