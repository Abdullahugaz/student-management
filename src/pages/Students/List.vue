<template>
  <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
    <!-- Search -->
    <div class="flex justify-between items-center mb-4">
      <input
        v-model="search"
        type="text"
        placeholder="Search by name or email"
        class="w-full md:w-1/3 px-4 py-2 border rounded focus:outline-none"
      />
    </div>

    <!-- Table -->
    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead class="bg-gray-50 dark:bg-gray-700">
        <tr>
          <th v-for="col in columns" :key="col.key" class="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
        <tr
          v-for="student in paginatedStudents"
          :key="student.id"
          class="hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <td class="px-4 py-2">
            <img
              :src="`http://localhost:5000/uploads/${student.profile_picture}`"
              class="w-10 h-10 rounded-full object-cover"
              alt="Profile"
            />
          </td>
          <td class="px-4 py-2 text-gray-900 dark:text-gray-200">{{ student.full_name }}</td>
          <td class="px-4 py-2 text-gray-900 dark:text-gray-200">{{ student.email }}</td>
          <td class="px-4 py-2 text-gray-900 dark:text-gray-200">{{ student.phone }}</td>
          <td class="px-4 py-2 text-gray-900 dark:text-gray-200">{{ student.department }}</td>
          <td class="px-4 py-2 text-gray-900 dark:text-gray-200">{{ student.address }}</td>
          <td class="px-4 py-2 text-gray-900 dark:text-gray-200">{{ student.status }}</td>
          <td class="px-4 py-2 text-gray-900 dark:text-gray-200">{{ formatDate(student.submission_date) }}</td>
          <td class="px-4 py-2 flex gap-2">
            <button @click="openEditModal(student)" class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              Edit
            </button>
            <button @click="deleteStudent(student.id)" class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Empty State -->
    <div v-if="paginatedStudents.length === 0" class="text-center py-6 text-gray-500 dark:text-gray-400">
      No students found.
    </div>

    <!-- Pagination -->
    <div class="mt-4 flex justify-center space-x-2">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        :class="[currentPage === page ? 'bg-purple-600 text-white' : 'bg-gray-200', 'px-3 py-1 rounded']"
      >
        {{ page }}
      </button>
    </div>

    <!-- Edit Modal -->
    <div v-if="editModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 class="text-lg font-bold mb-4">Edit Student</h2>
        <div class="space-y-2">
          <input v-model="editData.full_name" placeholder="Full Name" class="w-full px-3 py-2 border rounded" />
          <input v-model="editData.email" placeholder="Email" class="w-full px-3 py-2 border rounded" />
          <input v-model="editData.phone" placeholder="Phone" class="w-full px-3 py-2 border rounded" />
          <input v-model="editData.department" placeholder="Department" class="w-full px-3 py-2 border rounded" />
          <input v-model="editData.address" placeholder="Address" class="w-full px-3 py-2 border rounded" />
        </div>
        <div class="flex justify-end mt-4 gap-2">
          <button @click="saveEdit" class="px-4 py-2 bg-green-600 text-white rounded">Save</button>
          <button @click="editModal = false" class="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { fetchStudents, editStudent, deleteStudent as apiDeleteStudent } from '@/services/api/student'

const students = ref([])
const search = ref('')
const currentPage = ref(1)
const perPage = 5
const editModal = ref(false)
const editData = ref({})
const isLoading = ref(false)

const columns = [
  { key: 'profile', label: 'Profile' },
  { key: 'full_name', label: 'Full Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'department', label: 'Department' },
  { key: 'address', label: 'Address' },
  { key: 'status', label: 'Status' },
  { key: 'submission_date', label: 'Submission Date' },
  { key: 'actions', label: 'Actions' }
]

// Fetch students from API
async function loadStudents() {
  try {
    isLoading.value = true
    const data = await fetchStudents()
    students.value = data
  } catch (err) {
    console.error('Failed to load students:', err)
  } finally {
    isLoading.value = false
  }
}

const filteredStudents = computed(() =>
  students.value.filter(s =>
    s.full_name?.toLowerCase().includes(search.value.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.value.toLowerCase())
  )
)

const totalPages = computed(() =>
  Math.ceil(filteredStudents.value.length / perPage)
)

const paginatedStudents = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredStudents.value.slice(start, start + perPage)
})

function openEditModal(student) {
  editData.value = { ...student }
  editModal.value = true
}

async function saveEdit() {
  if (!editData.value.full_name || !editData.value.email) {
    alert('Full name and email are required.')
    return
  }

  try {
    await editStudent(editData.value.id, editData.value)
    await loadStudents()
    editModal.value = false
  } catch (err) {
    console.error('Error editing student:', err)
  }
}

async function deleteStudent(id) {
  if (!confirm('Are you sure you want to delete this student?')) return
  try {
    await apiDeleteStudent(id)
    await loadStudents()
  } catch (err) {
    console.error('Error deleting student:', err)
  }
}

function formatDate(date) {
  return date ? new Date(date).toISOString().split('T')[0] : ''
}

watch(search, () => {
  currentPage.value = 1
})

onMounted(() => {
  loadStudents()
})
</script>
