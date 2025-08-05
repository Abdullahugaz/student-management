<template>
    <input
        :type="type"
        :id="id"
        class="bg-bginput dark:bg-dark-bginput border-bordercolor dark:border-dark-bordercolor focus:ring-0 focus:border-bordercolor dark:focus:border-dark-bordercolor text-darkone text-[14px] dark:text-dark-darkone rounded-lg block w-full p-2.5 placeholder-gray-400 placeholder:text-xs dark:placeholder-slate-500 placeholder:capitalize dark:focus:ring-0 disabled:bg-gray-100 border disabled:text-gray-900 disabled:cursor-not-allowed"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        v-bind="$attrs"
    />
</template>

<script>
export default {
    props: {
        modelValue: {
            type: String
        },
        type: {
            type: String,
            default: 'text'
        },
        id: {
            type: String,
            default: 'text'
        }
    },

    emits: ['update:modelValue']
}
</script>

<style>
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0 !important;
}
input[type='number'] {
    -moz-appearance: textfield !important;
}

/* .scrollbar-black::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    background-color: #000;
} */
</style>
