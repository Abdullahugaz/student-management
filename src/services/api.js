import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// =================== AUTH ===================
export const loginStudent = (email, password) =>
  api.post('/auth/login', { email, password })

// =================== STUDENTS ===================
export const createStudent = (data) =>
  api.post('/students', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

export const getAllStudents = () => api.get('/students')
export const getStudentById = (id) => api.get(`/students/${id}`)
export const updateStudent = (id, data) => api.put(`/students/${id}`, data)
export const deleteStudent = (id) => api.delete(`/students/${id}`)

// =================== COURSES ===================
export const createCourse = (data) => api.post('/courses', data)

export const getAllCourses = () => api.get('/courses')
export const getCourseById = (id) => api.get(`/courses/${id}`)
export const updateCourse = (id, data) => api.put(`/courses/${id}`, data)
export const deleteCourse = (id) => api.delete(`/courses/${id}`)

// =================== INSTRUCTORS ===================
export const createInstructor = (data) => api.post('/instructors', data)

export const getAllInstructors = () => api.get('/instructors')

export const getInstructorById = (id) => api.get(`/instructors/${id}`)

export const updateInstructor = (id, data) => api.put(`/instructors/${id}`, data)

export const deleteInstructor = (id) => api.delete(`/instructors/${id}`)

export default api
