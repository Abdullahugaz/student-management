<template>
  <div>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="fixed inset-0 bg-black opacity-50" @click="cancel"></div>
      <div class="bg-white rounded-lg p-6 w-96 max-w-md mx-4 shadow-xl">
        <!-- Icon -->
        <div class="flex items-center justify-center mb-4">
          <div :class="iconClasses" class="w-12 h-12 rounded-full flex items-center justify-center">
            <svg v-if="icon === 'warning'" class="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
            <svg v-else-if="icon === 'danger'" class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
            <svg v-else-if="icon === 'success'" class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <svg v-else class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
            </svg>
          </div>
        </div>

        <!-- Title -->
        <h2 class="text-xl font-semibold text-gray-900 mb-3 text-center">{{ title }}</h2>
        
        <!-- Message -->
        <p class="text-gray-600 mb-6 text-center">{{ message }}</p>
        
        <!-- Buttons -->
        <div class="flex justify-end space-x-3">
          <button 
            @click="cancel" 
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-200 font-medium"
          >
            {{ cancelText }}
          </button>
          <button 
            @click="confirm" 
            :class="confirmButtonClasses"
            class="px-4 py-2 rounded-md transition-colors duration-200 font-medium"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmModel',
  data() {
    return {
      isOpen: false,
      title: '',
      message: '',
      icon: 'warning', // 'warning', 'danger', 'success', 'info'
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      confirmCallback: null,
      cancelCallback: null,
    };
  },
  computed: {
    iconClasses() {
      const baseClasses = 'w-12 h-12 rounded-full flex items-center justify-center'
      switch (this.icon) {
        case 'warning':
          return `${baseClasses} bg-yellow-100`
        case 'danger':
          return `${baseClasses} bg-red-100`
        case 'success':
          return `${baseClasses} bg-green-100`
        default:
          return `${baseClasses} bg-blue-100`
      }
    },
    confirmButtonClasses() {
      const baseClasses = 'px-4 py-2 rounded-md transition-colors duration-200 font-medium'
      switch (this.icon) {
        case 'danger':
          return `${baseClasses} bg-red-600 text-white hover:bg-red-700`
        case 'success':
          return `${baseClasses} bg-green-600 text-white hover:bg-green-700`
        case 'warning':
          return `${baseClasses} bg-yellow-600 text-white hover:bg-yellow-700`
        default:
          return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700`
      }
    }
  },
  methods: {
    openModal({ 
      title, 
      message, 
      icon = 'warning', 
      confirmText = 'Confirm', 
      cancelText = 'Cancel', 
      onConfirm, 
      onCancel 
    }) {
      this.title = title;
      this.message = message;
      this.icon = icon;
      this.confirmText = confirmText;
      this.cancelText = cancelText;
      this.confirmCallback = onConfirm;
      this.cancelCallback = onCancel;
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
      this.title = '';
      this.message = '';
      this.confirmCallback = null;
      this.cancelCallback = null;
    },
    confirm() {
      if (this.confirmCallback) {
        this.confirmCallback();
      }
      this.closeModal();
    },
    cancel() {
      if (this.cancelCallback) {
        this.cancelCallback();
      }
      this.closeModal();
    },
  },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
  