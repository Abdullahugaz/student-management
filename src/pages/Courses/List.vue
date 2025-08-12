<template>
  <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
    <!-- Search -->
    <div class="flex justify-between items-center mb-4">
      <input
        v-model="search"
        type="text"
        placeholder="Search by course, code, or instructor"
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
          v-for="course in paginatedCourses"
          :key="course.id"
          class="hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <td class="px-4 py-2 text-gray-900 dark:text-gray-200">{{ course.id }}</td>
          <td class="px-4 py-2 text-gray-900 dark:text-gray-200">{{ course.course_code || '—' }}</td>
          <td class="px-4 py-2 text-gray-900 dark:text-gray-200">{{ course.course_name }}</td>
          <td class="px-4 py-2 text-gray-900 dark:text-gray-200">{{ course.department }}</td>
          <td class="px-4 py-2 text-gray-900 dark:text-gray-200">{{ course.instructor_name }}</td>
          <td class="px-4 py-2 text-gray-900 dark:text-gray-200">{{ course.credits }}</td>
          <td class="px-4 py-2 text-gray-900 dark:text-gray-200">{{ course.duration }} wk</td>
          <td class="px-4 py-2 text-gray-900 dark:text-gray-200">{{ course.capacity }}</td>
          <td class="px-4 py-2">
            <span
              class="px-2 py-0.5 rounded text-xs font-medium"
              :class="course.status === 'active'
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'"
            >
              {{ (course.status || 'inactive').toUpperCase() }}
            </span>
          </td>
          <td class="px-4 py-2 text-gray-900 dark:text-gray-200 truncate max-w-[240px]" :title="course.description">
            {{ shortDesc(course.description) }}
          </td>
          <td class="px-4 py-2 flex gap-2">
            <button @click="openEditModal(course)" class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              Edit
            </button>
            <button @click="toggleStatus(course)" class="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700">
              {{ course.status === 'active' ? 'Deactivate' : 'Activate' }}
            </button>
            <button @click="removeCourse(course.id)" class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Empty State -->
    <div v-if="!isLoading && paginatedCourses.length === 0" class="text-center py-6 text-gray-500 dark:text-gray-400">
      No courses found.
    </div>

    <!-- Pagination -->
    <div class="mt-4 flex justify-center space-x-2" v-if="totalPages > 1">
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
        <h2 class="text-lg font-bold mb-4">Edit Course</h2>
        <div class="space-y-2">
          <input v-model.trim="editData.course_name" placeholder="Course Name" class="w-full px-3 py-2 border rounded" />
          <input v-model.trim="editData.course_code" placeholder="Course Code (e.g., CSE101)" class="w-full px-3 py-2 border rounded" />
          <input v-model.trim="editData.department" placeholder="Department" class="w-full px-3 py-2 border rounded" />
          <input v-model.trim="editData.instructor_name" placeholder="Instructor" class="w-full px-3 py-2 border rounded" />
          <input v-model.number="editData.credits" type="number" min="0" placeholder="Credits" class="w-full px-3 py-2 border rounded" />
          <input v-model.number="editData.duration" type="number" min="1" placeholder="Duration (weeks)" class="w-full px-3 py-2 border rounded" />
          <input v-model.number="editData.capacity" type="number" min="1" placeholder="Capacity" class="w-full px-3 py-2 border rounded" />
          <select v-model="editData.status" class="w-full px-3 py-2 border rounded">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <textarea v-model.trim="editData.description" rows="3" placeholder="Description" class="w-full px-3 py-2 border rounded"></textarea>
        </div>
        <div class="flex justify-end mt-4 gap-2">
          <button @click="saveEdit" class="px-4 py-2 bg-green-600 text-white rounded" :disabled="saving">
            <span v-if="!saving">Save</span>
            <span v-else>Saving…</span>
          </button>
          <button @click="editModal = false" class="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { getAllCourses, updateCourse, deleteCourse as apiDeleteCourse } from '@/services/api' // adjust path if needed

const courses = ref([])
const search = ref('')
const currentPage = ref(1)
const perPage = 5
const editModal = ref(false)
const editData = ref({})
const isLoading = ref(false)
const saving = ref(false)

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'course_code', label: 'Code' },
  { key: 'course_name', label: 'Course' },
  { key: 'department', label: 'Department' },
  { key: 'instructor_name', label: 'Instructor' },
  { key: 'credits', label: 'Credits' },
  { key: 'duration', label: 'Duration' },
  { key: 'capacity', label: 'Capacity' },
  { key: 'status', label: 'Status' },
  { key: 'description', label: 'Description' },
  { key: 'actions', label: 'Actions' },
]

// Fetch courses from API
async function loadCourses() {
  try {
    isLoading.value = true
    const res = await getAllCourses()
    const list = res?.data?.data || res?.data || res
    courses.value = Array.isArray(list) ? list : []
  } catch (err) {
    console.error('Failed to load courses:', err)
    courses.value = []
  } finally {
    isLoading.value = false
  }
}

const filteredCourses = computed(() => {
  const q = search.value.toLowerCase()
  return courses.value.filter(c =>
    c.course_name?.toLowerCase().includes(q) ||
    c.course_code?.toLowerCase().includes(q) ||
    c.instructor_name?.toLowerCase().includes(q) ||
    c.department?.toLowerCase().includes(q)
  )
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredCourses.value.length / perPage)))

const paginatedCourses = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredCourses.value.slice(start, start + perPage)
})

function openEditModal(course) {
  editData.value = { ...course }
  // default status if backend omitted it
  if (!editData.value.status) editData.value.status = 'inactive'
  editModal.value = true
}

function toNumberOrNull(v) {
  return v === '' || v === null || v === undefined ? null : Number(v)
}

async function saveEdit() {
  if (!editData.value.course_name || !editData.value.department || !editData.value.instructor_name) {
    alert('Course name, department, and instructor are required.')
    return
  }
  saving.value = true
  try {
    const payload = {
      ...editData.value,
      credits: toNumberOrNull(editData.value.credits),
      duration: toNumberOrNull(editData.value.duration),
      capacity: toNumberOrNull(editData.value.capacity),
      status: editData.value.status || 'inactive',
      course_code: editData.value.course_code?.trim() || null,
    }
    await updateCourse(editData.value.id, payload)
    await loadCourses()
    editModal.value = false
  } catch (err) {
    console.error('Error editing course:', err)
    alert(err?.response?.data?.message || err.message || 'Failed to update course')
  } finally {
    saving.value = false
  }
}

async function toggleStatus(course) {
  try {
    const next = course.status === 'active' ? 'inactive' : 'active'
    await updateCourse(course.id, { status: next })
    course.status = next // optimistic UI; or reload list
  } catch (err) {
    console.error('Failed to toggle status:', err)
    alert(err?.response?.data?.message || err.message || 'Failed to toggle status')
  }
}

async function removeCourse(id) {
  if (!confirm('Are you sure you want to delete this course?')) return
  try {
    await apiDeleteCourse(id)
    await loadCourses()
  } catch (err) {
    console.error('Error deleting course:', err)
    alert(err?.response?.data?.message || err.message || 'Failed to delete course')
  }
}

function shortDesc(text) {
  if (!text) return ''
  return text.length > 80 ? text.slice(0, 80) + '…' : text
}

watch(search, () => {
  currentPage.value = 1
})

onMounted(loadCourses)
</script>
