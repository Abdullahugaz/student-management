<template>
  <div class="w-full pt-10">
    <form @submit.prevent="submitForm" class="bg-white dark:bg-gray-800 p-6 rounded shadow">
      <div class="grid gap-4 md:grid-cols-2">
        <!-- Course Name -->
        <div>
          <label class="block mb-1">Course Name</label>
          <input v-model.trim="form.course_name" type="text" class="form-input" />
        </div>

        <!-- Course Code -->
        <div>
          <label class="block mb-1">Course Code</label>
          <input v-model.trim="form.course_code" type="text" class="form-input" placeholder="e.g., CSE101" />
        </div>

        <div>
          <label class="block mb-1">Department</label>
          <select v-model="form.department" class="form-input">
            <option value="">Select</option>
            <option value="cs">Computer Science</option>
            <option value="math">Mathematics</option>
            <option value="bio">Biology</option>
          </select>
        </div>

        <div>
          <label class="block mb-1">Instructor Name</label>
          <input v-model.trim="form.instructor_name" type="text" class="form-input" />
        </div>

        <div>
          <label class="block mb-1">Credits</label>
          <input v-model.number="form.credits" type="number" min="0" class="form-input" />
        </div>

        <div>
          <label class="block mb-1">Duration (weeks)</label>
          <input v-model.number="form.duration" type="number" min="1" class="form-input" />
        </div>

        <!-- Status -->
        <div>
          <label class="block mb-1">Status</label>
          <select v-model="form.status" class="form-input">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div class="md:col-span-2">
          <label class="block mb-1">Description</label>
          <input v-model.trim="form.description" type="text" class="form-input" />
          <!-- Or use a textarea -->
          <!-- <textarea v-model.trim="form.description" rows="3" class="form-input"></textarea> -->
        </div>

        <div>
          <label class="block mb-1">Capacity</label>
          <input v-model.number="form.capacity" type="number" min="1" class="form-input" />
        </div>
      </div>

      <div class="mt-6 flex items-center gap-3">
        <button :disabled="loading" type="submit" class="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60">
          <span v-if="!loading">Submit</span>
          <span v-else>Saving…</span>
        </button>
        <p class="text-red-500" v-if="errorMessage">{{ errorMessage }}</p>
        <p class="text-green-500" v-if="successMessage">{{ successMessage }}</p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { createCourse } from '@/services/api' // <-- adjust path

const router = useRouter()

const form = reactive({
  course_name: '',
  course_code: '',
  department: '',
  instructor_name: '',
  credits: null,
  duration: null,
  status: 'active', // default
  description: '',
  capacity: null,
})

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

function buildPayload() {
  const toNumber = (v) => (v === null || v === '' || isNaN(Number(v)) ? null : Number(v))
  return {
    course_name: form.course_name?.trim(),
    course_code: form.course_code?.trim(),
    department: form.department,
    instructor_name: form.instructor_name?.trim(),
    credits: toNumber(form.credits),
    duration: toNumber(form.duration),
    status: form.status,
    description: form.description?.trim() || '',
    capacity: toNumber(form.capacity),
  }
}

async function submitForm() {
  errorMessage.value = ''
  successMessage.value = ''

  if (!form.course_name || !form.department || !form.instructor_name) {
    errorMessage.value = 'Please fill in course name, department, and instructor.'
    return
  }

  loading.value = true
  try {
    const payload = buildPayload()
    await createCourse(payload)
    successMessage.value = 'Course saved successfully!'

    setTimeout(() => {
      router.push({ name: 'app.courses' })
    }, 800)
  } catch (e) {
    const message =
      e?.response?.data?.message ||
      e?.message ||
      'Failed to save course'
    errorMessage.value = message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.form-input {
  @apply block w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white;
}
</style>
