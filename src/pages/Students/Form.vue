<template>
  <div class="w-full pt-10">
    <form @submit.prevent="submitForm" class="bg-white dark:bg-gray-800 p-6 rounded shadow">
      <div class="grid gap-4 md:grid-cols-2">
        <!-- Full Name -->
        <div>
          <label>Full Name</label>
          <input v-model="form.full_name" type="text" class="form-input" />
        </div>

        <!-- Email -->
        <div>
          <label>Email</label>
          <input v-model="form.email" type="email" class="form-input" />
        </div>

        <!-- Phone -->
        <div>
          <label>Phone</label>
          <input v-model="form.phone" type="tel" class="form-input" />
        </div>

        <!-- Department -->
        <div>
          <label>Department</label>
          <select v-model="form.department" class="form-input">
            <option value="">Select</option>
            <option value="cs">Computer Science</option>
            <option value="math">Mathematics</option>
            <option value="bio">Biology</option>
          </select>
        </div>

        <!-- Address -->
        <div>
          <label>Address</label>
          <input v-model="form.address" type="text" class="form-input" />
        </div>

        <!-- Profile Picture (Optional) -->
        <div>
          <label>Profile Picture (optional)</label>
          <input type="file" @change="handleFileChange" class="form-input" accept="image/*" />
        </div>

        <!-- Password -->
        <div>
          <label>Password</label>
          <input v-model="form.password" type="password" class="form-input" />
        </div>

        <!-- Status -->
        <div>
          <label>Status</label>
          <select v-model="form.status" class="form-input">
            <option value="draft">Draft</option>
            <option value="submitted">Submitted</option>
          </select>
        </div>

        <!-- Submission Date -->
        <div v-if="form.status === 'submitted'">
          <label>Submission Date</label>
          <input v-model="form.submission_date" type="date" class="form-input" />
        </div>
      </div>

      <div class="mt-6">
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
        <p class="text-red-500 mt-2" v-if="errorMessage">{{ errorMessage }}</p>
        <p class="text-green-500 mt-2" v-if="successMessage">{{ successMessage }}</p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createStudent } from '@/services/api'

const form = ref({
  full_name: '',
  email: '',
  phone: '',
  department: '',
  address: '',
  password: '',
  status: 'draft',
  submission_date: '',
  profile_picture: null
})

const errorMessage = ref('')
const successMessage = ref('')

function handleFileChange(e) {
  const file = e.target.files[0]
  if (file) form.value.profile_picture = file
}

async function submitForm() {
  errorMessage.value = ''
  successMessage.value = ''

  const formData = new FormData()
  for (const key in form.value) {
    if (key === 'profile_picture' && form.value.profile_picture) {
      formData.append('profile_picture', form.value.profile_picture)
    } else if (key === 'submission_date' && form.value.status === 'submitted') {
      formData.append(key, form.value.submission_date)
    } else {
      formData.append(key, form.value[key])
    }
  }

  try {
    const res = await createStudent(formData)
    successMessage.value = res.data.message || 'Registered successfully'
  } catch (err) {
    console.error(err)
    errorMessage.value = err.response?.data?.error || 'Registration failed'
  }
}
</script>

<style scoped>
.form-input {
  @apply block w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white;
}
</style>
