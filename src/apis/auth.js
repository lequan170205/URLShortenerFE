// src/apis/auth.js
import apiClient from './axios'

/**
 * Đăng ký tài khoản mới
 * @param {Object} data - { email, password, name, ... }
 */
export const register = data => {
  return apiClient.post('/auth/register', data)
}

/**
 * Xác minh email
 * @param {Object} data - { token }
 */
export const verifyEmail = data => {
  return apiClient.post('/auth/verify-email', data)
}

/**
 * Đăng nhập
 * @param {Object} data - { email, password }
 */
export const login = data => {
  return apiClient.post('/auth/login', data)
}

/**
 * Làm mới token
 * @param {Object} data - { refreshToken }
 */
export const refreshToken = data => {
  return apiClient.post('/auth/refresh', data)
}

/**
 * Đăng xuất
 * @param {Object} data - { token } hoặc { refreshToken } tùy backend yêu cầu
 */
export const logout = data => {
  return apiClient.post('/auth/logout', data)
}

export default {
  register,
  verifyEmail,
  login,
  refreshToken,
  logout
}
