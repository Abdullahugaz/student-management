<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Enhanced Form Example</h2>
    
    <GlobalForm 
      ref="formRef"
      :loading="isSubmitting"
      form-class="space-y-4"
      @handleSubmit="handleSubmit"
      @submitStart="onSubmitStart"
      @submitEnd="onSubmitEnd"
      @validationError="onValidationError"
    >
      <!-- Name Field -->
      <div class="form-group">
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
          Full Name *
        </label>
        <input 
          id="name"
          v-model="form.name" 
          type="text" 
          placeholder="Enter your full name"
          :class="[
            'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
            v$.form.name.$error ? 'border-red-500' : 'border-gray-300'
          ]"
          :disabled="isSubmitting"
        />
        <small v-if="v$.form.name.$error" class="text-red-500 text-sm mt-1">
          {{ v$.form.name.$errors[0].$message }}
        </small>
      </div>

      <!-- Email Field -->
      <div class="form-group">
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
          Email Address *
        </label>
        <input 
          id="email"
          v-model="form.email" 
          type="email" 
          placeholder="Enter your email"
          :class="[
            'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
            v$.form.email.$error ? 'border-red-500' : 'border-gray-300'
          ]"
          :disabled="isSubmitting"
        />
        <small v-if="v$.form.email.$error" class="text-red-500 text-sm mt-1">
          {{ v$.form.email.$errors[0].$message }}
        </small>
      </div>

      <!-- Phone Field -->
      <div class="form-group">
        <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input 
          id="phone"
          v-model="form.phone" 
          type="tel" 
          placeholder="Enter your phone number"
          :class="[
            'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
            v$.form.phone.$error ? 'border-red-500' : 'border-gray-300'
          ]"
          :disabled="isSubmitting"
        />
        <small v-if="v$.form.phone.$error" class="text-red-500 text-sm mt-1">
          {{ v$.form.phone.$errors[0].$message }}
        </small>
      </div>

      <!-- Role Field -->
      <div class="form-group">
        <label for="role" class="block text-sm font-medium text-gray-700 mb-1">
          Role *
        </label>
        <select 
          id="role"
          v-model="form.role"
          :class="[
            'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
            v$.form.role.$error ? 'border-red-500' : 'border-gray-300'
          ]"
          :disabled="isSubmitting"
        >
          <option value="">Select a role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="manager">Manager</option>
        </select>
        <small v-if="v$.form.role.$error" class="text-red-500 text-sm mt-1">
          {{ v$.form.role.$errors[0].$message }}
        </small>
      </div>

      <!-- Submit Button -->
      <div class="flex space-x-3 pt-4">
        <button 
          type="submit"
          :disabled="isSubmitting"
          class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isSubmitting" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </span>
          <span v-else>Submit Form</span>
        </button>
        
        <button 
          type="button"
          @click="resetForm"
          :disabled="isSubmitting"
          class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reset
        </button>
      </div>
    </GlobalForm>

    <!-- Programmatic Control Buttons -->
    <div class="mt-6 p-4 bg-gray-50 rounded-md">
      <h3 class="text-lg font-semibold mb-3 text-gray-800">Programmatic Control</h3>
      <div class="flex flex-wrap gap-2">
        <button 
          @click="submitForm"
          :disabled="isSubmitting"
          class="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50"
        >
          Submit Programmatically
        </button>
        <button 
          @click="toggleLoading"
          class="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700"
        >
          Toggle Loading
        </button>
        <button 
          @click="toggleDisabled"
          class="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
        >
          Toggle Disabled
        </button>
      </div>
    </div>

    <!-- Status Display -->
    <div class="mt-4 p-3 bg-blue-50 rounded-md">
      <h4 class="font-medium text-blue-800 mb-2">Form Status</h4>
      <div class="text-sm text-blue-700 space-y-1">
        <p>Loading: {{ formRef?.isLoading ? 'Yes' : 'No' }}</p>
        <p>Disabled: {{ formRef?.isDisabled ? 'Yes' : 'No' }}</p>
        <p>Validation Errors: {{ Object.keys(v$.form.$errors).length }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import GlobalForm from '@/components/ui/GlobalForm.vue'
import useVuelidate from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'

// Form data
const form = reactive({
  name: '',
  email: '',
  phone: '',
  role: ''
})

// Validation rules
const rules = {
  form: {
    name: { 
      required: helpers.withMessage('Name is required', required) 
    },
    email: { 
      required: helpers.withMessage('Email is required', required),
      email: helpers.withMessage('Please enter a valid email', email)
    },
    phone: {
      // Optional phone validation
    },
    role: { 
      required: helpers.withMessage('Role is required', required) 
    }
  }
}

// Vuelidate instance
const v$ = useVuelidate(rules, { form })

// Component state
const isSubmitting = ref(false)
const formRef = ref<InstanceType<typeof GlobalForm>>()

// Form submission handler
const handleSubmit = async (event?: Event) => {
  console.log('Form submission started', event)
  
  // Validate form
  const isValid = await v$.value.$validate()
  
  if (!isValid) {
    console.log('Validation failed:', v$.value.form.$errors)
    return
  }
  
  try {
    isSubmitting.value = true
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Form submitted successfully:', form)
    
    // Show success message
    alert('Form submitted successfully!')
    
    // Reset form
    resetForm()
    
  } catch (error) {
    console.error('Form submission failed:', error)
    alert('Form submission failed. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

// Event handlers
const onSubmitStart = () => {
  console.log('Form submission started')
}

const onSubmitEnd = () => {
  console.log('Form submission ended')
}

const onValidationError = (errors: any[]) => {
  console.error('Validation errors:', errors)
}

// Programmatic control methods
const submitForm = () => {
  formRef.value?.submit()
}

const resetForm = () => {
  formRef.value?.reset()
  v$.value.$reset()
  
  // Reset form data
  Object.assign(form, {
    name: '',
    email: '',
    phone: '',
    role: ''
  })
}

const toggleLoading = () => {
  const currentLoading = formRef.value?.isLoading || false
  formRef.value?.setLoading(!currentLoading)
}

const toggleDisabled = () => {
  const currentDisabled = formRef.value?.isDisabled || false
  formRef.value?.setDisabled(!currentDisabled)
}
</script>

<style scoped>
.form-group {
  @apply space-y-1;
}

/* Custom focus styles */
input:focus,
select:focus {
  @apply ring-2 ring-blue-500 border-blue-500;
}

/* Error state styles */
input.error,
select.error {
  @apply border-red-500 ring-red-500;
}

/* Loading state styles */
.opacity-50 {
  @apply transition-opacity duration-200;
}
</style> 