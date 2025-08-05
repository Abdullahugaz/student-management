<!-- resources/js/components/Filter.vue -->
<template>
    <div class="flex flex-col">
        <label :for="id" class="text-sm font-medium text-gray-700">{{ label }}</label>
        <input
            :id="id"
            :type="type"
            :value="value"
            @input="$emit('update:modelValue', $event.target.value)"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            :class="{ 'border-red-500': error }"
            :placeholder="placeholder"
        />
        <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
    </div>
</template>

<script setup>
const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'text',
    },
    value: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
    error: {
        type: String,
        required: false,
    },
});

const emit = defineEmits(['update:modelValue']);
</script>