// client/src/services/api.js
import axios from 'axios';

// Base URL for the API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Set base URL
axios.defaults.baseURL = API_URL;

// API service object with methods for interacting with the backend
const apiService = {
  // Scholarship related API calls
  scholarships: {
    getAll: async () => {
      try {
        const response = await axios.get('/scholarships');
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    
    getById: async (id) => {
      try {
        const response = await axios.get(`/scholarships/${id}`);
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    
    getRecommended: async () => {
      try {
        const response = await axios.get('/scholarships/recommended');
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    
    search: async (query) => {
      try {
        const response = await axios.get(`/scholarships/search?q=${query}`);
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    }
  },
  
  // User profile related API calls
  profile: {
    get: async () => {
      try {
        const response = await axios.get('/api/userProfile');
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    
    create: async (profileData) => {
      try {
        const response = await axios.post('/api/userProfile', profileData);
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    
    update: async (profileData) => {
      try {
        const response = await axios.put('/api/userProfile', profileData);
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    }
  }
};

export default apiService;