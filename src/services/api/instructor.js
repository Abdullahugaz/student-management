// src/services/api/instructor.js
import api from '../api'

export const createInstructor = (data) =>
  api.post('/instructors', data, { headers: { 'Content-Type': 'multipart/form-data' } })
export const getAllInstructors = () => api.get('/instructors')
export const getInstructorById = (id) => api.get(`/instructors/${id}`)
export const updateInstructor = (id, data) =>
  api.put(`/instructors/${id}`, data, { headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : undefined })
export const deleteInstructor = (id) => api.delete(`/instructors/${id}`)
