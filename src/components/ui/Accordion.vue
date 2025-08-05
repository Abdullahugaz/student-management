<template>
    <!-- <transition @enter="enter" @after-enter="afterEnter" @leave="leave" name="expand"> -->
    <div :id="accordionID" class="print:hidden bg-white dark:bg-dark-bgnav  py-4 rounded-lg box-border my-5 px-4">
        <div :id="contentID" @click="isCollapsed = !isCollapsed" class="flex items-center flex-col text-darkone dark:text-dark-darkone w-full overflow-hidden transition-all ease-out duration-500">
            <div class="flex items-center justify-between w-full cursor-pointer py-1 px-2">
                <h4 class="text-[15px] font-bold text-darkone dark:text-dark-darkone capitalize">{{ title }}</h4>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition-transform duration-300" :class="isCollapsed ? 'rotate-90' : 'rotate-0'">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </div>
        </div>
        <transition @enter="enter" @after-enter="afterEnter" @leave="leave" name="expand">
            <div v-show="isCollapsed" class="w-full transform transition duration-300 ease-in-out my-4 p-3 text-darkone dark:text-dark-darkone">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'accordion info'
        },
        name: { type: String, default: 'accordion' }
    },
    data() {
        return {
            accordionID: 'accordion',
            contentID: 'accordion-content',
            collapseID: 'accordion-collapse',
            isCollapsed: true,

            reportsOpen: true
        }
    },
    methods: {
        enter(el) {
            el.style.height = 'auto'
            const height = getComputedStyle(el).height
            el.style.height = 0

            getComputedStyle(el)

            setTimeout(() => {
                el.style.height = height
            })
        },
        afterEnter(el) {
            el.style.height = 'auto'
        },
        leave(el) {
            el.style.height = getComputedStyle(el).height
            getComputedStyle(el)
            setTimeout(() => {
                el.style.height = 0
            })
        }
    }
}
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
    transition: height 0.5s ease-in-out;
    overflow: hidden;
}
</style>
