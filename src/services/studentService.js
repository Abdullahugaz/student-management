import axios from 'axios'

const API_URL = 'http://localhost:5000/api/students'

// Helper: get token from localStorage
function authHeaders() {
  const token = localStorage.getItem('token')
  return token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {}
}

// ============================
// PUBLIC ROUTES
// ============================

// Register student (with file upload)
export const registerStudent = (formData) =>
  axios.post(`${API_URL}/register`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

// Login student
export const loginStudent = (email, password) =>
  axios.post(`${API_URL}/login`, { email, password })

// ============================
// PROTECTED ROUTES
// ============================

// Get all students
export const getAllStudents = () =>
  axios.get(API_URL, authHeaders())

// Get single student by ID
export const getStudentById = (id) =>
  axios.get(`${API_URL}/${id}`, authHeaders())

// Update student (with file upload)
export const updateStudent = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, {
    ...authHeaders(),
    headers: {
      ...authHeaders().headers,
      'Content-Type': 'multipart/form-data'
    }
  })

// Delete student
export const deleteStudent = (id) =>
  axios.delete(`${API_URL}/${id}`, authHeaders())
