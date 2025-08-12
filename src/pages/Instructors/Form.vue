<template>
  <div class="w-full pt-10">
    <div class="mb-4 flex items-center justify-between">
      <h1 class="text-xl font-semibold">Create Instructor</h1>
      <router-link :to="{ name: 'app.instructors' }" class="text-sm px-3 py-1 rounded border">
        Back to Instructors
      </router-link>
    </div>

    <form @submit.prevent="submitForm" class="bg-white dark:bg-gray-800 p-6 rounded shadow">
      <div class="grid gap-4 md:grid-cols-2">
        <div>
          <label class="block mb-1">Full Name</label>
          <input v-model.trim="form.full_name" type="text" class="form-input" />
        </div>

        <div>
          <label class="block mb-1">Email</label>
          <input v-model.trim="form.email" type="email" class="form-input" />
        </div>

        <div>
          <label class="block mb-1">Phone</label>
          <input v-model.trim="form.phone" type="tel" class="form-input" />
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
          <label class="block mb-1">Title</label>
          <input v-model.trim="form.title" type="text" class="form-input" placeholder="e.g., Senior Lecturer" />
        </div>

        <div>
          <label class="block mb-1">Status</label>
          <select v-model="form.status" class="form-input">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div class="md:col-span-2">
          <label class="block mb-1">Bio</label>
          <textarea v-model.trim="form.bio" rows="3" class="form-input" placeholder="Short bio"></textarea>
        </div>

        <div class="md:col-span-2">
          <label class="block mb-1">Profile Picture</label>
          <input @change="onFileChange" type="file" accept="image/*" class="form-input" />
          <p class="text-xs text-gray-500 mt-1">PNG/JPG up to ~2MB</p>
        </div>
      </div>

      <div class="mt-6 flex items-center gap-3">
        <button :disabled="loading" type="submit" class="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60">
          <span v-if="!loading">Create</span>
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
// If you export from a central index, keep your import.
// Otherwise this is the common path:
import { createInstructor } from '@/services/api/instructor'

const router = useRouter()

const form = reactive({
  full_name: '',
  email: '',
  phone: '',
  department: '',
  title: '',
  status: 'active',
  bio: '',
  profile_picture: null, // File
})

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// keep a ref to the input so we can clear it after submit
const fileInput = ref(null)

function onFileChange(e) {
  const file = e.target.files?.[0]
  if (!file) {
    form.profile_picture = null
    return
  }
  // validate type & size (~2MB)
  const okTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
  if (!okTypes.includes(file.type)) {
    errorMessage.value = 'Invalid image type. Use PNG/JPG/WebP.'
    e.target.value = ''
    return
  }
  const MAX = 2 * 1024 * 1024
  if (file.size > MAX) {
    errorMessage.value = 'Image too large (max 2MB).'
    e.target.value = ''
    return
  }
  form.profile_picture = file
}

function buildFormData() {
  const fd = new FormData()
  fd.append('full_name', form.full_name.trim())
  fd.append('email', form.email.trim())
  fd.append('phone', form.phone.trim())
  fd.append('department', form.department)
  fd.append('title', form.title.trim())
  fd.append('status', form.status)
  fd.append('bio', form.bio.trim())
  if (form.profile_picture) fd.append('profile_picture', form.profile_picture)
  return fd
}

function resetForm() {
  form.full_name = ''
  form.email = ''
  form.phone = ''
  form.department = ''
  form.title = ''
  form.status = 'active'
  form.bio = ''
  form.profile_picture = null
  if (fileInput.value) fileInput.value.value = ''
}

async function submitForm() {
  errorMessage.value = ''
  successMessage.value = ''

  if (!form.full_name || !form.email || !form.department) {
    errorMessage.value = 'Please fill in full name, email, and department.'
    return
  }

  loading.value = true
  try {
    const payload = buildFormData()
    await createInstructor(payload) // POST /api/instructors
    successMessage.value = 'Instructor created successfully!'
    resetForm()
    setTimeout(() => router.push({ name: 'app.instructors' }), 700)
  } catch (e) {
    errorMessage.value =
      e?.response?.data?.message || e?.message || 'Failed to create instructor'
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
