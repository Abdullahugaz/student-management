<template>
    <td :class="['px-4  py-2 text-sm text-darkone dark:text-dark-darkone border-t-0  border-l-0 border-r-0 whitespace-nowrap ', classStyle]">
        <slot></slot>
    </td>
</template>
<script>
export default {
    props: {
        classStyle: {
            type: String,
            default: 'font-normal'
        }
    }
}
</script>
