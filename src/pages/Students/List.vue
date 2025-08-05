<template>
  <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead class="bg-gray-50 dark:bg-gray-700">
        <tr>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Profile</th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Full Name</th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Email</th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Phone</th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Department</th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Address</th>
             <th class="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Status</th>
                <th class="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Submission Date</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
        <tr v-for="student in students" :key="student._id" class="hover:bg-gray-100 dark:hover:bg-gray-600">
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
          <td class="px-4 py-2 text-gray-900 dark:text-gray-200">{{ student.submission_date }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Empty state -->
    <div v-if="students.length === 0" class="text-center py-6 text-gray-500 dark:text-gray-400">
      No students found.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const students = ref([])

async function fetchStudents() {
  try {
    const res = await axios.get('http://localhost:5000/api/students')
    students.value = res.data
  } catch (err) {
    console.error('Error fetching students:', err)
  }
}

onMounted(fetchStudents)
</script>
