    <template>
    <div class="grid grid-flow-row gap-2 md:gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-12">
        <div class="col-span-6">
            <div id="pageSize" class="block rounded-lg bg-white p-6 shadow-sm hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.09),0_20px_40px_-4px_rgba(0,0,0,0.08)] transition dark:bg-dark-bgnav mx-auto">
                <main id="sample">
                    <Editor api-key="lo6t232yz20kgh0pw47t72a2cm369q4kdeg52x6l3pjl951e" initial-value="Welcome to TinyMCE!" :init="initValue" v-model="content" />
                </main>
                <div class="w-full col-span-12 md:col-span-12 flex justify-end space-x-4">
                    <Button @click="getRenderedContent()" class="bg-primary-400 hover:bg-primary-600 border mt-5">Get Content</Button>
                </div>
            </div>
        </div>
        <div class="col-span-6">
            <div class="mt-20">
                <div class="block rounded-lg bg-white p-6 shadow-sm border dark:bg-dark-bgnav">
                    <h3 class="text-lg font-semibold mb-4">Content Preview</h3>
                    <div class="page" v-html="renderedContent"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- <br /> -->

    <!-- style="padding: 96px !important" height: 1122.52px !important  v-html="content"-->
    <!-- <div class="document" v-html="content"></div> -->
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import Button from '@/components/ui/Button.vue'

export default {
    components: { Editor, Button },
    props: {
        template: {
            type: String,
            default: ''
        },
        image: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            content: '',
            editorId: 'my-tinymce-editor',
            isEditorLoading: true,
            maxPageHeight: 800,
            intervalId: null,
            renderedContent: '',
            initValue: {
                toolbar_mode: 'sliding',
                height: '500px',
                plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Author name',
                mergetags_list: [
                    { value: 'First.Name', title: 'First Name' },
                    { value: 'Email', title: 'Email' }
                ],
                ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant'))
            }
        }
    },

    watch: {
        template(val) {
            console.log('Template changed:', val)
        },
        content: {
            handler(val) {
                this.renderedContent = val
            },
            immediate: true
        }
    },

    computed: {
        pageCount() {
            if (!this.content || !this.maxPageHeight) return 0
            return Math.ceil(this.content.length / this.maxPageHeight)
        }
    },

    methods: {
        getAlertNotify() {
            if (this.isEditorLoading) {
                const toxNotification = document.querySelector('.tox-notification__dismiss')
                if (toxNotification) {
                    this.isEditorLoading = false
                    toxNotification.click()
                }
            }
        },
        getRenderedContent() {
            try {
                const content = document.querySelector('.page')
                if (content) {
                    if (content.classList.contains('hidden')) {
                        content.classList.remove('hidden')
                    } else {
                        content.classList.add('hidden')
                    }
                }
            } catch (error) {
                console.error('Error toggling content visibility:', error)
            }
        },

        async generateDocx() {
            try {
                console.log('DOCX generation not implemented yet')
            } catch (error) {
                console.error('Error generating DOCX:', error)
            }
        }
    },

    mounted() {
        this.intervalId = setInterval(this.getAlertNotify, 100)
    },

    beforeDestroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId)
        }
    }
}
</script>
<style>
.page {
    max-width: 793.7px !important;
    max-height: 1122.52px !important;
    overflow-y: auto;
    border: 1px solid #e5e7eb;
    padding: 20px;
    background: white;
}

/* page-break-before: always; */
.text-content {
    page-break-before: always !important;
    max-height: 800px !important;
    border: solid 1px;
    overflow: hidden !important;
}
.tox-statusbar {
    display: none !important;
}
/*
@media (min-width: 1024px) {
    #sample {
        display: flex;
        flex-direction: column;
        place-items: center;
        width: 100%;
    }
} */

#sample {
    width: 100%;
}

@media (max-width: 768px) {
    .col-span-6 {
        grid-column: span 12;
    }
}
</style>
