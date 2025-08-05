<template>
  <div class="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow">
    <h1 class="text-2xl font-bold mb-4 text-center">Student Login</h1>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <!-- Email -->
      <div>
        <label class="form-label">Email</label>
        <input
          v-model="email"
          type="email"
          placeholder="email@example.com"
          class="form-input"
          required
        />
      </div>

      <!-- Password -->
      <div>
        <label class="form-label">Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="Enter password"
          class="form-input"
          required
        />
      </div>

      <!-- Error message -->
      <div v-if="errorMessage" class="text-red-500 text-sm">
        {{ errorMessage }}
      </div>

      <!-- Submit button -->
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark disabled:opacity-50"
      >
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const router = useRouter()

async function handleLogin() {
  loading.value = true
  errorMessage.value = ''

  try {
    const res = await axios.post('http://localhost:5000/api/students/login', {
      email: email.value,
      password: password.value
    })

    // Save token + student info in localStorage
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('student', JSON.stringify(res.data.student))

    // Redirect to dashboard after login
    router.push({ name: 'app.dashboard' })
  } catch (err) {
    errorMessage.value = err.response?.data?.error || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.form-label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}
.form-input {
  @apply w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500;
}
</style>
