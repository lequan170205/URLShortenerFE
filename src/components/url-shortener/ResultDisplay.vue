<!-- src/components/ResultDisplay.vue -->
<template>
  <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
    <div class="flex items-center justify-between mb-2">
      <span class="text-sm text-gray-600 dark:text-gray-400">Original URL:</span>
      <span class="text-sm text-gray-500 dark:text-gray-500 truncate max-w-xs">
        {{ originalUrl }}
      </span>
    </div>
    <div class="flex items-center justify-between">
      <span class="text-sm text-gray-600 dark:text-gray-400">Shortened URL:</span>
      <span class="font-medium text-blue-600 dark:text-blue-400 break-all">
        {{ shortUrl }}
      </span>
    </div>
    <div class="flex justify-center mt-4">
      <button
        @click="$emit('copy', shortUrl)"
        class="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400"
      >
        Copy
      </button>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    originalUrl: String,
    shortUrl: String
  })
  defineEmits(['copy'])
</script>
