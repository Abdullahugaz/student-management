<template>
  <div class="w-full pt-36 lg:pt-32 flex justify-center">
    <form @submit.prevent="loginUser" class="rounded-xl w-full max-w-md p-6 bg-white shadow-lg">
      <h2 class="text-xl font-bold mb-4 text-center">Login</h2>

      <!-- Email -->
      <div class="mb-4">
        <label class="form-label">Email</label>
        <input
          type="email"
          v-model.trim="form.email"
          class="form-input"
          placeholder="email@example.com"
        />
        <div v-if="v$.form.email.$error" class="form-error">
          Valid email is required
        </div>
      </div>

      <!-- Password -->
      <div class="mb-4">
        <label class="form-label">Password</label>
        <input
          type="password"
          v-model.trim="form.password"
          class="form-input"
          placeholder="Enter password"
        />
        <div v-if="v$.form.password.$error" class="form-error">
          Password is required
        </div>
      </div>

      <!-- Error -->
      <div v-if="errorMessage" class="form-error mb-3">
        {{ errorMessage }}
      </div>

      <!-- Login Button -->
      <button
        type="submit"
        class="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

const router = useRouter()

const form = ref({
  email: '',
  password: ''
})

const errorMessage = ref('')

async function loginUser() {
  errorMessage.value = ''
  const valid = await v$.value.$validate()
  if (!valid) return

  try {
    const res = await axios.post(
      'http://localhost:5000/api/auth/login',
      form.value,
      { headers: { 'Content-Type': 'application/json' } }
    )

    // Save token in localStorage
    localStorage.setItem('token', res.data.token)

    alert('✅ Login successful!')
    router.push({ name: 'dashboard' }) // Change this route to your dashboard/home
  } catch (err) {
    console.error('❌ Login error:', err.response?.data || err.message)
    errorMessage.value = err.response?.data?.error || 'Invalid email or password'
  }
}

const rules = {
  form: {
    email: { required, email },
    password: { required }
  }
}

const v$ = useVuelidate(rules, { form })
</script>

<style scoped>
.form-label {
  @apply text-darkone dark:text-dark-darkone ml-1 font-normal text-sm pb-1 capitalize flex items-center space-x-2;
}
.form-input {
  @apply bg-bginput dark:bg-dark-bginput border-bordercolor dark:border-dark-bordercolor
         focus:ring-0 focus:border-bordercolor dark:focus:border-dark-bordercolor
         text-darkone text-[14px] dark:text-dark-darkone rounded-lg block w-full p-2.5
         placeholder-gray-400 placeholder:text-xs dark:placeholder-slate-500 placeholder:capitalize dark:focus:ring-0;
}
.form-error {
  @apply text-red-400 ml-1 text-xs;
}
</style>
