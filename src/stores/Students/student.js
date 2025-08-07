// src/stores/Students/student.js
import { defineStore } from 'pinia'
import {
  getAllStudents,
  createStudent,
  deleteStudent,
  updateStudent
} from '@/services/api'

export const useStudentStore = defineStore('student', {
  state: () => ({
    students: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchStudents() {
      this.loading = true
      this.error = null
      try {
        const res = await getAllStudents()
        this.students = res.data
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async addStudent(data) {
      const res = await createStudent(data)
      this.students.unshift(res.data.student)
    },

    async removeStudent(id) {
      await deleteStudent(id)
      this.students = this.students.filter(s => s.id !== id)
    },

    async editStudent(id, updates) {
      const res = await updateStudent(id, updates)
      const index = this.students.findIndex(s => s.id === id)
      if (index !== -1) this.students[index] = res.data
    }
  }
})
