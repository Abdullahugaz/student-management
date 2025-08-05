<template>
    <select
        :id="id"
        class="bg-bginput dark:bg-dark-bginput border-bordercolor dark:border-dark-bordercolor focus:ring-0 focus:border-bordercolor dark:focus:border-dark-bordercolor text-darkone text-[14px] dark:text-dark-darkone rounded-lg block w-full p-2.5 placeholder-gray-400 placeholder:text-xs dark:placeholder-slate-500 placeholder:capitalize dark:focus:ring-0 disabled:bg-gray-100 border disabled:text-gray-900 disabled:cursor-not-allowed"
        @input="handleChange" 
        :value="$attrs.modelValue"
    >
        <option v-for="(option, idx) of data" :value="option?.value" :key="idx">
            {{ option?.label }}
        </option>
    </select>
</template>

<script>
export default {
    props: ['modelValue'],
    emits: ['update:modelValue'],
    props: {
        data: {
            type: Array,
            default: []
        },
        id: {
            type: String,
            default: 'select'
        }
    },

    methods: {
        handleChange(e) {
            this.$emit('update:modelValue', e.target.value)
        }
    }
}
</script>
