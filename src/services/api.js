import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

// Helper: get token headers
function authHeaders() {
  const token = localStorage.getItem('token')
  return token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {}
}

// ======================
// AUTH ROUTES
// ======================

// Login
export const loginStudent = (email, password) =>
  axios.post(`${API_BASE_URL}/auth/login`, { email, password })

// ======================
// STUDENT ROUTES
// ======================

// Register student (with file upload)
export const registerStudent = (formData) =>
  axios.post(`${API_BASE_URL}/students/register`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

// Get all students (protected)
export const getAllStudents = () =>
  axios.get(`${API_BASE_URL}/students`, authHeaders())

// Get single student by ID (protected)
export const getStudentById = (id) =>
  axios.get(`${API_BASE_URL}/students/${id}`, authHeaders())

// Update student (with file upload) (protected)
export const updateStudent = (id, formData) =>
  axios.put(`${API_BASE_URL}/students/${id}`, formData, {
    ...authHeaders(),
    headers: {
      ...authHeaders().headers,
      'Content-Type': 'multipart/form-data'
    }
  })

// Delete student (protected)
export const deleteStudent = (id) =>
  axios.delete(`${API_BASE_URL}/students/${id}`, authHeaders())
