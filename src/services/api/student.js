import api from '../api'

// Get all students
export async function fetchStudents() {
  const res = await api.get('/students')
  return res.data
}

// Edit a student by ID
export async function editStudent(id, data) {
  // If you need to support profile_picture update in the future, use FormData here
  const res = await api.put(`/students/${id}`, data)
  return res.data
}

// Delete a student by ID
export async function deleteStudent(id) {
  const res = await api.delete(`/students/${id}`)
  return res.data
}

// Create a new student
export async function createStudent(data) {
  const formData = new FormData()

  for (const key in data) {
    formData.append(key, data[key])
  }

  const res = await api.post('/students', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return res.data
}
