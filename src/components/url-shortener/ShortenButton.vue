<!-- src/components/ShortenButton.vue -->
<template>
  <button
    type="submit"
    :disabled="disabled"
    class="w-[200px] h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center"
  >
    <!-- w-full se khien element con an het width con lai cua component cha -->
    <span v-if="loading">
      <svg
        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      Shortening...
    </span>
    <span v-else>Shorten URL</span>
  </button>
</template>

<script setup>
  defineProps({
    loading: Boolean,
    disabled: Boolean
  })
</script>
