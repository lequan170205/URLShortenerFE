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
          <!-- OTP input -->
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
        Didn’t receive the code? Check your spam folder.
      </div>
    </template>
  </AuthLayout>
</template>

<script setup>
  import { verifyEmail } from '@/apis/auth'
  import AuthForm from '@/components/auth/AuthForm.vue'
  import AuthLayout from '@/components/auth/AuthLayout.vue'
  import Input from '@/components/ui/input/Input.vue'
  import Label from '@/components/ui/label/Label.vue'
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const email = route.query.email || '' // lấy email từ URL

  const otp = ref('')
  const isLoading = ref(false)
  const resending = ref(false)
  const error = ref('')

  const handleSubmit = async () => {
    error.value = ''
    isLoading.value = true
    try {
      const response = await verifyEmail({
        email,
        otp: otp.value
      })

      // Nếu thành công, bạn có thể điều hướng tới trang chính hoặc login
      console.log('✅ OTP verified', response.data)
      window.location.href = '/login' // hoặc /dashboard, tùy logic của bạn
    } catch (err) {
      error.value = err.response?.data?.message || 'Invalid verification code'
    } finally {
      isLoading.value = false
    }
  }

  const handleResend = async () => {
    // if (!email) return
    // resending.value = true
    // try {
    //   await resendOtp({ email })
    //   alert('Verification code resent successfully!')
    // } catch (err) {
    //   alert('Failed to resend code')
    // } finally {
    //   resending.value = false
    // }
  }
</script>
