<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-6xl font-bold text-red-600 mb-4">403</h1>
    <p class="text-xl text-gray-700 dark:text-gray-300 mb-6">{{ message }}</p>
    <button
      @click="goHome"
      class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
    >
      Go Home
    </button>
  </div>
</template>

<script setup>
  import { useRoute, useRouter } from 'vue-router'

  const router = useRouter()
  const route = useRoute()

  // Nhận message từ query (nếu có)
  const message = route.query.message || 'Access denied'

  const goHome = () => {
    router.push({ name: 'home' })
  }
</script>
