import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/students' // Backend base URL

export const useStudentStore = defineStore('student', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    student: JSON.parse(localStorage.getItem('student')) || null,
    studentsList: []
  }),

  getters: {
    isAuthenticated: (state) => !!state.token
  },

  actions: {
    // Helper: get auth headers for protected requests
    authHeaders() {
      return {
        headers: { Authorization: `Bearer ${this.token}` }
      }
    },

    // =======================
    // REGISTER STUDENT
    // =======================
    async registerStudent(formData) {
      try {
        const res = await axios.post(`${API_URL}/register`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        return res.data
      } catch (err) {
        throw err.response?.data || { error: 'Registration failed' }
      }
    },

    // =======================
    // LOGIN STUDENT
    // =======================
    async loginStudent(email, password) {
      try {
        const res = await axios.post(`${API_URL}/login`, { email, password })
        
        this.token = res.data.token
        this.student = res.data.student

        // Save token & student in localStorage
        localStorage.setItem('token', this.token)
        localStorage.setItem('student', JSON.stringify(this.student))

        // Set Axios default auth header for all requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      } catch (err) {
        this.logout() // clear any bad token
        throw err.response?.data || { error: 'Login failed' }
      }
    },

    // =======================
    // FETCH STUDENTS (Protected)
    // =======================
    async fetchStudents() {
      try {
        const res = await axios.get(API_URL, this.authHeaders())
        this.studentsList = res.data
      } catch (err) {
        throw err.response?.data || { error: 'Failed to fetch students' }
      }
    },

    // =======================
    // LOGOUT
    // =======================
    logout() {
      this.token = null
      this.student = null
      this.studentsList = []
      localStorage.removeItem('token')
      localStorage.removeItem('student')
      delete axios.defaults.headers.common['Authorization']
    }
  }
})
