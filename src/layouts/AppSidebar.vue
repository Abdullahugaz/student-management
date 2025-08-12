<template>
  <aside
    :class="[
      'fixed top-0 left-0 z-50 h-screen transition-all duration-300 bg-white dark:bg-blue-950 shadow-lg flex flex-col',
      isCollapsed ? 'w-20' : 'w-[17.5rem]'
    ]"
  >
    <!-- Logo and toggle -->
    <div class="flex items-center justify-between p-4">
      <img src="../assets/yiksi.png" alt="School Management Logo" class="w-12 h-12" />
      <span v-if="!isCollapsed" class="text-[17px] font-bold text-gray-800 dark:text-white">
        School Management
      </span>
      <button
        @click="emit('toggle')"
        class="ml-auto text-gray-500 dark:text-gray-300"
        aria-label="Toggle sidebar"
        :aria-expanded="!isCollapsed"
      >
        <ChevronLeft
          class="w-5 h-5 transition-transform"
          :class="isCollapsed ? 'rotate-180' : ''"
        />
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex flex-col flex-1">
      <ul class="space-y-2 p-2 flex-1">
        <!-- Dashboard -->
        <li>
          <router-link
            :to="{ name: 'app.dashboard' }"
            @click="setActive('dashboard')"
            class="flex items-center gap-3 p-2 rounded-lg transition-all"
            :class="linkClass('dashboard')"
          >
            <Home class="w-6 h-6" />
            <span v-if="!isCollapsed" class="text-sm font-medium">Dashboard</span>
          </router-link>
        </li>

        <!-- Students -->
        <li>
          <router-link
            :to="{ name: 'app.students' }"
            @click="setActive('students')"
            class="flex items-center gap-3 p-2 rounded-lg transition-all"
            :class="linkClass('students')"
          >
            <Users class="w-6 h-6" />
            <span v-if="!isCollapsed" class="text-sm font-medium">Students</span>
          </router-link>
        </li>

        <!-- Courses -->
        <li>
          <router-link
            :to="{ name: 'app.courses' }"
            @click="setActive('courses')"
            class="flex items-center gap-3 p-2 rounded-lg transition-all"
            :class="linkClass('courses')"
          >
            <BookOpen class="w-6 h-6" />
            <span v-if="!isCollapsed" class="text-sm font-medium">Courses</span>
          </router-link>
        </li>

        <!-- Instructors -->
        <li>
          <router-link
            :to="{ name: 'app.instructors' }"
            @click="setActive('instructors')"
            class="flex items-center gap-3 p-2 rounded-lg transition-all"
            :class="linkClass('instructors')"
          >
            <GraduationCap class="w-6 h-6" />
            <span v-if="!isCollapsed" class="text-sm font-medium">Instructors</span>
          </router-link>
        </li>
      </ul>

      <!-- Logout Button -->
      <div class="p-2 mt-auto border-t border-gray-200 dark:border-gray-700">
        <button
          @click="logout"
          class="w-full flex items-center justify-center p-2 
                 text-red-600 hover:bg-red-50 
                 dark:text-red-400 dark:hover:bg-red-900 
                 rounded-lg transition"
          aria-label="Log out"
        >
          <LogOut class="w-6 h-6" />
          <span v-if="!isCollapsed" class="ml-2 text-sm font-medium">Logout</span>
        </button>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Home, Users, BookOpen, GraduationCap, LogOut, ChevronLeft } from 'lucide-vue-next'

/* Destructure to avoid ESLint 'unused var' */
const { isCollapsed } = defineProps({
  isCollapsed: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['toggle'])

const route = useRoute()
const router = useRouter()

const active = ref('dashboard')

const map = {
  'app.dashboard': 'dashboard',
  'app.students': 'students',
  'app.courses': 'courses',
  'app.instructors': 'instructors'
}

function syncActiveWithRoute() {
  active.value = map[route.name] || 'dashboard'
}

function linkClass(key) {
  return active.value === key
    ? 'bg-purple-100 text-purple-700'
    : 'text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800'
}

function setActive(val) {
  active.value = val
}

function logout() {
  localStorage.removeItem('token')
  router.push({ name: 'app.login' })
  alert('✅ You have been logged out.')
}

onMounted(syncActiveWithRoute)
watch(() => route.name, syncActiveWithRoute)
</script>
