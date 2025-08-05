<template>
  <div class="w-full pt-36 lg:pt-32">
    <form @submit.prevent="submitForm" class="rounded-xl w-full">
      <div class="grid grid-flow-row gap-2 md:gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-12">
        
        <!-- Full Name -->
        <div class="col-span-6">
          <label class="form-label">Full Name</label>
          <input type="text" v-model="form.full_name" class="form-input" placeholder="Full Name" required />
        </div>

        <!-- Email -->
        <div class="col-span-6">
          <label class="form-label">Email</label>
          <input type="email" v-model="form.email" class="form-input" placeholder="email@example.com" required />
        </div>

        <!-- Phone -->
        <div class="col-span-6">
          <label class="form-label">Phone</label>
          <input type="tel" v-model="form.phone" class="form-input" placeholder="+25212345678" required />
        </div>

        <!-- Department -->
        <div class="col-span-6">
          <label class="form-label">Department</label>
          <select v-model="form.department" class="form-input" required>
            <option value="">Select Department</option>
            <option value="cs">Computer Science</option>
            <option value="math">Mathematics</option>
            <option value="bio">Biology</option>
          </select>
        </div>

        <!-- Address -->
        <div class="col-span-6">
          <label class="form-label">Address</label>
          <input type="text" v-model="form.address" class="form-input" placeholder="Full Address" required />
        </div>

        <!-- Password -->
        <div class="col-span-6">
          <label class="form-label">Password</label>
          <input type="password" v-model="form.password" class="form-input" placeholder="Enter password" required />
        </div>

        <!-- Status -->
        <div class="col-span-6">
          <label class="form-label">Status</label>
          <select v-model="form.status" class="form-input" required>
            <option value="">Select Status</option>
            <option value="draft">Draft</option>
            <option value="submitted">Submitted</option>
          </select>
        </div>

        <!-- Submission Date -->
        <div class="col-span-6" v-if="form.status === 'submitted'">
          <label class="form-label">Submission Date</label>
          <input type="date" v-model="form.submission_date" class="form-input" />
        </div>

        <!-- Profile Picture -->
        <div class="col-span-6">
          <label class="form-label">Profile Picture</label>
          <input
            type="file"
            name="profile_picture"
            accept="image/*"
            @change="handleFileChange"
            class="form-input"
            required
          />
          <div v-if="preview" class="mt-2">
            <img :src="preview" class="w-16 h-16 rounded-full border" />
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="mt-6 flex gap-3">
        <button type="button" @click="saveAsDraft" class="px-4 py-2 bg-gray-400 text-white rounded-lg">
          Save as Draft
        </button>
        <button type="submit" class="px-4 py-2 bg-primary text-white rounded-lg">
          Submit
        </button>
      </div>

      <!-- Error message -->
      <div v-if="errorMessage" class="mt-3 text-red-500 text-sm">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  full_name: '',
  email: '',
  phone: '',
  department: '',
  address: '',
  password: '',
  status: '',
  submission_date: '',
  profile_picture: null
})

const preview = ref(null)
const errorMessage = ref('')

function handleFileChange(e) {
  const file = e.target.files[0]
  if (file) {
    form.value.profile_picture = file
    preview.value = URL.createObjectURL(file)
  }
}

function submitForm() {
  form.value.status = 'submitted'
  if (!form.value.submission_date) {
    form.value.submission_date = new Date().toISOString().split('T')[0]
  }
  saveForm()
}

function saveAsDraft() {
  form.value.status = 'draft'
  saveForm()
}

async function saveForm() {
  errorMessage.value = ''
  const formData = new FormData()
  for (const key in form.value) {
    formData.append(key, form.value[key])
  }

  try {
    await axios.post('http://localhost:5000/api/students/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    alert('✅ Registration successful! Please log in.')
    router.push({ name: 'app.login' })
  } catch (err) {
    console.error('❌ API error:', err.response?.data || err.message)
    errorMessage.value = err.response?.data?.error || 'Error submitting form'
  }
}
</script>

<style scoped>
.form-label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}
.form-input {
  @apply w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500;
}
</style>
