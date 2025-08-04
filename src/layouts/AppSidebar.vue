<template>
  <aside
    :class="[
      'fixed top-0 left-0 z-50 h-screen transition-all duration-300 bg-white dark:bg-blue-950 shadow-lg',
      isCollapsed ? 'w-20' : 'w-[17.5rem]'
    ]"
  >
    <!-- Logo and toggle -->
    <div class="flex items-center justify-between p-4">
      <img src="../assets/yiksi .png" alt="Logo" class="w-12 h-12" />
      <span v-if="!isCollapsed" class="text-[18px] font-bold text-gray-800 dark:text-white">
        Student Management
      </span>
      <button @click="$emit('toggle')" class="ml-auto text-gray-500 dark:text-gray-300">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex flex-col justify-between h-full">
      <ul class="space-y-2 p-2">
        <!-- Dashboard link -->
        <li>
          <router-link
            :to="{ name: 'app.dashboard' }"
            @click="activeLink('dashboard')"
            class="flex items-center gap-3 p-2 rounded-lg transition-all"
            :class="{
              'bg-purple-100 text-purple-700': active === 'dashboard',
              'text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800': active !== 'dashboard'
            }"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
                 viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
            </svg>
            <span v-if="!isCollapsed" class="text-sm font-medium">Dashboard</span>
          </router-link>
        </li>

        <!-- Students link -->
        <li>
          <router-link
            :to="{ name: 'app.Form' }"
            @click="activeLink('students')"
            class="flex items-center gap-3 p-2 rounded-lg transition-all"
            :class="{
              'bg-purple-100 text-purple-700': active === 'students',
              'text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800': active !== 'students'
            }"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
                 viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 14L2 9l10-5 10 5-10 5zm0 0v6m0-6l6.16-3.09A12.08 12.08 0 0112 21a12.08 12.08 0 01-6.16-10.09L12 14z" />
            </svg>
            <span v-if="!isCollapsed" class="text-sm font-medium">Students</span>
          </router-link>
        </li>
      </ul>

      <!-- Bottom button -->
      <div class="p-2 space-y-2">
        <button
          class="w-full flex items-center justify-center p-2 text-gray-500 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800 rounded-lg"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
               viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 3v1m6.364 1.636l-.707.707M21 12h-1m-1.636 6.364l-.707-.707M12 21v-1m-6.364-1.636l.707-.707M3 12h1m1.636-6.364l.707.707"/>
          </svg>
        </button>
      </div>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'AppSidebar',
  props: {
    isCollapsed: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      active: 'dashboard'
    }
  },
  methods: {
    activeLink(val) {
      this.active = val
    }
  }
}
</script>
