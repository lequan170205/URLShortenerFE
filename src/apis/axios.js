// src/apis/axios.js
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api.url-shortener.site',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor thêm token vào mọi request
apiClient.interceptors.request.use(
  config => {
    // Lấy accessToken từ localStorage
    const accessToken = localStorage.getItem('accessToken') // tên key phải đúng
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default apiClient
