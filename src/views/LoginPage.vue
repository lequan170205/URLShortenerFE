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

          <!-- Remember + Forgot -->
          <div class="flex items-center justify-between w-full px-6">
            <a href="#" class="text-sm text-primary hover:underline">Forgot password?</a>
          </div>
        </template>
      </AuthForm>
    </template>

    <template #footer>
      <AuthFooter
        :isLoading="isLoading"
        linkText="Don't have an account?"
        linkLabel="Sign up"
        linkHref="/register"
        @google="handleGoogle"
        @github="handleGithub"
      />
    </template>
  </AuthLayout>
</template>

<script setup>
  import { login } from '@/apis/auth'
  import AuthFooter from '@/components/auth/AuthFooter.vue'
  import AuthForm from '@/components/auth/AuthForm.vue'
  import AuthLayout from '@/components/auth/AuthLayout.vue'
  import Input from '@/components/ui/input/Input.vue'
  import { reactive, ref } from 'vue'

  const form = reactive({
    username: '',
    password: ''
  })

  const isLoading = ref(false)
  const error = ref('')

  const handleSubmit = async () => {
    error.value = ''
    isLoading.value = true
    try {
      const response = await login({
        username: form.username,
        password: form.password
      })
      console.log(response)

      if (response.data?.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken)
        window.location.href = '/'
      }
    } catch (err) {
      error.value = err.message || 'Login failed'
    } finally {
      isLoading.value = false
    }
  }

  const handleGoogle = () => console.log('Google login')
  const handleGithub = () => console.log('GitHub login')
</script>
