<template>
  <div class="w-full pt-36 lg:pt-32">
    <form @submit.prevent="registerStudent" class="rounded-xl w-full">
      <div class="grid grid-flow-row gap-2 md:gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-12">
        
        <!-- Full Name -->
        <div class="col-span-6">
          <label class="form-label">Full Name</label>
          <input type="text" v-model="form.full_name" class="form-input" placeholder="Full Name" />
          <div v-if="v$.form.full_name.$error" class="form-error">Full name is required</div>
        </div>

        <!-- Email -->
        <div class="col-span-6">
          <label class="form-label">Email</label>
          <input type="email" v-model="form.email" class="form-input" placeholder="email@example.com" />
          <div v-if="v$.form.email.$error" class="form-error">Valid email is required</div>
        </div>

        <!-- Phone -->
        <div class="col-span-6">
          <label class="form-label">Phone</label>
          <input type="tel" v-model="form.phone" class="form-input" placeholder="+25212345678" />
          <div v-if="v$.form.phone.$error" class="form-error">Phone is required</div>
        </div>

        <!-- Department -->
        <div class="col-span-6">
          <label class="form-label">Department</label>
          <select v-model="form.department" class="form-input">
            <option value="">Select Department</option>
            <option value="cs">Computer Science</option>
            <option value="math">Mathematics</option>
            <option value="bio">Biology</option>
          </select>
          <div v-if="v$.form.department.$error" class="form-error">Department is required</div>
        </div>

        <!-- Address -->
        <div class="col-span-6">
          <label class="form-label">Address</label>
          <input type="text" v-model="form.address" class="form-input" placeholder="Full Address" />
          <div v-if="v$.form.address.$error" class="form-error">Address is required</div>
        </div>

        <!-- Password -->
        <div class="col-span-6">
          <label class="form-label">Password</label>
          <input type="password" v-model="form.password" class="form-input" placeholder="Enter password" />
          <div v-if="v$.form.password.$error" class="form-error">Password is required</div>
        </div>

        <!-- Hidden fields -->
        <input type="hidden" v-model="form.status" />
        <input type="hidden" v-model="form.submission_date" />

        <!-- Profile Picture -->
        <div class="col-span-6">
          <label class="form-label">Profile Picture</label>
          <input
            type="file"
            name="profile_picture"
            accept="image/*"
            @change="handleProfilePictureChange"
            class="form-input"
          />
          <div v-if="v$.form.profile_picture.$error" class="form-error">Profile picture is required</div>
          <div v-if="profilePicturePreview" class="mt-2">
            <img :src="profilePicturePreview" class="w-16 h-16 rounded-full border" />
          </div>
        </div>
      </div>

      <!-- Only one button -->
      <div class="mt-6">
        <button type="submit" class="px-4 py-2 bg-primary text-white rounded-lg">
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

// today's date
const today = new Date().toISOString().split('T')[0]

const form = ref({
  full_name: '',
  email: '',
  phone: '',
  department: '',
  profile_picture: null,
  address: '',
  status: 'draft',         // always draft
  submission_date: today,  // always today
  password: ''             // password required
})

const profilePicturePreview = ref(null)
const errorMessage = ref('')

function handleProfilePictureChange(e) {
  const file = e.target.files[0]
  if (file) {
    form.value.profile_picture = file
    profilePicturePreview.value = URL.createObjectURL(file)
  }
}

async function registerStudent() {
  const valid = await v$.value.$validate()
  if (!valid) {
    errorMessage.value = 'Please fill all required fields'
    return
  }

  const formData = new FormData()
  for (const key in form.value) {
    // ✅ ensure password is not skipped
    formData.append(key, form.value[key] ?? '')
  }

  try {
    await axios.post('http://localhost:5000/api/students', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    alert('✅ Student registered successfully!')
    resetForm()
  } catch (err) {
    console.error('❌ API error:', err.response?.data || err.message)
    errorMessage.value = err.response?.data?.error || 'Error submitting form'
  }
}

function resetForm() {
  form.value = {
    full_name: '',
    email: '',
    phone: '',
    department: '',
    profile_picture: null,
    address: '',
    status: 'draft',
    submission_date: today,
    password: ''
  }
  profilePicturePreview.value = null
}

const rules = {
  form: {
    full_name: { required },
    email: { required, email },
    phone: { required },
    department: { required },
    profile_picture: { required },
    address: { required },
    status: { required },
    submission_date: { required },
    password: { required } // ✅ now enforced
  }
}

const v$ = useVuelidate(rules, { form })
</script>


<style scoped>
.form-label {
  @apply text-darkone dark:text-dark-darkone ml-1 font-normal text-sm pb-1 capitalize mt-1.5 flex items-center space-x-2;
}
.form-input {
  @apply bg-bginput dark:bg-dark-bginput border-bordercolor dark:border-dark-bordercolor focus:ring-0 focus:border-bordercolor dark:focus:border-dark-bordercolor text-darkone text-[14px] dark:text-dark-darkone rounded-lg block w-full p-2.5 placeholder-gray-400 placeholder:text-xs dark:placeholder-slate-500 placeholder:capitalize dark:focus:ring-0 disabled:bg-gray-100 border disabled:text-gray-900 disabled:cursor-not-allowed;
}
.form-error {
  @apply text-red-400 ml-1 text-xs;
}
</style>
