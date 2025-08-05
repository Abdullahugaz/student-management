<template>
  <div class="w-full pt-36 lg:pt-32">
    <form @submit.prevent="submitForm" class="rounded-xl w-full">
      <div class="grid grid-flow-row gap-2 md:gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-12">

        <!-- Full Name -->
        <div class="col-span-6">
          <label for="full_name" class="form-label">Full Name</label>
          <input
            type="text"
            id="full_name"
            v-model="form.full_name"
            placeholder="Full Name"
            class="form-input"
          />
          <small v-for="error of v$.form.full_name?.$errors" :key="error.$uid" class="form-error">
            {{ error.$message }}
          </small>
        </div>

        <!-- Email -->
        <div class="col-span-6">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            placeholder="email@example.com"
            class="form-input"
          />
          <small v-for="error of v$.form.email?.$errors" :key="error.$uid" class="form-error">
            {{ error.$message }}
          </small>
        </div>

        <!-- Phone -->
        <div class="col-span-6">
          <label for="phone" class="form-label">Phone</label>
          <input
            type="tel"
            id="phone"
            v-model="form.phone"
            placeholder="+25212345678"
            class="form-input"
          />
          <small v-for="error of v$.form.phone?.$errors" :key="error.$uid" class="form-error">
            {{ error.$message }}
          </small>
        </div>

        <!-- Department -->
        <div class="col-span-6">
          <label for="department" class="form-label">Department</label>
          <select
            id="department"
            v-model="form.department"
            class="form-input"
          >
            <option value="">Select Department</option>
            <option value="cs">Computer Science</option>
            <option value="math">Mathematics</option>
            <option value="bio">Biology</option>
          </select>
          <small v-for="error of v$.form.department?.$errors" :key="error.$uid" class="form-error">
            {{ error.$message }}
          </small>
        </div>

        <!-- Profile Picture -->
        <div class="col-span-6">
          <label for="profile_picture" class="form-label">Profile Picture</label>
          <input
            type="file"
            id="profile_picture"
            accept="image/*"
            class="form-input"
            @change="handleProfilePictureChange"
          />
          <div v-if="profilePicturePreview" class="mt-2">
            <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300">
              <img
                :src="profilePicturePreview"
                alt="Preview"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
          <small v-for="error of v$.form.profile_picture?.$errors" :key="error.$uid" class="form-error">
            {{ error.$message }}
          </small>
        </div>

        <!-- Address -->
        <div class="col-span-6">
          <label for="address" class="form-label">Address</label>
          <input
            type="text"
            id="address"
            v-model="form.address"
            placeholder="Full Address"
            class="form-input"
          />
          <small v-for="error of v$.form.address?.$errors" :key="error.$uid" class="form-error">
            {{ error.$message }}
          </small>
        </div>
<!-- Password -->
<div class="col-span-6">
  <label for="password" class="form-label">Password</label>
  <input
    type="password"
    id="password"
    v-model="form.password"
    placeholder="Enter password"
    class="form-input"
  />
  <small v-for="error of v$.form.password?.$errors" :key="error.$uid" class="form-error">
    {{ error.$message }}
  </small>
</div>

        <!-- Status -->
        <div class="col-span-6">
          <label for="status" class="form-label">Status</label>
          <select id="status" v-model="form.status" class="form-input">
            <option value="">Select Status</option>
            <option value="draft">Draft</option>
            <option value="submitted">Submitted</option>
          </select>
        </div>

        <!-- Submission Date -->
        <div class="col-span-6">
          <label for="submission_date" class="form-label">Submission Date</label>
          <Datepicker v-model="form.submission_date" :format="'yyyy-MM-dd'" class="form-input" />
        </div>

      </div>

      <!-- Submit Buttons -->
      <div class="mt-6 flex gap-3">
        <button
          type="button"
          @click="saveAsDraft"
          class="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
        >
          Save as Draft
        </button>

        <button
          type="submit"
          class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
        >
          Submit
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
import Datepicker from 'vue3-datepicker'

const form = ref({
  full_name: '',
  email: '',
  phone: '',
  department: '',
  profile_picture: null,
  address: '',
  status: '',
  submission_date: null,
  password: '' // new
});


const profilePicturePreview = ref(null)

function handleProfilePictureChange(e) {
  const file = e.target.files[0]
  if (file) {
    form.value.profile_picture = file
    profilePicturePreview.value = URL.createObjectURL(file)
  }
}

function submitForm() {
  form.value.status = 'submitted';
  form.value.submission_date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  saveForm();
}


async function saveAsDraft() {
  form.value.status = 'draft'
  await saveForm()
}

async function saveForm() {
  const formData = new FormData()
  for (const key in form.value) {
    formData.append(key, form.value[key])
  }

  try {
    const res = await axios.post('http://localhost:5000/api/students', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    alert(`✅ Student ${form.value.status} successfully!`)
    console.log(res.data)
    resetForm()
  } catch (err) {
    console.error('❌ API error:', err.response?.data || err.message)
    alert('Error submitting form')
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
    status: '',
    submission_date: null,
    password: '',
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
    password: { required }
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
