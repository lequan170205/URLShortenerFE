<!-- src/components/auth/AuthLayout.vue -->
<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-50/80 backdrop-blur-sm px-4"
  >
    <Card
      class="w-full max-w-md bg-white border border-gray-200 shadow-xl ring-1 ring-black/5 dark:bg-gray-900 dark:border-gray-700 rounded-2xl"
    >
      <CardHeader class="flex flex-col items-center gap-3 pt-8 pb-6 px-6">
        <CardTitle class="text-2xl font-bold tracking-tight">{{ title }}</CardTitle>
        <CardDescription
          class="text-sm text-muted-foreground/80 max-w-[280px] text-center leading-6"
        >
          {{ description }}
        </CardDescription>
      </CardHeader>
      <CardContent class="px-6 pb-6">
        <slot name="form" />
      </CardContent>
      <CardFooter class="flex flex-col space-y-4 px-6 pb-8">
        <slot name="footer" />
      </CardFooter>
    </Card>
  </div>
</template>

<script setup>
  defineProps({
    title: String,
    description: String
  })
</script>
