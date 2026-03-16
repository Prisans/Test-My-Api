import axios from 'axios';

const apiUrl = "https://test-my-api-ye9u.onrender.com"

const api = axios.create({
    baseURL: `${apiUrl}/api`,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
