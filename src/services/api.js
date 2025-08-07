import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Auth
export const loginStudent = (email, password) =>
  api.post('/auth/login', { email, password })

// CRUD API for students
export const createStudent = (data) =>
  api.post('/students', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })


export const getAllStudents = () => api.get('/students')
export const deleteStudent = (id) => api.delete(`/students/${id}`)
export const updateStudent = (id, data) => api.put(`/students/${id}`, data)

export default api
