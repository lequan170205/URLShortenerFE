<!-- src/pages/RegisterPage.vue -->
<template>
  <AuthLayout title="Create an account" description="Enter your information to get started">
    <template #form>
      <AuthForm
        :isLoading="isLoading"
        :error="error"
        submitText="Create account"
        submitLoadingText="Creating account..."
        @submit="handleSubmit"
      >
        <template #fields>
          <!-- Name -->
          <div class="space-y-2 px-6">
            <Label class="flex items-center justify-between" for="name">User name</Label>
            <Input
              class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
              v-model="form.userName"
              type="text"
              placeholder="Your user name"
              required
              :disabled="isLoading"
            />
          </div>

          <!-- Email -->
          <div class="space-y-2 px-6">
            <Label class="flex items-center justify-between" for="email">Email</Label>
            <Input
              class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
              v-model="form.email"
              type="email"
              placeholder="name@example.com"
              required
              :disabled="isLoading"
            />
          </div>

          <!-- Password -->
          <div class="space-y-2 px-6">
            <Label class="flex items-center justify-between" for="password">Password</Label>
            <Input
              class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              required
              :disabled="isLoading"
            />
          </div>

          <!-- Confirm -->
          <div class="space-y-2 px-6">
            <Label class="flex items-center justify-between" for="confirm">Confirm password</Label>
            <Input
              class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
              v-model="form.confirmPassword"
              type="password"
              placeholder="••••••••"
              required
              :disabled="isLoading"
            />
          </div>
        </template>
      </AuthForm>
    </template>

    <template #footer>
      <AuthFooter
        :isLoading="isLoading"
        linkText="Already have an account?"
        linkLabel="Sign in"
        linkHref="/login"
        @google="handleGoogle"
        @github="handleGithub"
      />
    </template>
  </AuthLayout>
</template>

<script setup>
  import { register } from '@/apis/auth'
  import AuthFooter from '@/components/auth/AuthFooter.vue'
  import AuthForm from '@/components/auth/AuthForm.vue'
  import AuthLayout from '@/components/auth/AuthLayout.vue'
  import Input from '@/components/ui/input/Input.vue'
  import { useAlertStore } from '@/stores/alertStore'
  import { reactive, ref } from 'vue'

  const form = reactive({
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const alertStore = useAlertStore()

  const isLoading = ref(false)
  const error = ref('')

  const handleSubmit = async () => {
    isLoading.value = true
    try {
      if (form.password !== form.confirmPassword) throw new Error('Passwords do not match')
      if (form.password.length < 6) throw new Error('Password must be at least 6 characters')

      const response = await register({
        username: form.userName,
        password: form.password,
        email: form.email
      })

      if (response.data?.token) {
        localStorage.setItem('accessToken', response.data.token)
      }

      alertStore.showAlert('Registration successful! Check your email for verification.', 'success')
      window.location.href = `/verify-otp?email=${encodeURIComponent(form.email)}&userName=${encodeURIComponent(form.userName)}`
    } catch (err) {
      alertStore.showAlert(err.message || 'Registration failed', 'error')
    } finally {
      isLoading.value = false
    }
  }

  const handleGoogle = () => console.log('Google register')
  const handleGithub = () => console.log('GitHub register')
</script>
