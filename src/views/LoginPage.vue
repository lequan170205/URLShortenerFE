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
            <Label class="flex items-center" for="email">Email</Label>
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
            <div class="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                v-model="form.remember"
                class="w-4 h-4 rounded border-2 border-gray-300 text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
              />
              <Label for="remember" class="text-sm font-normal cursor-pointer select-none">
                Remember me
              </Label>
            </div>
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
  import AuthFooter from '@/components/auth/AuthFooter.vue'
  import AuthForm from '@/components/auth/AuthForm.vue'
  import AuthLayout from '@/components/auth/AuthLayout.vue'
  import { reactive, ref } from 'vue'

  const form = reactive({
    email: '',
    password: '',
    remember: false
  })

  const isLoading = ref(false)
  const error = ref('')

  const handleSubmit = async () => {
    error.value = ''
    isLoading.value = true
    try {
      await new Promise(r => setTimeout(r, 1500))
      console.log('Login:', form)
    } catch (err) {
      error.value = err.message || 'Login failed'
    } finally {
      isLoading.value = false
    }
  }

  const handleGoogle = () => console.log('Google login')
  const handleGithub = () => console.log('GitHub login')
</script>
