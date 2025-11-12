<!-- src/components/url-shortener/Input.vue -->
<template>
  <div class="flex justify-center w-full">
    <input
      id="url"
      v-model="localValue"
      type="url"
      placeholder="https://example.com/very/long/url"
      class="w-full h-12 rounded-xl px-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
      :disabled="disabled"
    />
  </div>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    modelValue: String,
    disabled: Boolean
  })

  const emit = defineEmits(['update:modelValue'])

  const localValue = computed({
    get: () => props.modelValue,
    set: val => emit('update:modelValue', val)
  })
</script>
