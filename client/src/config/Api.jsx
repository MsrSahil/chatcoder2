import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:4505";

const api = axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true,
});

// Request interceptor to automatically attach Authorization header
api.interceptors.request.use(
  (config) => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 Unauthorized cleanly
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const url = error.config?.url || "";
      const isAuthRoute =
        url.includes("/auth/login") ||
        url.includes("/auth/sendOtpLogin") ||
        url.includes("/auth/register") ||
        url.includes("/auth/googleLogin");

      if (!isAuthRoute) {
        // Clear stale session
        sessionStorage.removeItem("ChatUser");
        sessionStorage.removeItem("token");
        localStorage.removeItem("token");
        sessionStorage.removeItem("currentChat");
      }
    }
    return Promise.reject(error);
  }
);

export default api;