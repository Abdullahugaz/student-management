<template>
    <div class="relative bg-white shadow-md rounded dark:bg-dark-bgnav text-darkone w-full">
        <div class="">
            <div class="flex px-3 flex-wrap items-center space-x-3 gap-y-2 md:gap-y-0 justify-between py-6">
                <div class="flex justify-center items-center">
                    <span class="text-sm font-medium font-sans text-darkone dark:text-dark-darkone mr-2">Show</span>
                    <select name=""
                        class="w-20 py-[6px] rounded-lg dark:text-dark-darkone bg-bginput dark:bg-dark-bginput border-bordercolor dark:border-dark-bordercolor focus:ring-0 focus:border-bordercolor dark:focus:border-dark-bordercolor text-darkone text-[14px] block p-2.5 border placeholder-gray-400 placeholder:text-sm dark:placeholder-dark-secondary dark:focus:ring-0"
                        v-model="form.length">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </div>
                <!-- start filter -->
                <div class="relative">
                    <div @click="openFilter"
                        class="btn-filter px-4 py-2 rounded-lg border dark:border-dark-bordercolor border-bordercolor">
                        <div class="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-5 h-5 text-darkone dark:text-dark-darkone">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                            </svg>
                            <span class="text-darkone dark:text-dark-darkone">filter</span>
                        </div>
                    </div>
                    <div v-if="open_filter == true"
                        class="open-filter bg-white rounded dark:bg-dark-bgnav text-darkone absolute z-40 w-[300px] sm:w-[400px] lg:w-[600px] top-full right-2 p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] border border-bordercolor dark:border-dark-bordercolor h-auto max-sm:max-h-[400px] max-sm:overflow-auto">
                        <div v-for="(value, index) of filter" :key="String(index)"
                            class="mt-5 lg:mt-0 lg:flex lg:items-center max-lg:space-y-4 lg:gap-2 mb-2">
                            <div class="relative w-full">
                                <div @click="openCols(index)" :id="open - cols + index"
                                    class="btn-input-col relative w-full border-bordercolor flex items-center justify-between py-1.5 px-2 text-darkone dark:text-dark-darkone bg-bginput dark:bg-dark-bginput border  dark:border-dark-bordercolor rounded">
                                    <span class="text-sm">{{ value.col_name.value || 'id' }} </span>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </span>
                                </div>
                                <div v-if="value.input_col"
                                    class="dropdown-input-col absolute right-0 bg-bginput text-sm text- dark:bg-dark-bginput border border-bordercolor dark:border-dark-bordercolor rounded w-full top-full z-40 py-4 shadow-2xl h-auto">
                                    <div class="px-3">
                                        <input type="text" id="first_name"
                                            class="bg-bginput dark:bg-dark-bginput border border-bordercolor text-secondary text-sm font-normal  dark:border-dark-bordercolor rounded-lg block w-full py-1  placeholder-gray-400 placeholder:text-sm dark:placeholder-dark-secondary dark:focus:ring-0" />
                                    </div>
                                    <div class="mt-4 max-h-[158px] overflow-auto">
                                        <ul class="space-y-0">
                                            <li v-for="(col, index_key) of filterableColumnsList"
                                                :key="String(index_key)" @click="SelectCol(col, index)"
                                                :class="{ 'bg-primary  text-white hover:bg-primary': value.col_name.value == col.name }"
                                                class="px-4 hover:bg-blue-100 py-1.5 text-sm text-darkone dark:text-dark-darkone font-thin">
                                                {{ col.name }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="relative w-full">
                                <div @click="openConditions(index)" id="btnconditions"
                                    class=" border-bordercolor relative w-full flex items-center justify-between py-1.5 px-2 text-darkone dark:text-dark-darkone bg-bginput dark:bg-dark-bginput border  dark:border-dark-bordercolor rounded">
                                    <span class="text-sm">{{ value.condition_name }} </span>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </span>
                                </div>
                                <div id="dropdown-condition" v-if="value.input_conditions"
                                    class="absolute right-0 bg-bginput text-sm text- dark:bg-dark-bginput border border-bordercolor dark:border-dark-bordercolor rounded w-full top-full z-40 py-4 shadow-2xl h-auto">
                                    <div class="px-3">
                                        <input type="text" id="first_name"
                                            class="bg-bginput dark:bg-dark-bginput border border-bordercolor text-secondary text-sm font-normal  dark:border-dark-bordercolor rounded-lg block w-full py-1  placeholder-gray-400 placeholder:text-sm dark:placeholder-dark-secondary dark:focus:ring-0" />
                                    </div>
                                    <div class="mt-4 max-h-[158px] overflow-auto">
                                        <ul class="space-y-0">
                                            <li @click="SelectCondition('equals', index)"
                                                :class="{ 'bg-primary  text-white hover:bg-primary dark:hover:bg-dark-primary': value.condition_name == 'equals' }"
                                                class="px-4 hover:bg-blue-100  py-1.5 text-sm text-darkone dark:hover:bg-dark-bgcolor dark:text-dark-darkone font-normal">
                                                equals</li>
                                            <li @click="SelectCondition('not equals', index)"
                                                :class="{ 'bg-primary  text-white hover:bg-primary dark:hover:bg-dark-primary': value.condition_name == 'not equals' }"
                                                class="px-4 hover:bg-blue-100 py-1.5 text-sm text-darkone dark:hover:bg-dark-bgcolor dark:text-dark-darkone font-normal">
                                                not equals</li>
                                            <li @click="SelectCondition('like', index)"
                                                :class="{ 'bg-primary  text-white hover:bg-primary dark:hover:bg-dark-primary': value.condition_name == 'like' }"
                                                class="px-4 hover:bg-blue-100 py-1.5 text-sm text-darkone dark:hover:bg-dark-bgcolor dark:text-dark-darkone font-normal">
                                                like</li>
                                            <li @click="SelectCondition('not like', index)"
                                                :class="{ 'bg-primary  text-white hover:bg-primary dark:hover:bg-dark-primary': value.condition_name == 'not like' }"
                                                class="px-4 hover:bg-blue-100 py-1.5 text-sm text-darkone dark:hover:bg-dark-bgcolor dark:text-dark-darkone font-normal">
                                                not like</li>
                                            <li @click="SelectCondition('contains', index)"
                                                :class="{ 'bg-primary  text-white hover:bg-primary dark:hover:bg-dark-primary': value.condition_name == 'contains' }"
                                                class="px-4 hover:bg-blue-100 py-1.5 text-sm text-darkone dark:hover:bg-dark-bgcolor dark:text-dark-darkone font-normal">
                                                contains</li>
                                            <li @click="SelectCondition('not contains', index)"
                                                :class="{ 'bg-primary  text-white hover:bg-primary dark:hover:bg-dark-primary': value.condition_name == 'not contains' }"
                                                class="px-4 hover:bg-blue-100 py-1.5 text-sm text-darkone dark:hover:bg-dark-bgcolor dark:text-dark-darkone font-normal">
                                                not contains</li>
                                            <li @click="SelectCondition('between', index)"
                                                :class="{ 'bg-primary  text-white hover:bg-primary dark:hover:bg-dark-primary': value.condition_name == 'between' }"
                                                class="px-4 hover:bg-blue-100 py-1.5 text-sm text-darkone dark:hover:bg-dark-bgcolor dark:text-dark-darkone font-normal">
                                                between</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div v-if="value.col_name.isDate" class="w-full gap-1">
                                <DatepickerGroup v-model="value.input1" :disabled="isSubmittedMode" id="datepicker"
                                    label="date" placeholder="pick a date" isRequired />
                                <DatepickerGroup v-if="value.condition_name == 'between'" v-model="value.input2"
                                    :disabled="isSubmittedMode" id="datepicker" label="date" placeholder="pick a date"
                                    isRequired />
                            </div>
                            <div v-else class="w-full flex items-center gap-1 justify-between">
                                <input type="text" v-model="value.input1"
                                    class="py-1 px-2 text-darkone dark:text-dark-darkone bg-bginput dark:bg-dark-bginput border border-bordercolor dark:border-dark-bordercolor rounded focus:ring-0 focus:border-bordercolor" />
                                <input v-if="value.condition_name == 'between'" type="text" v-model="value.input2"
                                    class="py-1 px-2 bg-secondary rounded dark:bg-dark-bginput border-borderColor dark:border-dark-borderColor focus:ring-0 focus:border-borderColor dark:focus:border-dark-borderColor text-darkone text-[14px] dark:text-dark-darkone block w-full border-0 placeholder-gray-400 placeholder:text-sm dark:placeholder-dark-secondary dark:focus:ring-0" />
                            </div>
                        </div>

                        <div></div>

                        <hr class="my-4 border border-bordercolor dark:border-dark-bordercolor" />

                        <div class="w-full flex items-center lg:justify-between gap-4 max-lg:flex-col">
                            <div class="bg-bordercolor dark:bg-gray-600 dark:text-dark-darkone py-1 px-4 text-comment text-xs rounded-md"
                                @click="addRow">add filter</div>
                            <div class="flex items-center gap-2">
                                <div @click="clearRows" class="bg-[#d9214e] text-white py-1 px-4 text-xs rounded-md">
                                    clear filter</div>
                                <div @click="applyFilter" class="bg-primary py-1 px-4 text-white text-xs rounded-md">
                                    applay filter</div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- ende filter -->
            </div>

            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr
                            class="text-darkone dark:text-dark-darkone font-sans text-sm border-b border-t border-gray-200 border dark:border-gray-700 transition-all duration-300 bg-primary">
                            <!-- text-darkone  dark:text-dark-darkone font-sans text-sm border-b border-t border-gray-200 dark:border-darkone -->
                            <slot name="thead"></slot>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="(v, idx) of list.data" :key="idx"
                            class="transition-all duration-300 dark:bg-dark-bgcolor hover:bg-blue-100 dark:hover:bg-dark-bgsidebar border-b border dark:border-gray-700">
                            <!-- class=" hover:bg-blue-100 dark:hover:bg-dark-bgsidebar" -->

                            <slot name="tbody" :data="v"> {{ v }}</slot>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <footer class="relative">
            <div class="container mx-auto px-4 py-6 flex justify-between">
                <div class="flex items-center flex-wrap gap-4">
                    <div class="flex justify-center items-center">
                        <span class="text-sm font-medium font-sans text-darkone dark:text-dark-darkone mr-2">Show</span>
                        <select name=""
                            class="w-20 py-[6px] rounded-lg dark:text-dark-darkone bg-bgnav dark:bg-dark-bginput border-bordercolor dark:border-dark-bordercolor focus:ring-0 focus:border-bordercolor dark:focus:border-dark-bordercolor text-darkone text-[14px] block p-2.5 border placeholder-gray-400 placeholder:text-sm dark:placeholder-dark-secondary dark:focus:ring-0"
                            v-model="form.length">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                    <div class="text-sm font-medium font-sans text-darkone dark:text-dark-darkone">
                        Showing 1 to
                        <span class=""> {{ Number(form.currentPage) }} </span> of
                        {{ pageNumber.length }}
                        entries
                    </div>
                </div>

                <!-- {{ this.generatePagination(form.currentPage, form.pages) }} -->
                <nav class="">
                    <ul class="list-style-none flex" v-if="Number(form.pages) > 0">
                        <li :disabled="form.start < form.length" @click="prev()">
                            <a class="text-darkone dark:text-dark-darkone relative block rounded bg-transparent px-3 py-1.5 text-sm transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-white"
                                href="#">Previous</a>
                        </li>
                        <div class="flex justify-center items-start" v-if="pageNumber[6] == '...'">
                            <li v-for="(val, index) in pageNumber?.slice(1, 6)" :key="index">
                                <button :disabled="Number(form.currentPage) == index + 1"
                                    class="text-sm font-medium font-sans text-darkone dark:text-dark-darkone relative block rounded bg-transparent px-3 py-1.5 transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-white">
                                    {{ val }}
                                </button>
                            </li>
                            <li>
                                <a class="text-sm font-medium font-sans text-darkone dark:text-dark-darkone relative block rounded bg-transparent px-3 py-1.5 transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-white"
                                    href="#">{{ pageNumber[6] }}</a>
                            </li>
                            <li>
                                <a class="text-sm font-medium font-sans text-darkone dark:text-dark-darkone relative block rounded bg-transparent px-3 py-1.5 transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-white"
                                    href="#">{{ pageNumber[6] }}</a>
                            </li>
                            <li>
                                <button :disabled="Number(pageNumber[7]) == Number(form.currentPage) + 1"
                                    @click="goTo(pageNumber[7] - 1)"
                                    class="text-sm font-medium font-sans text-darkone dark:text-dark-darkone relative block rounded bg-transparent px-3 py-1.5 transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-white"
                                    href="#">
                                    {{ Number(pageNumber[7]) }}
                                </button>
                            </li>
                        </div>

                        <li v-else-if="pageNumber.length < 7" v-for="(val, index) in pageNumber" :key="index">
                            <button :disabled="Number(form.currentPage) == index + 1" @click="goTo(index + 1)"
                                class="text-sm font-medium font-sans text-darkone dark:text-dark-darkone relative block rounded bg-transparent px-3 py-1.5 transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-white"
                                href="#">
                                {{ index + 1 }}
                            </button>
                        </li>
                        <li v-else v-for="(val, indx) in pageNumber?.slice(1, 6)" :key="indx">
                            <button :disabled="Number(form.currentPage) == indx + 1" @click="goTo(indx + 1)"
                                class="text-sm font-medium font-sans text-darkone dark:text-dark-darkone relative block rounded bg-transparent px-3 py-1.5 transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-white"
                                href="#">
                                {{ index + 1 }}
                            </button>
                        </li>
                        <li :disabled="Number(form.start) + Number(form.length) >= form.totalRecords" @click="next()">
                            <a class="text-darkone dark:text-dark-darkone relative block rounded bg-transparent px-3 py-1.5 text-sm transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-white"
                                href="#">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    </div>
</template>

<script>
import axios from '@/axios'
import Button from '@/components/ui/Button.vue'
import DatepickerGroup from '@/components/form/DatepickerGroup.vue'

export default {
    props: {
        dataURL: {
            typeof: 'string',
            default: ''
        },
        deletedRow: {
            typeof: 'string',
            default: false
        },
        filterUrl: {
            typeof: 'string'
        },
        filterableColumns: Array,
        filterLoader: String
    },
    components: {
        Button,
        DatepickerGroup
    },
    data() {
        return {
            show: false,
            data: 5,
            form: {
                length: 5,
                pages: 0,
                start: 0,
                currentPage: 1,
                totalRecords: 0
            },
            // start of filters
            filter: [
                {
                    col_name: {
                        value: 'id',
                        isDate: false
                    },
                    input_col: false,
                    input_conditions: false,
                    columns: [],
                    condition_name: 'equals',
                    input1: '',
                    input2: '',
                    specialColumnValues: []
                }
            ],

            conditions: {
                equals: '=',
                'not equals': '!=',
                // like: "LIKE",
                like: (...args) => `LIKE '%${args.join('')}%'`,
                'not like': (...args) => `NOT LIKE '%${args.join('')}%'`,
                'greater than': '>',
                'less than': '<',
                'greater or equal': '>=',
                'less or equal': '<=',
                contains: (...args) => `IN (${args.map((value) => `'${value}'`).join(', ')})`,
                'not contains': (...args) => `NOT IN (${args.map((value) => `'${value}'`).join(', ')})`,
                between: (input1, input2) => `BETWEEN '${input1}' AND '${input2}'`
            },

            open_filter: false,

            // end of filters
            list: [],
            pageNumber: [],
            isCalling: false
        }
    },
    watch: {
        'form.length': {
            handler(val) {
                this.form.start = 0
                this.getList(this.dataURL)
            },
            immediate: false
        }
    },
    methods: {
        addRow() {
            const newDefault = {
                col_name: {
                    value: 'id',
                    isDate: false
                },
                input_col: false,
                input_conditions: false,
                columns: [],
                condition_name: 'equals',
                input1: '',
                input2: '',
                specialColumnValues: []
            }
            this.filter.push(newDefault)
        },
        clearRows() {
            this.filter = []
            this.filter.push({
                col_name: {
                    value: 'id',
                    isDate: false
                },
                input_col: false,
                input_conditions: false,
                columns: [],
                condition_name: 'equals',
                input1: '',
                input2: '',
                specialColumnValues: []
            })
            this.open_filter = false
        },
        openFilter() {
            this.open_filter = !this.open_filter
        },
        openCols(index) {
            this.filter[index].input_col = !this.filter[index].input_col
        },
        SelectCol(val, index) {
            this.filter[index].col_name = { value: val.name, isDate: val.isDate }
            this.filter[index].input1 = ''
            this.filter[index].input2 = ''
            this.filter[index].input_col = false
        },
        openConditions(index) {
            this.filter[index].input_conditions = !this.filter[index].input_conditions
        },
        SelectCondition(val, index) {
            this.filter[index].condition_name = val
            this.filter[index].input_conditions = false
        },

        next() {
            this.form.currentPage++
            this.form.start += Number(this.form.length)
            this.getList(this.dataURL)
        },
        prev() {
            this.form.currentPage--
            this.form.start -= Number(this.form.length)
            this.getList(this.dataURL)
        },
        goTo(page) {
            this.form.start = (page - 1) * this.form.length
            this.form.currentPage = page
            this.getList(this.dataURL)
        },
        applyFilter() {
            this.filterMode = true
            const v$ = this
            let conditions = []
            this.filter?.forEach((element) => {
                const formattedCondition = this.conditions[element.condition_name]
                if (typeof formattedCondition === 'string') {
                    conditions.push('`' + element.col_name.value + '`' + ` ${formattedCondition} '${element.input1}'`)
                } else if (typeof formattedCondition === 'function' && (element.condition_name === 'contains' || element.condition_name === 'not contains' || element.condition_name === 'like' || element.condition_name === 'not like')) {
                    conditions.push('`' + element.col_name.value + '`' + ` ${formattedCondition(...element.input1.split(','))}`)
                } else if (typeof formattedCondition === 'function' && element.condition_name === 'between') {
                    conditions.push('`' + element.col_name.value + '`' + ` ${formattedCondition(element.input1, element.input2)}`)
                }
            })

            this.getFilter(this.filterUrl, conditions.join(' AND '))
        },

        getList(url) {
            this.form.pages = 0
            if (!this.isCalling) {
                this.isCalling = true
                axios
                    .get(url, { params: this.form })
                    .then((res) => {
                        this.isCalling = false
                        this.updateData(res.data)
                    })
                    .catch((err) => {
                        this.isCalling = false
                        // console.log(err)
                    })
            }
        },
        getFilter(url, option) {
            this.form.pages = 0
            if (!this.isCalling) {
                this.isCalling = true
                axios
                    .post(url, { condition: option })
                    .then((res) => {
                        this.isCalling = false
                        this.updateData(res.data)
                        this.open_filter = false
                    })
                    .catch((err) => {
                        this.isCalling = false
                        // console.log(err)
                    })
            }
        },
        updateData(data) {
            this.list = data
            this.form.totalRecords = data.recordsTotal
            let pages = 0
            for (let page = 0; page < data.recordsTotal; page += Number(this.form.length)) {
                if (page >= 0) pages++
            }
            this.form.pages = pages
            this.generatePagination(this.form.currentPage, this.form.pages)
        },

        generatePagination(currentPage, totalPages) {
            if (totalPages > 0) {
                const paginationNumbers = []

                if (totalPages <= 5) {
                    for (let i = 1; i <= totalPages; i++) {
                        paginationNumbers.push(i)
                    }
                } else {
                    paginationNumbers.push(currentPage)

                    let startPage = Math.max(1, currentPage - 2)
                    let endPage = Math.min(currentPage + 2, totalPages)
                    if (startPage === 1) {
                        endPage = Math.min(5, totalPages)
                    } else if (endPage === totalPages) {
                        startPage = Math.max(1, totalPages - 4)
                    }

                    for (let i = startPage; i <= endPage; i++) {
                        paginationNumbers.push(i)
                    }

                    if (currentPage < totalPages) {
                        paginationNumbers.push('...')
                    }

                    paginationNumbers.push(totalPages)
                }
                this.pageNumber = paginationNumbers
            }
            return ''
        },
        refresh() {
            this.getList(this.dataURL)
        }
    },
    computed: {
        filterableColumnsList() {
            if (!this.filterableColumns || !Array.isArray(this.filterableColumns)) {
                return []
            }
            return this.filterableColumns.map((column) => {
                // Check if the column name contains parentheses
                const isDate = /\(.*\)/.test(column)
                // Remove parentheses from the column name
                const columnName = column.replace(/[\(\)]/g, '')
                return { name: columnName, isDate }
            })
        }
    },
    mounted() {
        this.getList(this.dataURL)

        // document.addEventListener('click', (event) => {
        //     let btnFilter = document.querySelector('.btn-filter')
        //     let openFilter = document.querySelector('.open-filter')
        //     if (!btnFilter.contains(event.target) && !openFilter.contains(event.target)){
        //         this.open_filter = false;
        //     }

        // let btnInputCol = document.querySelector('.btn-input-col')
        // let dropdownInputCol = document.querySelector('.dropdown-input-col')
        // if (!btnInputCol.contains(event.target) && !dropdownInputCol.contains(event.target)){
        //     dropdownInputCol.style.display = "none"
        // }
        // let btnConditions = document.getElementById('btnconditions');
        // let dropdownCondition = document.getElementById('dropdown-condition');
        // if (!btnConditions.contains(event.target) && !dropdownCondition.contains(event.target)){
        //     dropdownCondition.style.display = "none"
        // }

        // })
    }
}
</script>

<style lang="scss" scoped></style>