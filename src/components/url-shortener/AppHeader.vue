<template>
  <header class="p-4 sm:p-6 flex justify-end items-center space-x-4 z-10">
    <!-- Nếu đã đăng nhập -->
    <div v-if="user" class="flex items-center space-x-3 sm:space-x-4">
      <span class="text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base">
        Welcome,
        <span class="font-bold">{{ user.name }}</span>
      </span>
      <button
        @click="handleLogout"
        class="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-medium text-sm sm:text-base transition shadow-lg"
      >
        Log out
      </button>
    </div>
  </header>
</template>

<script setup>
  import { jwtDecode } from 'jwt-decode'
  import { onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const user = ref(null)

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    user.value = null
    router.push('/login')
  }

  onMounted(() => {
    // 2️⃣ Nếu không có user, decode accessToken
    const token = localStorage.getItem('accessToken')

    if (token) {
      try {
        const decoded = jwtDecode(token)
        const currentTime = Math.floor(Date.now() / 1000)

        if (decoded.exp && decoded.exp < currentTime) {
          handleLogout()
        } else {
          // Lấy name, email, role từ token

          const userData = {
            name: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || 'User',
            email:
              decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || '',
            role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || ''
          }

          user.value = userData
          localStorage.setItem('user', JSON.stringify(userData))
        }
      } catch {
        handleLogout()
      }
    }
  })
</script>
