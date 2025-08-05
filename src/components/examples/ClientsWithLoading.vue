<template>
    <div class="w-full">
        <!-- Global Loading for major operations -->
        <Loading type="full" />
        
        <div :class="['w-full fixed top-[40px]  transition duration-500 lg:top-[56px] left-6 lg:left-[195px] z-[50]  my-0 mx-auto mb-4', containerClass]">
            <div class="block rounded bg-bgcolor dark:bg-dark-bgcolor shadow-none transition duration-500 md:px-3 mr-12 md:ml-[80px] lg:mr-[220px]">
                <div class="flex items-center justify-between py-6 transition duration-500 md:px-0">
            <h1 class="text-2xl font-bold text-gray-900">Clients</h1>
            <div class="text-base font-light text-gray-600">
                <span>clients</span>
                <span class="text-primary">
                    {{ cPageUrl(this.$route.path, this.$route.params?.view) }}
                </span>
            </div>
                </div>
            </div>
        </div>

        <!-- Action Bar for List View -->
        <div v-if="componentBaseURL == 'list'" class="mb-6">
            <div :class="['w-full fixed top-[112px]  transition duration-500 lg:top-[123px] left-6 lg:left-[195px] z-[50]  my-0 mx-auto mb-4', containerClass]">
                <div class="block rounded bg-white shadow transition duration-500 dark:bg-dark-bgnav px-4 py-2 mr-12 md:ml-[80px] lg:mr-[220px]">
                <div class="flex items-center justify-between transition duration-500 md:px-0">
                    <h3 class="text-lg font-semibold text-gray-900">Clients</h3>
                    <div v-if="canAccess('client', 'save')">
                        <Button class="btn btn-primary text-white" @click="openForm">New record</Button>
                    </div>
                </div>
            </div>
            </div>
        </div>

        <!-- Form Header for New/Edit View -->
        <div class="mb-6" v-if="componentBaseURL == 'new'">
            <FormHeading title="clients">
                <template #actionBtn>
                    <button
                        v-if="canAccess('clients', 'delete')"
                        @click="
                            () => {
                                this.formState = 'delete'
                            }
                        "
                        :class="['cursor-pointer px-3 py-2 text-xs font-medium text-center rounded-[5px]  focus:ring-4 focus:outline-none  bg-[#d54b57] hover:bg-[#d54b47] mr-1  text-white capitalize', formState == 'draft' && componentBaseURL !== 'list' ? 'block ' : 'hidden']"
                        :disabled="isFormSubmitted"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                        </svg>
                    </button>
                    <FormActionsBtn @submitForm="submitForm" @cancel="handleCancel" :formState="formState" :viewParam="componentBaseURL" :isFormSubmitted="isFormSubmitted" />
                </template>
            </FormHeading>
        </div>

        <!-- List View with Loading -->
         <div class="max-w-8xl mt-[152px] mx-auto px-4 py-8">
        <div v-if="componentBaseURL == 'list'" class="w-full relative">
            <!-- Overlay loading for list operations -->
            <Loading v-if="listLoading" type="overlay" message="Loading clients..." />
            <List ref="clientsList" @toggle="toggle" @deletedData="deletedData" />
        </div>
        </div>

        <!-- Form View with Loading -->
        <div v-if="componentBaseURL == 'new'" class="w-full relative">
            <!-- Overlay loading for form operations -->
            <Loading v-if="formLoading" type="overlay" message="Saving client..." />
            <Form ref="clientForm" @toggle="toggle" :id="this.id" :pageUrl="'clients'" :componentBaseURL="componentBaseURL" @formStateChange="formStateChange" @formSubmitted="formSubmitted" @clientSaved="clientSaved" :formState="formState" :isUpdateMode="!isNaN(this.$route.params?.view)" />
        </div>
    </div>
</template>

<script>
import Form from '../pages/Clients/Form.vue'
import List from '../pages/Clients/List.vue'
import Button from '@/components/ui/Button.vue'
import FormHeading from '@/components/ui/FormHeading.vue'
import FormActionsBtn from '@/components/ui/FormActionsBtn.vue'
import Loading from '@/components/Loading.vue'
import loadingService from '@/helpers/loading.js'
import { canAccess } from '@/helpers/auth/index'

export default {
    components: {
        Form,
        List,
        Button,
        FormHeading,
        FormActionsBtn,
        Loading
    },
    data() {
        return {
            id: 0,
            componentBaseURL: 'list',
            formState: 'new',
            isFormSubmitted: false,
            containerClass: '',
            listLoading: false,
            formLoading: false
        }
    },
    created() {
        this.setComponentBaseURL()
        // Show loading when component is created
        this.loadInitialData()
    },
    watch: {
        $route() {
            this.setComponentBaseURL()
        }
    },
    methods: {
        async loadInitialData() {
            // Example of using loading service for initial data loading
            await loadingService.withLoading(
                async () => {
                    // Simulate initial data loading
                    await new Promise(resolve => setTimeout(resolve, 1000))
                    console.log('Initial data loaded')
                },
                'Loading application...'
            )
        },

        cPageUrl(url, newPart) {
            if (url.endsWith('/' + newPart)) {
                const parts = url.split('/' + newPart)
                const result = parts.slice(0, -1).join('')
                return result
            } else return url
        },

        async openForm() {
            // Show loading when opening form
            await loadingService.withLoading(
                async () => {
                    this.componentBaseURL = 'new'
                    this.formState = 'new'
                    this.$router.push(`${this.$route.fullPath}/new`)
                    // Simulate form loading
                    await new Promise(resolve => setTimeout(resolve, 500))
                },
                'Opening form...'
            )
        },

        toggle({ id, page }) {
            this.name = page
            this.id = id
        },

        setComponentBaseURL() {
            // Check if we're on the new route or have a view parameter
            if (this.$route.path.includes('/new') || this.$route.params?.view) {
                this.componentBaseURL = 'new'
            } else {
                this.componentBaseURL = 'list'
            }
        },

        async submitForm() {
            // Show form loading when submitting
            this.formLoading = true
            try {
                document.getElementById('__submitBtn__').click()
                // Simulate form submission
                await new Promise(resolve => setTimeout(resolve, 2000))
            } finally {
                this.formLoading = false
            }
        },

        formStateChange(status) {
            console.log('Index: Form state changed to:', status)
            this.formState = status
        },

        formSubmitted(data) {
            this.isFormSubmitted = data
        },

        canAccess(resource, action) {
            // Use the imported canAccess function
            return canAccess(resource, action);
        },

        async clientSaved() {
            // Show loading when refreshing list
            await loadingService.withLoading(
                async () => {
                    // Refresh the clients list by calling the datatable's refresh method
                    if (this.$refs.clientsList && this.$refs.clientsList.$refs && this.$refs.clientsList.$refs.datatable) {
                        this.$refs.clientsList.$refs.datatable.refresh()
                    }
                    // Simulate refresh time
                    await new Promise(resolve => setTimeout(resolve, 1000))
                },
                'Refreshing client list...'
            )
        },

        async deletedData() {
            // Show loading when deleting data
            await loadingService.withLoading(
                async () => {
                    console.log('Data deleted successfully')
                    // Optionally refresh the list
                    this.$forceUpdate()
                    // Simulate deletion time
                    await new Promise(resolve => setTimeout(resolve, 800))
                },
                'Deleting client...'
            )
        },

        async refreshClientsList() {
            // Show loading when manually refreshing
            this.listLoading = true
            try {
                // This will trigger a refresh of the clients list
                this.$forceUpdate()
                // Simulate refresh time
                await new Promise(resolve => setTimeout(resolve, 1500))
            } finally {
                this.listLoading = false
            }
        },

        handleCancel() {
            // Pass the cancel event to the Form component
            if (this.$refs.clientForm) {
                this.$refs.clientForm.handleCancel()
            }
        }
    }
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style> 