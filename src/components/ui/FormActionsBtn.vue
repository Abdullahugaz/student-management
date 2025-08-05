<template v-if="formActionButtons">
    <button v-if="!hideSaveCancel" :class="['cursor-pointer px-3 py-2 text-xs font-medium text-center rounded-[5px]  focus:ring-4 focus:outline-none  bg-[#6c5ffc] hover:bg-[#5c4fe7] mr-1  text-white capitalize', state == 'new' && viewParam !== 'list' ? 'block' : 'hidden']" @click="submitForm()" :disabled="isFormSubmitted">
        {{ 'Save' }}
    </button>

    <button v-if="!hideSaveCancel" :class="['cursor-pointer px-3 py-2 text-xs font-medium text-center rounded-[5px]  focus:ring-4 focus:outline-none  bg-[#ffb300] hover:bg-[#ffb300d3] mr-1  text-white capitalize', state == 'updated' && viewParam !== 'list' ? 'block' : 'hidden']" @click="submitForm()" :disabled="isFormSubmitted">
        {{ 'Update' }}
    </button>

    <button v-if="!hideSaveCancel" :class="['cursor-pointer px-3 py-2 text-xs font-medium text-center rounded-[5px]  focus:ring-4 focus:outline-none  bg-[#57b170] hover:bg-[#57b150] mr-1  text-white capitalize', state == 'draft' && viewParam !== 'list' ? 'block' : 'hidden']" @click="submitForm()" :disabled="isFormSubmitted">
        {{ 'Submit' }}
    </button>

    <button v-if="!hideSaveCancel" :class="['cursor-pointer px-3 py-2 text-xs font-medium text-center rounded-[5px]  focus:ring-4 focus:outline-none  bg-[#d54b57] hover:bg-[#d54b47] mr-1  text-white capitalize', state == 'submitting' && viewParam !== 'list' ? 'block' : 'hidden']" @click="cancel()" :disabled="isFormSubmitted">
        {{ 'Cancel' }}
    </button>

    <button :class="['cursor-pointer px-3 py-2 text-xs font-medium text-center rounded-[5px]  focus:ring-4 focus:outline-none  bg-[#dc3545] hover:bg-[#c82333] mr-1  text-white capitalize', state == 'block' && viewParam !== 'list' ? 'block' : 'hidden']" @click="submitForm()" :disabled="isFormSubmitted">
        {{ 'Unblock' }}
    </button>

    <button :class="['cursor-pointer px-3 py-2 text-xs font-medium text-center rounded-[5px]  focus:ring-4 focus:outline-none  bg-[#ffc107] hover:bg-[#e0a800] mr-1  text-white capitalize', state == 'unactive' && viewParam !== 'list' ? 'block' : 'hidden']" @click="submitForm()" :disabled="isFormSubmitted">
        {{ 'Activate' }}
    </button>

    <!-- Approve button - show if not hidden and either Approve prop is true or hideApprove is false -->
    <button v-if="(Approve || !hideApprove)" :class="['cursor-pointer px-3 py-2 text-xs font-medium text-center rounded-[5px]  focus:ring-4 focus:outline-none  bg-[#57b170] hover:bg-[#57b150] mr-1  text-white capitalize', state == 'draft' && viewParam !== 'list' ? 'block' : 'hidden']" @click="approve()" :disabled="isFormSubmitted">
        {{ 'Approve' }}
    </button>

    <!-- Reject button - show if not hidden and either Reject prop is true or hideReject is false -->
    <button v-if="(Reject || !hideReject)" :class="['cursor-pointer px-3 py-2 text-xs font-medium text-center rounded-[5px]  focus:ring-4 focus:outline-none  bg-[#d54b57] hover:bg-[#d54b47] mr-1  text-white capitalize', state == 'draft' && viewParam !== 'list' ? 'block' : 'hidden']" @click="reject()" :disabled="isFormSubmitted">
        {{ 'Reject' }}
    </button>

    <!-- Print button - shown when viewParam is 'list' -->
    <button v-if="viewParam === 'list'" :class="['cursor-pointer px-3 py-2 text-xs font-medium text-center rounded-[5px] focus:ring-4 focus:outline-none bg-[#17a2b8] hover:bg-[#138496] mr-1 text-white capitalize']" @click="print()">
        {{ 'Print' }}
    </button>
</template>
<script>
export default {
    name: 'FormActionsBtn',
    emits: ['submitForm', 'cancel', 'approve', 'reject'],

    props: {
        exportName: {
            type: String,
            default: 'file'
        },
        formState: {
            type: String,
            default: ''
        },
        formActionButtons: {
            type: Boolean,
            default: true
        },
        hideSaveCancel: {
            type: Boolean,
            default: false
        },
        hideApprove: {
            type: Boolean,
            default: false
        },
        hideReject: {
            type: Boolean,
            default: false
        },
        viewParam: {
            type: String,
            default: ''
        },
        isFormSubmitted: {
            type: Boolean,
            default: false
        },
        pageContent: {
            type: Object,
            default: () => ({})
        },
        Approve: {
            type: Boolean,
            default: false
        },
        Reject: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            state: this.formState || ''
        }
    },
    
    watch: {
        formState: {
            handler(newVal) {
                this.state = newVal || ''
            },
            immediate: true
        }
    },

    methods: {
        submitForm() {
            this.$emit('submitForm')
        },

        cancel() {
            console.log('Cancel button clicked')
            // Emit cancel event instead of navigating directly
            this.$emit('cancel')
        },

        print() {
            // Set document title for print
            document.title = this.exportName
            // Trigger print
            window.print()
        },
        approve() {
            this.$emit('approve')
        },
        reject() {
            this.$emit('reject')
        }
    }
}
</script>
