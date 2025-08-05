<template>
    <div  :class="['text-darkone dark:text-dark-darkone ml-1 font-normal text-sm pb-1 capitalize  mt-1.5 flex items-center space-x-2', labelClass]" >
        Hello World i'm {{ name }}  {{ labelClass }}
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String
        },
        labelClass: String
    
    }

}
</script>

<style lang="scss" scoped></style>