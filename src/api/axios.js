import axios from "axios";

const api = axios.create({
    baseURL: "fastapi-blog-backend-production.up.railway.app",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    console.log("Interceptor token:", token);   // DEBUG LINE
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
