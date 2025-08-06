<template>
  <div class="w-full ">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4 ">
      <h1 class="text-2xl font-bold">Students</h1>
      <button
        @click="toggleView"
        class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
      >
        {{ showForm ? 'Back to List' : 'Add Student' }}
      </button>
    </div>

    <!-- List or Form -->
    <List v-if="!showForm" @refresh="refreshList" />
    <StudentForm v-else @submitted="formSubmitted" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import List from './List.vue'
import StudentForm from './Form.vue'

const showForm = ref(false)

function toggleView() {
  showForm.value = !showForm.value
}

function formSubmitted() {
  showForm.value = false
}

function refreshList() {
  // could be used if you implement a force reload in list
}
</script>
