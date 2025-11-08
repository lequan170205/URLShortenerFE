<!-- src/components/auth/AuthForm.vue -->
<template>
  <div>
    <form @submit.prevent="onSubmit" class="space-y-5">
      <slot name="fields" />
      <div class="flex justify-center">
        <Button
          type="submit"
          class="w-64 rounded-xl h-12 text-base font-medium transition-all cursor-pointer"
          :disabled="isLoading"
        >
          <span v-if="isLoading">{{ submitLoadingText }}</span>
          <span v-else>{{ submitText }}</span>
        </Button>
      </div>
    </form>

    <!-- Error alert -->
    <div v-if="error" class="mt-4">
      <Alert variant="destructive">
        <AlertCircle class="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{{ error }}</AlertDescription>
      </Alert>
    </div>
  </div>
</template>

<script setup>
  import Button from '../ui/button/Button.vue'
  defineProps({
    isLoading: Boolean,
    error: String,
    submitText: String,
    submitLoadingText: String
  })

  const emit = defineEmits(['submit'])
  const onSubmit = () => emit('submit')
</script>
