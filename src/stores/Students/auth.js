// stores/students/auth.js
import { defineStore } from 'pinia'
import { loginStudent } from '@/services/api'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
    error: null,
    loading: false
  }),

  actions: {
    async login(email, password) {
      this.loading = true
      this.error = null
      try {
        const res = await loginStudent(email, password)
        this.token = res.data.token
        this.user = res.data.student
        localStorage.setItem('token', res.data.token)
      } catch (err) {
        this.error = err.response?.data?.error || 'Login failed'
        throw err
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
    },

    isAuthenticated() {
      return !!this.token
    }
  }
})
