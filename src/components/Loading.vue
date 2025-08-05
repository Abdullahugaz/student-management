<template>
  <div v-if="show" :class="containerClasses">
    <!-- Full Page Loading -->
    <div v-if="type === 'full'" class="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90">
      <div class="text-center">
        <div class="loading-spinner mb-4"></div>
        <p v-if="message" class="text-gray-600 text-sm">{{ message }}</p>
      </div>
    </div>

    <!-- Overlay Loading -->
    <div v-else-if="type === 'overlay'" class="absolute inset-0 z-40 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
      <div class="text-center">
        <div class="loading-spinner mb-2"></div>
        <p v-if="message" class="text-gray-600 text-xs">{{ message }}</p>
      </div>
    </div>

    <!-- Inline Loading -->
    <div v-else-if="type === 'inline'" class="flex items-center justify-center py-4">
      <div class="text-center">
        <div class="loading-spinner-sm mb-2"></div>
        <p v-if="message" class="text-gray-600 text-xs">{{ message }}</p>
      </div>
    </div>

    <!-- Button Loading -->
    <div v-else-if="type === 'button'" class="flex items-center justify-center">
      <div class="loading-spinner-xs mr-2"></div>
      <span v-if="message">{{ message }}</span>
    </div>

    <!-- Skeleton Loading -->
    <div v-else-if="type === 'skeleton'" class="animate-pulse">
      <div class="space-y-3">
        <div v-for="i in skeletonLines" :key="i" 
             class="h-4 bg-gray-200 rounded"
             :class="skeletonWidths[i % skeletonWidths.length]">
        </div>
      </div>
    </div>

    <!-- Default Loading -->
    <div v-else class="flex items-center justify-center py-4">
      <div class="text-center">
        <div class="loading-spinner mb-2"></div>
        <p v-if="message" class="text-gray-600 text-sm">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useGlobalStore } from '../stores/global'

export default {
  name: 'Loading',
  props: {
    // Loading type: 'full', 'overlay', 'inline', 'button', 'skeleton'
    type: {
      type: String,
      default: 'inline',
      validator: (value) => ['full', 'overlay', 'inline', 'button', 'skeleton'].includes(value)
    },
    // Custom loading message
    message: {
      type: String,
      default: ''
    },
    // Whether to show loading (if not provided, uses global store)
    show: {
      type: Boolean,
      default: null
    },
    // For skeleton loading - number of lines
    skeletonLines: {
      type: Number,
      default: 3
    },
    // For skeleton loading - width classes
    skeletonWidths: {
      type: Array,
      default: () => ['w-full', 'w-3/4', 'w-1/2']
    },
    // Custom classes for container
    customClass: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const globalStore = useGlobalStore()

    const containerClasses = computed(() => {
      const baseClasses = 'relative'
      return `${baseClasses} ${props.customClass}`
    })

    const shouldShow = computed(() => {
      return props.show !== null ? props.show : globalStore.isLoading
    })

    return {
      containerClasses,
      shouldShow
    }
  },
  computed: {
    show() {
      return this.shouldShow
    }
  }
}
</script>

<style scoped>
.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f4f6;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

.loading-spinner-sm {
  width: 24px;
  height: 24px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

.loading-spinner-xs {
  width: 16px;
  height: 16px;
  border: 2px solid #f3f4f6;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
</style>
