import apiClient from './axios'

/**
 * Tạo URL rút gọn
 * @param {Object} data - { originalUrl }
 */
export const createShortUrl = data => {
  return apiClient.post('/url/create', data)
}

export const getoriginalUrl = code => {
  return apiClient.get(`/url/${code}`)
}

export default {
  createShortUrl
}
