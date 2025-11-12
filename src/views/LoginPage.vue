<!-- src/pages/LoginPage.vue -->
<template>
  <AuthLayout
    title="Sign in to your account"
    description="Enter your email and password to access your account"
  >
    <template #form>
      <AuthForm
        :isLoading="isLoading"
        :error="error"
        submitText="Sign in"
        submitLoadingText="Signing in..."
        @submit="handleSubmit"
      >
        <template #fields>
          <!-- Email -->
          <div class="space-y-2 px-6">
            <Label class="flex items-center" for="email">Username</Label>
            <Input
              class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
              v-model="form.username"
              placeholder="Username"
              required
              :disabled="isLoading"
            />
          </div>

          <!-- Password -->
          <div class="space-y-2 px-6">
            <Label class="flex items-center" for="password">Password</Label>

            <Input
              class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              required
              :disabled="isLoading"
            />
          </div>
        </template>
      </AuthForm>
    </template>
  </AuthLayout>
</template>

<script setup>
  import { login } from '@/apis/auth'
  import AuthForm from '@/components/auth/AuthForm.vue'
  import AuthLayout from '@/components/auth/AuthLayout.vue'
  import Input from '@/components/ui/input/Input.vue'
  import { useAlertStore } from '@/stores/alertStore'
  import { reactive, ref } from 'vue'

  const form = reactive({
    username: '',
    password: ''
  })

  const isLoading = ref(false)
  const alertStore = useAlertStore() // <-- sử dụng alertStore

  const handleSubmit = async () => {
    isLoading.value = true
    try {
      const response = await login({
        username: form.username,
        password: form.password
      })

      if (response.data?.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken)
        alertStore.showAlert('Login successful!', 'success') // hiển thị alert thành công
        window.location.href = '/'
      }
    } catch (err) {
      alertStore.showAlert(err.message || 'Login failed', 'error') // hiển thị alert lỗi
    } finally {
      isLoading.value = false
    }
  }
</script>
