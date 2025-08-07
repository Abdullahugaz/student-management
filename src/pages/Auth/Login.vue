<template>
  <div class="min-h-screen flex">
    <!-- Left: Form Section -->
    <div class="flex-1 flex flex-col justify-center px-10 lg:px-20 bg-white">
      <!-- Logo -->
      <div class="mb-8 flex items-center space-x-3">
        <img src="/yiksi.png" alt="System logo" class="w-20 h-20 rounded-lg" />
      </div>

      <!-- Welcome Text -->
      <h1 class="text-3xl font-bold mb-2">Welcome to login system</h1>
      <p class="text-gray-500 mb-8">Sign in by entering the information below</p>

      <!-- Login Form -->
      <form @submit.prevent="loginUser" class="max-w-sm">
        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            v-model.trim="form.email"
            placeholder="email@example.com"
            class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div v-if="v$.form.email.$error" class="text-red-500 text-xs mt-1">
            Valid email is required
          </div>
        </div>

        <!-- Password -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            v-model.trim="form.password"
            placeholder="Enter password"
            class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div v-if="v$.form.password.$error" class="text-red-500 text-xs mt-1">
            Password is required
          </div>
        </div>

        <!-- Remember & Forgot -->
        <div class="flex justify-between items-center mb-4">
          <label class="flex items-center space-x-2 text-sm text-gray-600">
            <input type="checkbox" /> <span>Remember me</span>
          </label>
          <a href="#" class="text-sm text-purple-600 hover:underline">Forgot Password?</a>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="text-red-500 text-sm mb-3">{{ errorMessage }}</div>

        <!-- Login Button -->
        <button
          type="submit"
          class="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition"
          :disabled="loading"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>

        <!-- Sign Up Link -->
        <p class="text-sm text-gray-500 mt-4 text-center">
          Don't have an account?
          <a href="#" class="text-purple-600 hover:underline">Sign up</a>
        </p>
      </form>
    </div>

    <!-- Right: Image Section -->
    <div class="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-purple-500 to-blue-950 rounded-lg">
      <img src="/yiksi.png" alt="Laptop Illustration" class="max-w-lg w-full" />
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { loginStudent } from '@/services/api' // API service

const router = useRouter()

const form = ref({
  email: '',
  password: ''
})

const errorMessage = ref('')
const loading = ref(false)

const rules = {
  form: {
    email: { required, email },
    password: { required }
  }
}
const v$ = useVuelidate(rules, { form })

async function loginUser() {
  errorMessage.value = ''
  const isValid = await v$.value.$validate()
  if (!isValid) return

  loading.value = true

  try {
    const res = await loginStudent(form.value.email, form.value.password)
    localStorage.setItem('token', res.data.token)

    await nextTick() // Ensure reactivity completes
    router.push({ name: 'app.dashboard' })
  } catch (err) {
    errorMessage.value = err.response?.data?.error || 'Invalid email or password'
  } finally {
    loading.value = false
  }
}
</script>
