<template>
  <header
    :class="[
      'fixed top-0 z-40 h-16 flex items-center justify-between bg-gray-50 dark:bg-blue-950 px-6 py-4 shadow transition-all duration-300',
      isCollapsed ? 'ml-20 w-[calc(100%-5rem)]' : 'ml-[17.5rem] w-[calc(100%-17.5rem)]'
    ]"
  >
    <div>
   
    <h1 class="text-xl font-bold text-gray-900 dark:text-white">
      {{ pageTitle }}
    </h1>
    <p class="text-sm text-gray-500 dark:text-gray-400">
      {{ formattedDate }}
    </p>
  </div>

    <div class="flex items-center gap-4">
      <!-- Search input -->
      <div class="relative">
        <input
          type="text"
          placeholder="Search"
          class="px-6 py-2 pl-8 rounded-md  bg-white border border-gray-300 text-sm focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <svg
          class="absolute left-2 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1016.65 16.65z" />
        </svg>
      </div>

      
      

      <!-- Refresh/phone icon -->
      <button class="text-gray-500 hover:text-gray-700 dark:text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 17h5l-1.405-1.405M15 7h5l-1.405 1.405M4 12h16"/>
        </svg>
      </button>

      <!-- User avatar -->
      <div class="flex items-center gap-2">
        <img
          src="https://ui-avatars.com/api/?name=John+Smith"
          class="w-8 h-8 rounded-full"
          alt="John Smith"
        />
        <span class="text-sm font-medium text-gray-700 dark:text-white"> Abdullah Ugaz</span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    isCollapsed: Boolean
  },
    computed: {
    pageTitle() {
      return this.$route.meta.title || 'Page'
    },
    formattedDate() {
      const now = new Date()
      return now.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }
}
}
</script>

