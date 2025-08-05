<template>
    <textarea type="text"
        class="border-gray-300 shadow-sm block w-full mt-2 rounded placeholder:text-sm dark:bg-zinc-700/50 dark:border-zinc-600 dark:text-zinc-100/80 dark:placeholder:text-zinc-100/80 focus:ring-1 focus:ring-offset-0 focus:ring-violet-500/30 text-sm text-gray-500"
        rows="2" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs" />
</template>

<script>
export default {
    props: ['modelValue'],
    emits: ['update:modelValue']
}
</script>
