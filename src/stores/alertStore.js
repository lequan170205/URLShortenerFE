import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAlertStore = defineStore('alert', () => {
  const show = ref(false)
  const type = ref('success') // 'success' | 'error'
  const message = ref('')

  // Hiển thị alert
  const showAlert = (msg, alertType = 'success') => {
    message.value = msg
    type.value = alertType
    show.value = true
  }

  // Đóng alert
  const closeAlert = () => {
    show.value = false
  }

  return {
    show,
    type,
    message,
    showAlert,
    closeAlert
  }
})
