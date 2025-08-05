<template>
    <div
        id="reportDataTable"
        class="bg-white print print:bg-transparent dark:print:bg-inherit dark:bg-dark-bgnav shadow-md print:shadow-transparent print:w-[44%] py-6 print:py-0 rounded-lg box-border my-4 px-4 print:px-0 print:h-auto print:!absolute print:left-[-20px] print:top-[-145px] landscape:print:left-[-260px] landscape:print:w-[70%] landscape:print:top-[-158px]"
    >
        <div class="p-5 print:p-0 mt-5">
            <div class="preview">
                <!-- top of the table  such us show length and search button -->
                <div class="flex md:w-full flex-wrap justify-center items-center noPrint-area pb-2 print:hidden">
                    <!-- show length table  -->
                    <div class="flex flex-wrap md:w-1/2 w-full items-center justify-center gap-2 sm:py-1 md:justify-start my-1">
                        <div class="text-slate-600 dark:text-slate-300 font-semibold pl-2">Show</div>
                        <select name="" id="" class="w-200 py-1 bg-transparent text-slate-600 dark:text-slate-300 font-normal border border-bordercolor dark:border-dark-bordercolor rounded-[12px]" v-model="form.length">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                    </div>

                    <!-- search data field  -->
                    <div class="flex md:w-1/2 w-full flex-wrap items-center justify-center xl:justify-end sm:space-x-3 space-y-2 md:space-y-0">
                        <div class="flex justify-center items-center xl:justify-end space-x-1 flex-wrap md:flex-nowrap">
                            <div class="text-slate-600 dark:text-slate-300 font-semibold pl-2">search</div>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <input
                                    @input="search"
                                    type="text"
                                    id="table-search-users"
                                    class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-50 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="search ..."
                                />
                            </div>
                            <div class="flex items-center pt-3 pb-2 md:pt-0 md:pb-0">
                                <button data-te-placement="bottom" data-te-ripple-init data-te-toggle="print" title="Print" @click="printData()">
                                    <i class="fa-solid fa-print text-[20px] text-primary dark:border-dark-borderColor cursor-pointer border-r px-1"></i>
                                </button>

                                <button data-te-placement="top" data-te-ripple-init data-te-toggle="pdf" title="Pdf" @click="downloadAsPDF()">
                                    <i class="fa-solid fa-file-pdf text-[20px] text-primary dark:border-dark-borderColor cursor-pointer border-r px-[6px]"></i>
                                </button>
                                <button data-te-placement="bottom" data-te-ripple-init data-te-toggle="excel" title="Excel" @click="generateExcel()">
                                    <i class="fa-solid fa-file-excel text-[20px] text-primary cursor-pointer pl-[8px]"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="hidden print:block font-bold pl-2 pr-4 py-3 w-full bg-blue-100 rounded-lg -mt-8 print:mb-8">
                    <div class="w-full flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <span>
                                <img src="@/assets/images/favayiksi.png" alt="" class="w-24 h-24" />
                            </span>
                            <div class="flex flex-col">
                                <span class="text-darkone text-2xl font-bold text-left w-full">Yiksi Swap</span>
                                <span class="flex flex-col items-center gap-0 mt-1 justify-start">
                                    <span class="text-darkone text-sm text-left w-full">Date: {{ currentDate }} </span>
                                    <span class="text-darkone text-sm text-left w-full">Name: {{ $authUser?.name }} </span>
                                </span>
                            </div>
                        </div>
                        <div class="flex flex-col items-center gap-2 justify-start">
                            <span class="text-right text-darkone text-sm w-full">Title: {{ tableName }} </span>
                            <span class="w-full text-right text-darkone text-sm"> Duration: {{ formData.startDate }} to {{ formData.endDate }} </span>
                        </div>
                    </div>
                </div>

                <!-- content data table  -->
                <div class="overflow-x-auto">
                    <table class="table-auto" style="width: 100% !important" id="globalDataTable">
                        <thead>
                            <tr class="dark:border-dark-borderColor whitespace-nowrap border-b border-t">
                                <slot name="thead"></slot>
                            </tr>
                        </thead>
                        <tbody v-if="last_data?.length > 0" class="w-full">
                            <tr v-for="(v, idx) of last_data" :key="idx" class="border-b print:border-0 dark:border-dark-borderColor text-slate-600 dark:text-slate-300 whitespace-nowrap">
                                <template v-if="idx < form.length">
                                    <slot name="tbody" :data="v" :index="idx + form.start"></slot>
                                </template>
                            </tr>
                        </tbody>
                        <tbody class="">
                            <tr class="dark:text-white">
                                <slot name="tfoot"></slot>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr class="dark:border-dark-borderColor my-1" />

                <!-- footer of the data table  such us showing the length of your list and pagination numbers -->
                <div class="grid grid-flow-row gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-12 pt-5 print:hidden">
                    <div class="col-span-6 mt-2 text-sm dark:text-white capitalize">Showing {{ form.currentPage }} 0f {{ this.form.pages }}</div>

                    <!-- pagination page  -->
                    <nav class="col-span-6 mt-2 print:hidden" aria-label="Page navigation example ">
                        <ul class="inline-flex items-center -space-x-px" style="float: right !important">
                            <li>
                                <a
                                    href="#"
                                    @click="prev()"
                                    class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    <span class="sr-only">Previous</span>
                                    <svg aria-hidden="true" class="w-5 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                    </svg>
                                </a>
                            </li>
                            <template v-for="(val, index) in pageNumber?.slice(0, 7)" :key="index">
                                <li>
                                    <a
                                        :style="Number(Number(val)) == form.currentPage ? 'background: #ccc;' : ''"
                                        href="#"
                                        @click="goTo(Number(Number(val) + 1))"
                                        class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                        >{{ val }}</a
                                    >
                                </li>
                            </template>
                            <li>
                                <a @click="next()" href="#" class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span class="sr-only">Next</span>
                                    <svg aria-hidden="true" class="w-5 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import html2pdf from 'html2pdf.js'
import jsPDF from 'jspdf'

export default {
    props: {
        list: {
            typeof: 'array',
            default: []
        },
        totals: {
            typeof: 'array',
            default: []
        },
        formData: {
            typeof: Object,
            default: {}
        },

        deletedRow: {
            typeof: 'string',
            default: false
        },
        tableName: {
            typeof: String,
            default: 'Report'
        }
    },
    components: {},
    data() {
        return {
            totalAmount: 1000, // Total amount for the invoice

            form: {
                length: 50,
                pages: 0,
                start: 0,
                currentPage: 1,
                totalRecords: 0
            },
            pageNumber: [],
            last_data: [],
            pagination: [],
            old_data: [],
            currentDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            headers: [],
            values: []
        }
    },
    watch: {
        list(val) {
            if (val) {
                this.last_data = val
                let pages = 0
                for (let page = 0; page < val.length; page += Number(this.form.length)) {
                    if (page >= 0) pages++
                }
                this.form.pages = pages
            }
        },

        'form.length': {
            handler(val) {
                let pages = 0
                for (let page = 0; page < this.list.length; page += Number(val)) {
                    if (page >= 0) pages++
                }
                this.form.pages = pages
                this.form.start = 0
                this.last_data = this.list.slice(0, val)
            }
        },

        'form.pages': {
            handler(val) {
                this.generatePagination(Number(this.form.currentPage) - 1, val)
            }
        }
    },

    methods: {
        next() {
            if (Number(this.form.currentPage * this.form.length) < Number(this.list.length)) {
                this.form.currentPage++
                this.form.start += Number(this.form.length)
                this.getList()
            }
        },
        prev() {
            if (this.form.currentPage > 1) {
                this.form.currentPage--
                this.form.start -= Number(this.form.length)
                this.getList()
            }
        },
        goTo(page) {
            if (!isNaN(page)) {
                if (this.form.currentPage == this.form.pages) page += 1
                if (this.form.currentPage != page) {
                    if (this.form.currentPage == this.form.pages) page -= 1
                    this.form.start = (page - 2) * this.form.length
                    this.form.currentPage = page - 1
                    this.getList()
                }
            }
        },
        getList() {
            let ends = Number(this.form.start) + Number(this.form.length)
            this.last_data = this.list.slice(this.form.start, ends)
            this.generatePagination(Number(this.form.currentPage) - 1, this.form.pages)
        },

        search(e) {
            const search = e.target.value

            const data = this.list.filter((item) => {
                return Object.values(item).some((value) => typeof value === 'string' && value.includes(search))
            })

            this.last_data = data
        },
        generatePagination(currentPage, totalPages) {
            const paginationNumbers = []

            if (totalPages <= Number(this.form.length)) {
                for (let i = 0; i < totalPages; i++) {
                    paginationNumbers.push(i + 1)
                }
            } else {
                paginationNumbers.push(1)
                if (currentPage < 2 || currentPage >= totalPages - 2) paginationNumbers.push(2)

                if (currentPage < totalPages) {
                    paginationNumbers.push('...')
                }

                if (currentPage > 1 && currentPage < totalPages - 1) {
                    if (currentPage < totalPages - 2) {
                        if (currentPage > 1) {
                            paginationNumbers.push(currentPage)
                            paginationNumbers.push(currentPage + 1)
                            paginationNumbers.push(currentPage + 2)
                        }

                        paginationNumbers.push('...')
                    }
                }

                if (currentPage < 2 || currentPage >= totalPages - 2) paginationNumbers.push(totalPages - 1)
                paginationNumbers.push(totalPages)
            }
            this.pageNumber = paginationNumbers
            return ''
        },

        printData() {
            window.print()
        },

        downloadAsPDF() {
            // Select the element you want to convert to PDF (could be your entire component or a specific element)
            const element = document.querySelector('#reportDataTable')
            // const document_name = 'invoice'
            const pdfOptions = {
                margin: [0, 0, -0.001, 0],
                filename: 'my-document.pdf',
                image: { type: 'jpeg', quality: 1 },
                html2canvas: { scale: 4, useCORS: true, dpi: 600, letterRendering: true },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait', putTotalPages: true }
            }
            html2pdf().set(pdfOptions).from(element).save()
        },

        generateExcel() {
            alert('excel')
        }
    },

    mounted() {
        this.last_data = this.list
    }
}
</script>

<style></style>
