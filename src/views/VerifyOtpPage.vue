<!-- src/pages/VerifyOtpPage.vue -->
<template>
  <AuthLayout
    title="Verify your email"
    description="Enter the verification code we sent to your email"
  >
    <template #form>
      <AuthForm
        :isLoading="isLoading"
        :error="error"
        submitText="Verify"
        submitLoadingText="Verifying..."
        @submit="handleSubmit"
      >
        <template #fields>
          <div class="space-y-2 px-6">
            <Label class="flex items-center justify-between" for="otp">Verification Code</Label>
            <Input
              class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
              v-model="otp"
              type="text"
              placeholder="Enter your 6-digit code"
              maxlength="6"
              required
              :disabled="isLoading"
            />
          </div>
        </template>
      </AuthForm>
    </template>

    <template #footer>
      <div class="text-center text-sm text-muted-foreground pb-4">
        Didn’t receive the code?
        <button
          class="text-primary underline hover:text-primary/80 transition"
          @click="handleResend"
          :disabled="resending"
        >
          {{ resending ? 'Resending...' : 'Resend code' }}
        </button>
      </div>
    </template>

    <!-- ✅ Alert Dialog Popup -->
    <AlertDialog :open="showAlert" @update:open="showAlert = $event">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {{ alertType === 'success' ? 'Success' : 'Error' }}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {{ alertMessage }}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction @click="showAlert = false">OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </AuthLayout>
</template>

<script setup>
  import { verifyEmail } from '@/apis/auth'
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  // Components
  import AuthForm from '@/components/auth/AuthForm.vue'
  import AuthLayout from '@/components/auth/AuthLayout.vue'
  import Input from '@/components/ui/input/Input.vue'
  import Label from '@/components/ui/label/Label.vue'

  // ✅ ShadCN AlertDialog imports
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
  } from '@/components/ui/alert-dialog'

  // --- States ---
  const route = useRoute()
  const email = route.query.email || ''
  const otp = ref('')
  const isLoading = ref(false)
  const resending = ref(false)
  const error = ref('')
  const showAlert = ref(false)
  const alertType = ref('')
  const alertMessage = ref('')

  // --- Handle OTP Submit ---
  const handleSubmit = async () => {
    error.value = ''
    isLoading.value = true
    showAlert.value = false

    try {
      const response = await verifyEmail({ email, token: otp.value })
      if (response.data.success) {
        alertType.value = 'success'
        alertMessage.value = 'Email verified successfully! Redirecting...'
        showAlert.value = true
        setTimeout(() => {
          window.location.href = '/'
        }, 1500)
      }
    } catch (err) {
      alertType.value = 'error'
      alertMessage.value = err.response?.data?.message || 'Invalid verification code'
      showAlert.value = true
    } finally {
      isLoading.value = false
    }
  }

  // --- Handle Resend OTP ---
  const handleResend = async () => {
    if (!email) return
    resending.value = true
    showAlert.value = false
    try {
      alertType.value = 'success'
      alertMessage.value = 'Verification code resent successfully!'
      showAlert.value = true
    } catch {
      alertType.value = 'error'
      alertMessage.value = 'Failed to resend code. Please try again.'
      showAlert.value = true
    } finally {
      resending.value = false
    }
  }
</script>
