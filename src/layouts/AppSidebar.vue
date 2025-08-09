<template>
  <aside
    :class="[
      'fixed top-0 left-0 z-50 h-screen transition-all duration-300 bg-white dark:bg-blue-950 shadow-lg flex flex-col',
      isCollapsed ? 'w-20' : 'w-[17.5rem]'
    ]"
  >
    <!-- Logo and toggle -->
    <div class="flex items-center justify-between p-4">
      <img src="../assets/yiksi.png" alt="Logo" class="w-12 h-12" />
      <span v-if="!isCollapsed" class="text-[17px] font-bold text-gray-800 dark:text-white">
        Student Management
      </span>
      <button @click="$emit('toggle')" class="ml-auto text-gray-500 dark:text-gray-300">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex flex-col flex-1">
      <ul class="space-y-2 p-2 flex-1">
        <!-- Dashboard -->
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

        <!-- Students -->
        <li>
          <router-link
            :to="{ name: 'app.students' }"
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
        <!-- <li>
          <router-link
            :to="{ name: 'app.students' }"
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
            <span v-if="!isCollapsed" class="text-sm font-medium">Courses</span>
          </router-link>
        </li> -->
        <!-- <li>
          <router-link
            :to="{ name: 'app.students' }"
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
            <span v-if="!isCollapsed" class="text-sm font-medium">Attendance</span>
          </router-link>
        </li> -->
      </ul>

      <!-- Logout Button -->
      <div class="p-2 mt-auto border-t border-gray-200 dark:border-gray-700">
        <button
          @click="logout"
          class="w-full flex items-center justify-center p-2 
                 text-red-600 hover:bg-red-50 
                 dark:text-red-400 dark:hover:bg-red-900 
                 rounded-lg transition"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
               viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7" />
          </svg>
          <span v-if="!isCollapsed" class="ml-2 text-sm font-medium">Logout</span>
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
    },
   logout() {
  localStorage.removeItem('token')
  this.$router.push({ name: 'app.login' })
  alert('✅ You have been logged out.')
}

  }
}
</script>
