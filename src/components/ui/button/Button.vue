<script setup>
  import { cn } from '@/lib/utils'
  import { Primitive } from 'reka-ui'
  import { buttonVariants } from '.'

  const props = defineProps()
</script>

<template>
  <Primitive
    data-slot="button"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>
