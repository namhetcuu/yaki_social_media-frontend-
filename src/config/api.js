import axios from "axios"
export const API_BASE_URL = "http://localhost:8080/yaki"

export const jwtToken = localStorage.getItem("jwt")

export const api = axios.create({baseURL:API_BASE_URL,
    headers:{"Authorization":`Bearer ${jwtToken}`
    ,"Content-Type":"application/json"}})

    // Thêm interceptor để lấy token động
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwt");
    console.log('Interceptor - Token used:', token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        console.warn('Interceptor - No token found in localStorage');
    }
    return config;
});