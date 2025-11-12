import apiClient from './axios'

export const getUser = () => {
  return apiClient.get(`/admin/dashboard/users/`)
}

export const deleteUser = id => {
  return apiClient.delete(`/admin/dashboard/users/${id}`)
}

export const getUrl = () => {
  return apiClient.get(`/url`)
}

export const deleteUrl = id => {
  return apiClient.delete(`/url/${id}`)
}
export default {
  getUser,
  deleteUser,
  getUrl,
  deleteUrl
}
