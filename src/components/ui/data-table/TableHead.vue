<template>
    <th :class="['py-3 px-4 text-[12px] whitespace-nowrap  text-white dark:text-dark-darkone uppercase text-left dark:border-dark-borderColor', classStyle]">
        <slot></slot>
    </th>
</template>

<script>
export default {
    props: {
        classStyle: {
            type: String,
            default: ''
        }
    }
}
</script>


