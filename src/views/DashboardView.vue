<template>
  <div>
    <h1>My Todo List</h1>
    <h1 class="text-2xl font-bold mb-4">Welcome to the Student Management Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-lg font-semibold mb-2">Total Students</h2>
        <p class="text-3xl font-bold text-blue-600">120</p>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-lg font-semibold mb-2">Active Course</h2>
        <p class="text-3xl font-bold text-green-600">8</p>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-lg font-semibold mb-2">Attendance Rate</h2>
        <p class="text-3xl font-bold text-yellow-600">92%</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// In the future, you can load these stats via Pinia or an API call
</script>
