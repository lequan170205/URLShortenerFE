import apiClient from './axios'

export const getUser = id => apiClient.get(`/users/${id}`)
export const createUser = data => apiClient.post('/users', data)
export const updateUser = (id, data) => apiClient.put(`/users/${id}`, data)
