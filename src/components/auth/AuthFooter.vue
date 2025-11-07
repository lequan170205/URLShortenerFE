<!-- src/components/auth/AuthFooter.vue -->
<template>
  <div class="flex flex-col space-y-4">
    <div class="relative w-full">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground">Or continue with</span>
      </div>
    </div>

    <SocialButtons :disabled="isLoading" @google="emit('google')" @github="emit('github')" />

    <p class="text-center text-sm text-muted-foreground">
      {{ linkText }}
      <a :href="linkHref" class="text-primary hover:underline font-medium">{{ linkLabel }}</a>
    </p>
  </div>
</template>

<script setup>
  import SocialButtons from './SocialButtons.vue'

  defineProps({
    isLoading: Boolean,
    linkText: String,
    linkLabel: String,
    linkHref: String
  })

  const emit = defineEmits(['google', 'github'])
</script>
