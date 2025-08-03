<template>
  <div class="flex   text-gray-800 dark:text-white h-screen overflow-hidden">
    <!-- Sidebar -->
    <AppSidebar />

    <!-- Right section: Topbar + Content -->
    <div class="flex flex-col flex-1 h-full overflow-hidden">
      <!-- Topbar -->
      <AppTopbar />

      <!-- Main content area -->
      <div class="bg-white shadow-md flex flex-col justify-start items-center ml-[260px] h-screen">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import AppSidebar from './AppSidebar.vue';
import AppTopbar from './AppTopbar.vue';
</script>
