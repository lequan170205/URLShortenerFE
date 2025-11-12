<script setup>
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
  } from '@/components/ui/alert-dialog'
  import { useAlertStore } from '@/stores/alertStore'

  const alertStore = useAlertStore()
</script>

<template>
  <div class="w-full">
    <header>
      <div></div>
    </header>

    <RouterView />

    <!-- Global AlertDialog -->
    <AlertDialog :open="alertStore.show" @update:open="alertStore.show = $event">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {{ alertStore.type === 'success' ? 'Success' : 'Error' }}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {{ alertStore.message }}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction @click="alertStore.closeAlert()">OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
