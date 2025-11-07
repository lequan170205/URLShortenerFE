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
            <Label class="flex items-center justify-between" for="name">Full name</Label>
            <Input
              class="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
              v-model="form.name"
              type="text"
              placeholder="Your full name"
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

          <!-- Terms -->
          <div class="flex items-center space-x-2 px-6">
            <input
              type="checkbox"
              id="terms"
              v-model="form.terms"
              required
              class="w-4 h-4 rounded border-2 border-gray-300 text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
            />
            <Label for="terms" class="text-sm font-normal cursor-pointer select-none">
              I agree to the
              <a href="#" class="text-primary hover:underline">Terms of Service</a>
              and
              <a href="#" class="text-primary hover:underline">Privacy Policy</a>
            </Label>
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
  import AuthFooter from '@/components/auth/AuthFooter.vue'
  import AuthForm from '@/components/auth/AuthForm.vue'
  import AuthLayout from '@/components/auth/AuthLayout.vue'
  import { reactive, ref } from 'vue'

  const form = reactive({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  })

  const isLoading = ref(false)
  const error = ref('')

  const handleSubmit = async () => {
    error.value = ''
    isLoading.value = true
    try {
      if (form.password !== form.confirmPassword) throw new Error('Passwords do not match')
      if (form.password.length < 6) throw new Error('Password must be at least 6 characters')

      await new Promise(r => setTimeout(r, 1500))
      console.log('Register:', form)
    } catch (err) {
      error.value = err.message || 'Registration failed'
    } finally {
      isLoading.value = false
    }
  }

  const handleGoogle = () => console.log('Google register')
  const handleGithub = () => console.log('GitHub register')
</script>
