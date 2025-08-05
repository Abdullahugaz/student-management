<template>
    <button :disabled="disabled" type="button" :class="['cursor-pointer px-3 py-2 text-xs font-medium text-center text-white bg-primary rounded-[5px] hover:bg-hoverColor focus:ring-4 focus:outline-none focus:ring-blue-300  dark:hover:bg-hoverColor dark:focus:ring-blue-300', disabled && 'cursor-not-allowed text-white']"><slot></slot></button>
</template>

<script>
export default {
    props: {
        disabled: Boolean
    }
}
</script>
