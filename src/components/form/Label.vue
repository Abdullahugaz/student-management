<template>
    <label :class="['text-darkone dark:text-dark-darkone ml-1 font-normal text-sm pb-1 capitalize  mt-1.5 flex items-center space-x-2', labelClass]" :for="id">
        {{ label }}
        <span v-if="isRequired" class="text-red-400 ml-1">*</span>
        <span v-if="info" :title="info">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" icon-name="alert-circle" data-lucide="alert-circle" class="lucide lucide-alert-circle block mx-auto" style="font-size: 10px">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
        </span>
    </label>
</template>

<script>
export default {
    props: {
        label: String,
        labelClass: {
            type: [String, Array],
            default: ''
        },
        isRequired: Boolean,
        info: String,
        id: String
    }
}
</script>
