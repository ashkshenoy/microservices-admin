import axios from "axios";
import { useAuth } from "../auth/authStore";

const api = axios.create({
  baseURL: "http://localhost:8080", // Gateway only!
});

// REQUEST INTERCEPTOR → Attach JWT
api.interceptors.request.use(
  (config) => {
    const token = useAuth.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR → Auto logout on 401
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      useAuth.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default api;
