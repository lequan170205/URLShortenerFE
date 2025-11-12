<!-- src/views/HomeView.vue -->
<template>
  <!-- FULL SCREEN LAYOUT -->
  <div class="flex justify-center flex-col mx-auto w-full">
    <!-- SỬ DỤNG COMPONENT HEADER -->
    <AppHeader />

    <!-- MAIN: Chiếm toàn bộ không gian còn lại -->
    <main class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div
        class="w-full h-full flex flex-col items-center justify-center space-y-12 max-w-4xl mx-auto"
      >
        <!-- HERO TITLE -->
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

        <!-- FORM -->
        <form
          @submit.prevent="handleShorten"
          class="w-full flex flex-col gap-4 items-center justify-center"
        >
          <Input
            v-model="form.url"
            :disabled="isLoading"
            placeholder="https://example.com/very/long/url/that/you/want/to/shorten..."
          />
          <ShortenButton :loading="isLoading" :disabled="!form.url" />
        </form>

        <!-- RESULT -->
        <ResultDisplay
          v-if="result"
          :original-url="form.url"
          :short-url="result.shortUrl"
          @copy="handleCopyEvent"
          class="w-full max-w-3xl mx-auto animate-slide-up"
        />

        <div v-if="result" class="mt-6 flex justify-center animate-slide-up">
          <QrcodeVue :value="result.shortUrl" :size="200" level="H" bgColor="#fff" fgColor="#000" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
  import { createShortUrl } from '@/apis/shortener'
  import AppHeader from '@/components/url-shortener/AppHeader.vue'
  import Input from '@/components/url-shortener/Input.vue'
  import ResultDisplay from '@/components/url-shortener/ResultDisplay.vue'
  import ShortenButton from '@/components/url-shortener/ShortenButton.vue'
  import QrcodeVue from 'qrcode.vue'
  import { reactive, ref } from 'vue'

  const form = reactive({ url: '' })
  const isLoading = ref(false)
  const result = ref(null)
  const copyStatus = ref('')
  const error = ref('')

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
      const response = await createShortUrl({ originalUrl: form.url })
      result.value = { shortUrl: response.data.shortUrl }
    } catch (err) {
      error.value =
        err.response?.data?.message || err.message || 'Có lỗi xảy ra khi rút gọn URL. Thử lại sau!'
    } finally {
      isLoading.value = false
    }
  }

  const handleCopyEvent = text => {
    copyStatus.value = `Copied: ${text}`
    setTimeout(() => {
      copyStatus.value = ''
    }, 2000)
  }

  // Copy to clipboard
  const copyToClipboard = async text => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Copy failed:', err)
      error.value = 'Sao chép thất bại!'
    }
  }
</script>

<style scoped>
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
      transform: translatey(0);
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
