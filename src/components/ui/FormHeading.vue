<template>
    <div :class="['w-full fixed top-[120px] transition duration-500 lg:top-[135px] left-6 lg:left-[195px] z-[50] my-0 mx-auto mb-4 print:hidden', containerClass]">
        <div class="block rounded bg-white shadow transition duration-500 dark:bg-dark-bgnav px-4 py-3 mr-12 md:ml-[80px] lg:mr-[220px]">
            <div class="flex items-center justify-between transition duration-500 md:px-0">
                <div class="flex items-center justify-between">
                    <span v-if="!hide" @click="goTo()" class="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-secondary">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </span>
                    <h3 class="text-secondary text-base font-normal" :class="!hide && 'pl-2 border-l border-gray-300 dark:border-secondary'">{{ title }}</h3>
                </div>

                <div class="flex space-x-2">
                    <button class="cursor-pointer px-3 py-1 text-xs font-medium text-center rounded-[5px] focus:ring-4 focus:outline-none bg-[#ebf0f4] text-primary capitalize" title="print" @click="print()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" icon-name="printer" data-lucide="printer" class="lucide lucide-printer w-4 h-4">
                            <polyline points="6 9 6 2 18 2 18 9"></polyline>
                            <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"></path>
                            <rect x="6" y="14" width="12" height="8"></rect>
                        </svg>
                    </button>
                    <slot name="actionBtn"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        hide: {
            type: Boolean,
            default: false
        },
        containerClass: String,

        title: { type: String, default: 'form header' }
    },
    components: {},
    data() {
        return {}
    },
    methods: {
        goTo() {
            try {
                // Get the base route name without the view parameter
                const routeName = this.$route.name
                // Remove the view parameter and navigate to the list
                this.$router.push({ name: routeName })
            } catch (error) {
                console.error('Error in FormHeading goTo:', error)
            }
        },
        print() {
            try {
                window.print()
            } catch (error) {
                console.error('Error in FormHeading print:', error)
            }
        }
    },
    mounted() {}
}
</script>

<style></style>
