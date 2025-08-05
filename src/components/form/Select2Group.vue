<template>
    <div :class="['flex flex-col items-center relative ', containerClass]" ref="selectWrapper">
        <div class="w-full svelte-1l8159u">
            <label v-if="hasLabel" :class="['text-darkone ml-1 dark:text-dark-darkone font-normal text-sm pb-1 capitalize', labelClass]" :for="$attrs.id">
                {{ label }}
                <span v-if="isRequired" class="text-red-400">*</span>
            </label>
            <div
                class="bg-bginput dark:bg-dark-bginput border-bordercolor dark:border-dark-bordercolor focus:ring-0 focus:border-bordercolor dark:focus:border-dark-bordercolor text-darkone text-[14px] dark:text-dark-darkone rounded-lg block w-full p-3 border placeholder-gray-400 placeholder:text-sm dark:placeholder-dark-secondary dark:focus:ring-0"
                :class="disabled == true ? 'disabled:bg-bgcolor  disabled:text-darkone disabled:cursor-not-allowed' : ''"
                style="margin-top: 5px; min-height: 40px"
            >
                <div class="flex flex-auto flex-wrap whitespace-nowrap" @click="isOpen = true">
                    <div v-if="selectedOption?.value == null" class="text-darkone dark:text-dark-darkone font-normal text-sm flex justify-center items-center border-[#F1F6F9]">Select Option</div>
                    <div v-else class="text-darkone dark:text-dark-darkone font-normal text-sm flex justify-center items-center border-[#F1F6F9]">
                        {{ selectedOption.label }}
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isOpen && !disabled" class="absolute h-48 top-100 mt-1 z-[50] lef-0 max-h-select overflow-y-auto w-full dark:placeholder:text-zinc-100/6 top-15 dark:bg-dark-bgnav dark:border-dark-bordercolor dark:text-dark-darkone top-15 bg-bgnav border border-bordercolor rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <input
                v-model="search"
                type="text"
                placeholder="Search option"
                class="bg-bginput dark:bg-dark-bginput border-bordercolor dark:border-dark-bordercolor focus:ring-0 focus:border-bordercolor dark:focus:border-dark-bordercolor text-darkone text-sm dark:text-dark-darkone block w-full p-2.5 border border-b-0 placeholder-secondary placeholder:text-[13px] dark:placeholder-secondary placeholder:capitalize dark:focus:ring-0 disabled:bg-comment disabled:text-darkone disabled:cursor-not-allowed"
            />
            <div class="flex flex-col w-full">
                <div v-for="(option, index) of data" :key="index" class="cursor-pointer w-full">
                    <div @click="updateSelectedOption(option)" class="hover:bg-lightprimary dark:hover:bg-dark-lightprimary flex w-full items-center relative border-t border-bordercolor dark:border-dark-bordercolor py-2 transition duration-150">
                        <div v-if="option?.label" class="w-full items-center flex">
                            <div class="mx-2 font-normal text-sm leading-6">{{ option?.label }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <small :class="['text-red-400 ml-1', errorClass]" v-for="error of errors" :key="error.$uid">{{ error.$message }}</small>
</template>

<style>
.top-100 {
    top: 100%;
}

.bottom-100 {
    bottom: 100%;
}

.max-h-select {
    max-height: 300px;
}
</style>
<script>
import Input from './Input.vue'
export default {
    components: {
        Input
    },
    emits: ['update:modelValue'],
    inheritAttrs: false,
    props: {
        modelValue: String,
        label: String,
        labelClass: String,
        containerClass: String,
        isRequired: Boolean,
        data: Array,
        disabled: {
            default: false,
            type: Boolean
        },
        hasLabel: {
            default: true,
            type: Boolean
        },
        errors: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            isOpen: false,
            search: '',
            selectedOption: null
        }
    },

    watch: {
        modelValue(val) {
            if (this.data?.length > 0) this.selectedOption = this.data.filter((option) => option.value == val)[0]
        },
        data(val) {
            this.selectedOption = val.filter((op) => op.value == this.modelValue)[0]
        },
        selectedOption(val) {
            this.$emit('update:modelValue', val?.value ?? '')
        }
    },

    computed: {
        getHint() {
            return this.hint ?? 'Select Option'
        }
    },

    methods: {
        updateSelectedOption(option) {
            this.selectedOption = option
            this.isOpen = false
        },
        handleClickOutside(event) {
            if (this.$refs.selectWrapper && this.$refs.selectWrapper.contains && !this.$refs.selectWrapper.contains(event.target)) {
                this.isOpen = false
            }
        }
    },

    mounted() {
        try {
            if (this.data?.length > 0) this.selectedOption = this.data?.filter((op) => op.value == this.modelValue)[0]
            document.addEventListener('click', this.handleClickOutside)
        } catch (error) {
            console.error('Error in Select2Group mounted:', error)
        }
    },

    beforeUnmount() {
        try {
            document.removeEventListener('click', this.handleClickOutside)
        } catch (error) {
            console.error('Error in Select2Group beforeUnmount:', error)
        }
    },

    beforeMount() {}
}
</script>
