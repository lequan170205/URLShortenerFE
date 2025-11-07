<!-- src/views/HomeView.vue -->
<template>
  <!-- FULL SCREEN LAYOUT -->
  <div class="flex justify-center flex-col mx-auto">
    <!-- HEADER: Sign In / Sign Up -->
    <header class="p-4 sm:p-6 flex justify-end space-x-3 sm:space-x-4 z-10">
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
    </header>

    <!-- MAIN: Chiếm toàn bộ không gian còn lại -->
    <main class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div
        class="w-full h-full flex flex-col items-center justify-center space-y-12 max-w-4xl mx-auto"
      >
        <!-- HERO TITLE: To hơn, nổi bật -->
        <div class="text-center animate-fade-in">
          <h1
            class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight"
          >
            URL Shortener
          </h1>
          <p
            class="mt-4 text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light"
          >
            Shorten the link within 1 second
          </p>
        </div>

        <!-- FORM: Input + Button lớn, full-width trên mobile -->
        <form
          @submit.prevent="handleShorten"
          class="w-full flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <Input
            v-model="form.url"
            :disabled="isLoading"
            placeholder="https://example.com/very/long/url/that/you/want/to/shorten..."
          />
          <ShortenButton :loading="isLoading" :disabled="!form.url" />
        </form>

        <!-- RESULT: Hiển thị lớn, nổi bật -->
        <ResultDisplay
          v-if="result"
          :original-url="form.url"
          :short-url="result.shortUrl"
          @copy="copyToClipboard"
          class="w-full max-w-3xl mx-auto animate-slide-up"
        />

        <!-- ERROR: To hơn, dễ đọc -->
        <ErrorAlert :message="error" class="w-full max-w-3xl mx-auto text-lg" />
      </div>
    </main>
  </div>
</template>

<script setup>
  import ErrorAlert from '@/components/url-shortener/ErrorAlert.vue'
  import Input from '@/components/url-shortener/Input.vue'
  import ResultDisplay from '@/components/url-shortener/ResultDisplay.vue'
  import ShortenButton from '@/components/url-shortener/ShortenButton.vue'
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const form = reactive({ url: '' })
  const isLoading = ref(false)
  const result = ref(null)
  const error = ref('')

  // Navigation
  const goToSignIn = () => router.push('/login')
  const goToSignUp = () => router.push('/register')

  // Shorten URL
  const handleShorten = async () => {
    if (!form.url) return

    try {
      new URL(form.url)
    } catch {
      error.value = 'URL không hợp lệ! Vui lòng kiểm tra lại.'
      return
    }

    error.value = ''
    isLoading.value = true
    result.value = null

    try {
      // Giả lập loading
      await new Promise(resolve => setTimeout(resolve, 1500))

      const response = await fetch(
        `https://tinyurl.com/api-create.php?url=${encodeURIComponent(form.url)}`
      )

      if (!response.ok) throw new Error('Lỗi khi rút gọn URL')

      const shortUrl = await response.text()
      result.value = { shortUrl }
    } catch (err) {
      error.value = err.message || 'Có lỗi xảy ra khi rút gọn URL. Thử lại sau!'
    } finally {
      isLoading.value = false
    }
  }

  // Copy to clipboard
  const copyToClipboard = async text => {
    try {
      await navigator.clipboard.writeText(text)
      error.value = `Đã sao chép: ${text}`
      setTimeout(() => {
        error.value = ''
      }, 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }
</script>

<style scoped>
  /* Hiệu ứng mượt mà */
  .animate-fade-in {
    animation: fadeIn 1s ease-out;
  }

  .animate-slide-up {
    animation: slideUp 0.6s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
