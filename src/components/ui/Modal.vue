<template>
    <div v-if="isShowModal"
        class="h-screen fixed top-0 left-0 right-0 z-[200] w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 bg-[rgba(0,0,0,0.7)]"
        @close="closeModal">
        <Transition name="model">
            <div class="animate-model fixed w-full mx-auto max-w-lg max-h-full left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" >
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <header>
                        <div class="flex px-2 py-3 justify-between items-center">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ title ?? 'Modal' }}</h3>
                            <button @click="closeModal" type="button"
                                class="absolute right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="authentication-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                            </button>
                        </div>
                    </header>
                    <main>
                        <div :class="['px-3 py-6 lg:px-4', contentClass]">
                            <slot name="content"></slot>
                        </div>
                    </main>
                    <footer>
                        <slot name="footer" :closeModal="closeModal"></slot>
                    </footer>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    emits: ['onClose'],
    props: {
        isOpen: Boolean,
        title: String,
        modalClass: String,
        backdropClass: String,
        headerClass: String,
        contentClass: String,
        footerClass: String,
        position: String,
        size: String
    },
    components: {
        // Modal
    },

    data() {
        return {
            modal: null,
            isShowModal: ref(false),
        }
    },

    watch: {
        isOpen(v) {
            v && this.showModal()
        }
    },

    methods: {
        closeModal() {
            this.isShowModal = !this.isShowModal
        },

        showModal() {
            this.isShowModal = true
        }
    },

    mounted() {
        setTimeout(() => {
            this.isShowModal = this.isOpen
        }, 10)
    }
}
</script>

<style>
/* .model-enter-active {
    background-color: lightgreen;
    animation: added 1s;
}

.model-leave-active {
    background-color: lightcoral;
    animation: added 1s reverse;
}

@keyframes added {
    from {
        opacity: 0;
        translate: 0 -200px;
    }

    to {
        opacity: 1;
        translate: 0 0;
    }
} */
</style>
