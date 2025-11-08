<!-- src/components/AppHeader.vue -->
<template>
  <header class="p-4 sm:p-6 flex justify-end items-center space-x-4 z-10">
    <!-- Nếu đã đăng nhập -->
    <div v-if="isLoggedIn" class="flex items-center space-x-3 sm:space-x-4">
      <span class="text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base">
        Welcome,
        <span class="font-bold">{{ userName }}</span>
      </span>
      <button
        @click="handleLogout"
        class="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-medium text-sm sm:text-base transition shadow-lg"
      >
        Log out
      </button>
    </div>

    <!-- Nếu chưa đăng nhập -->
    <div v-else class="flex space-x-3 sm:space-x-4">
      <button
        @click="goToSignIn"
        class="text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm sm:text-base transition"
      >
        Sign In
      </button>
      <button
        @click="goToSignUp"
        class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-medium text-sm sm:text-base transition shadow-lg"
      >
        Sign Up
      </button>
    </div>
  </header>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'

  // Router
  const router = useRouter()

  // Trạng thái người dùng
  const user = ref(null)
  const isLoggedIn = computed(() => !!user.value)
  const userName = computed(() => user.value?.name || 'User')

  // Navigation
  const goToSignIn = () => router.push('/login')
  const goToSignUp = () => router.push('/register')

  // Xử lý đăng xuất
  const handleLogout = () => {
    // Xóa dữ liệu đăng nhập (tùy cách bạn lưu: localStorage, cookie, store, v.v.)
    localStorage.removeItem('user')
    localStorage.removeItem('token') // nếu dùng token

    user.value = null
    router.push('/')
  }

  // Kiểm tra đăng nhập khi component mount
  onMounted(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
      } catch {
        user.value = null
      }
    }
  })
</script>
