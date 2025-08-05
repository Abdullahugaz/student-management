<template>
  <div class="p-6 space-y-8">
    <h1 class="text-2xl font-bold mb-6">Loading Component Examples</h1>

    <!-- Global Loading Control -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-lg font-semibold mb-4">Global Loading Control</h2>
      <div class="space-x-4">
        <button @click="showGlobalLoading" class="bg-blue-500 text-white px-4 py-2 rounded">
          Show Global Loading
        </button>
        <button @click="hideGlobalLoading" class="bg-red-500 text-white px-4 py-2 rounded">
          Hide Global Loading
        </button>
        <button @click="showLoadingFor2Seconds" class="bg-green-500 text-white px-4 py-2 rounded">
          Show for 2 seconds
        </button>
      </div>
    </div>

    <!-- Different Loading Types -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-lg font-semibold mb-4">Different Loading Types</h2>
      
      <!-- Full Page Loading -->
      <div class="mb-6">
        <h3 class="font-medium mb-2">Full Page Loading</h3>
        <button @click="showFullLoading = !showFullLoading" class="bg-purple-500 text-white px-4 py-2 rounded">
          Toggle Full Loading
        </button>
        <Loading v-if="showFullLoading" type="full" message="Loading entire page..." />
      </div>

      <!-- Overlay Loading -->
      <div class="mb-6 relative border-2 border-dashed border-gray-300 p-8 rounded">
        <h3 class="font-medium mb-2">Overlay Loading</h3>
        <p class="text-gray-600 mb-4">This is some content that will be covered by the overlay loading.</p>
        <button @click="showOverlayLoading = !showOverlayLoading" class="bg-orange-500 text-white px-4 py-2 rounded">
          Toggle Overlay Loading
        </button>
        <Loading v-if="showOverlayLoading" type="overlay" message="Processing..." />
      </div>

      <!-- Inline Loading -->
      <div class="mb-6">
        <h3 class="font-medium mb-2">Inline Loading</h3>
        <Loading v-if="showInlineLoading" type="inline" message="Loading data..." />
        <button @click="showInlineLoading = !showInlineLoading" class="bg-teal-500 text-white px-4 py-2 rounded">
          Toggle Inline Loading
        </button>
      </div>

      <!-- Button Loading -->
      <div class="mb-6">
        <h3 class="font-medium mb-2">Button Loading</h3>
        <button @click="handleButtonClick" class="bg-indigo-500 text-white px-4 py-2 rounded flex items-center">
          <Loading v-if="buttonLoading" type="button" message="Saving..." />
          <span v-else>Save Data</span>
        </button>
      </div>

      <!-- Skeleton Loading -->
      <div class="mb-6">
        <h3 class="font-medium mb-2">Skeleton Loading</h3>
        <button @click="showSkeletonLoading = !showSkeletonLoading" class="bg-pink-500 text-white px-4 py-2 rounded mb-4">
          Toggle Skeleton Loading
        </button>
        <div v-if="showSkeletonLoading" class="border p-4 rounded">
          <Loading type="skeleton" :skeleton-lines="5" />
        </div>
        <div v-else class="border p-4 rounded">
          <h4 class="font-medium">Actual Content</h4>
          <p class="text-gray-600">This is the real content that would be loaded.</p>
          <p class="text-gray-600">It replaces the skeleton loading when data is available.</p>
        </div>
      </div>
    </div>

    <!-- Async Function Example -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-lg font-semibold mb-4">Async Function with Loading</h2>
      <div class="space-x-4">
        <button @click="fetchDataWithLoading" class="bg-blue-600 text-white px-4 py-2 rounded">
          Fetch Data with Loading
        </button>
        <button @click="processDataWithLoading" class="bg-green-600 text-white px-4 py-2 rounded">
          Process Data with Loading
        </button>
      </div>
      <div v-if="data" class="mt-4 p-4 bg-gray-50 rounded">
        <h4 class="font-medium">Fetched Data:</h4>
        <pre class="text-sm">{{ JSON.stringify(data, null, 2) }}</pre>
      </div>
    </div>

    <!-- Custom Loading Messages -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-lg font-semibold mb-4">Custom Loading Messages</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button @click="showCustomLoading('Initializing application...')" class="bg-yellow-500 text-white px-4 py-2 rounded">
          Initialize App
        </button>
        <button @click="showCustomLoading('Connecting to server...')" class="bg-red-500 text-white px-4 py-2 rounded">
          Connect to Server
        </button>
        <button @click="showCustomLoading('Processing payment...')" class="bg-green-500 text-white px-4 py-2 rounded">
          Process Payment
        </button>
        <button @click="showCustomLoading('Uploading files...')" class="bg-purple-500 text-white px-4 py-2 rounded">
          Upload Files
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Loading from '../Loading.vue'
import loadingService from '../../helpers/loading.js'

export default {
  name: 'LoadingExample',
  components: {
    Loading
  },
  setup() {
    const showFullLoading = ref(false)
    const showOverlayLoading = ref(false)
    const showInlineLoading = ref(false)
    const buttonLoading = ref(false)
    const showSkeletonLoading = ref(false)
    const data = ref(null)

    const showGlobalLoading = () => {
      loadingService.show('Global loading started...')
    }

    const hideGlobalLoading = () => {
      loadingService.hide()
    }

    const showLoadingFor2Seconds = () => {
      loadingService.showFor(2000, 'Loading for 2 seconds...')
    }

    const handleButtonClick = async () => {
      buttonLoading.value = true
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      buttonLoading.value = false
    }

    const fetchDataWithLoading = async () => {
      await loadingService.withLoading(async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 3000))
        data.value = {
          id: 1,
          name: 'Sample Data',
          timestamp: new Date().toISOString()
        }
      }, 'Fetching data from server...')
    }

    const processDataWithLoading = async () => {
      await loadingService.withLoading(async () => {
        // Simulate data processing
        await new Promise(resolve => setTimeout(resolve, 2500))
        data.value = {
          ...data.value,
          processed: true,
          processedAt: new Date().toISOString()
        }
      }, 'Processing data...')
    }

    const showCustomLoading = (message) => {
      loadingService.showFor(1500, message)
    }

    return {
      showFullLoading,
      showOverlayLoading,
      showInlineLoading,
      buttonLoading,
      showSkeletonLoading,
      data,
      showGlobalLoading,
      hideGlobalLoading,
      showLoadingFor2Seconds,
      handleButtonClick,
      fetchDataWithLoading,
      processDataWithLoading,
      showCustomLoading
    }
  }
}
</script> 