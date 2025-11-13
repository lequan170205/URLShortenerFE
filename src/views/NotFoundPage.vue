<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4"
  >
    <div class="text-center space-y-6 max-w-md">
      <!-- Loading Spinner -->
      <div class="flex justify-center">
        <div class="relative w-20 h-20">
          <div
            class="absolute inset-0 border-4 border-blue-200 dark:border-blue-900 rounded-full"
          ></div>
          <div
            class="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
          ></div>
        </div>
      </div>

      <!-- Text Content -->
      <div class="space-y-2">
        <h1 class="text-3xl font-semibold text-gray-900 dark:text-white">Redirecting</h1>
        <p class="text-base text-gray-600 dark:text-gray-400">
          Please wait while we take you to your destination...
        </p>
      </div>

      <div class="space-y-2">
        <a
          :href="originalUrl"
          target="_blank"
          rel="noopener noreferrer"
          style="padding: 10px"
          class="inline-flex items-center gap-4 bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-lg font-medium transition-all shadow-sm hover:shadow-md"
        >
          Cannot redirect ?
        </a>
      </div>

      <!-- Button -->
      <button
        @click="goHome"
        class="inline-flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-6 py-4 rounded-lg font-medium transition-all shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Go Home
      </button>
    </div>
  </div>
</template>

<script setup>
  import { getoriginalUrl } from '@/apis/shortener'
  import { onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const router = useRouter()
  const route = useRoute()
  const originalUrl = ref(null)

  const goHome = () => router.push({ name: 'home' })

  onMounted(async () => {
    const code = route.params.pathMatch?.[0]

    if (!code) return

    try {
      const res = await getoriginalUrl(code)
      console.log(res)
      const { originalUrl: url, isActive } = res.data

      if (isActive && originalUrl) {
        originalUrl.value = url
        window.location.href = url
      }
    } catch (err) {
      console.error('Failed to fetch original URL', err)
    }
  })
</script>
