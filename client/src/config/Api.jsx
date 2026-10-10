import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4505";

const api = axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true,
});

export default api;