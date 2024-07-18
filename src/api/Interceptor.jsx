import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
  
    if (token && token != undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
