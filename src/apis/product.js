import apiClient from './axios'

export const getProducts = () => apiClient.get('/products')
export const getProduct = id => apiClient.get(`/products/${id}`)
