<template>
    <div id="" style="border: none; padding: 0" class="relative">
        <div id="inputOfDatePicker">
            <Label :label="label" :labelClass="['capitalize', labelClass]" :id="$attrs.id" :isRequired="isRequired"
                :info="info" />
            <input :disabled="disabled" type="text" v-model="selectedDateTime" @focus="showPicker = true"
                placeholder="Select date and time"
                class="bg-bginput dark:bg-dark-bginput border-bordercolor dark:border-dark-bordercolor focus:ring-0 focus:border-bordercolor dark:focus:border-dark-bordercolor text-darkone text-[14px] dark:text-dark-darkone rounded-lg block w-full p-2.5 placeholder-gray-400 placeholder:text-sm dark:placeholder-dark-secondary dark:focus:ring-0 disabled:bg-gray-100 border disabled:text-gray-900 disabled:cursor-not-allowed" />
        </div>
        <div v-if="showPicker && !disabled" id="datePickerGroupContainer"
            class="dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-100 dark:placeholder:text-zinc-100/6 absolute mt-1 top-15 z-10 bg-white border border-gray-300 rounded-md shadow-lg">
            <div class="p-4">
                <div class="flex items-center justify-between mb-4">
                    <button class="text-gray-500 hover:text-gray-700 focus:outline-none" @click="prevMonth">
                        <i class="fa fa-chevron-left"></i>
                    </button>
                    <!-- <div class="text-lg font-medium">{{ currentMonth }}</div> -->
                    <select class="select dark:bg-transparent" v-model="month">
                        <template v-for="(month, index) of months" :key="index">
                            <option :value="month">{{ month }}</option>
                        </template>
                    </select>
                    <select class="select dark:bg-transparent" v-model="year">
                        <template v-for="(year, index) of years" :key="index">
                            <option :value="year">{{ year }}</option>
                        </template>
                    </select>
                    <button class="text-gray-500 hover:text-gray-700 focus:outline-none" @click="nextMonth">
                        <i class="fa fa-chevron-right"></i>
                    </button>
                </div>
                <div class="grid grid-cols-7 gap-2">
                    <div v-for="(day, index) in days" :key="index"
                        class="text-center dark:text-slate-100 font-medium text-gray-600">{{
                day }}</div>
                    <div v-for="(date, index) in dates" :key="index" @click="selectDate(date)">
                        <span v-if="date == undefined"></span>
                        <template v-else>
                            <span v-if="date === currentDay"
                                class="text-center cursor-pointer bg-primary text-white hover:bg-hoverColor transition rounded-lg py-1 px-3">{{
                date }}</span>
                            <span v-else
                                class="cursor-pointer text-center transition duration-150 hover:bg-[#ecf4f9] hover:text-darkone rounded-lg py-1 px-3">{{
                date }}</span>
                        </template>
                    </div>
                </div>
                <div class="mt-4 flex flex-row justify-between">
                    <input type="number"
                        class="dark:bg-zinc-700/50 dark:border-zinc-600 dark:text-gray-100 dark:placeholder:text-zinc-100/6 w-[80px] text-center px-4 py-0 ml-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        v-model="selectedHour" />
                    <input type="number"
                        class="dark:bg-zinc-700/50 dark:border-zinc-600 dark:text-gray-100 dark:placeholder:text-zinc-100/6 w-[80px] text-center px-4 py-0 ml-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        v-model="selectedMinute" />
                    <button type="button" @click="hidePicker"
                        class="w-[80px] text-center px-4 bg-primary hover:bg-hoverColor transition rounded-lg text-white ml-2">OK</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import Label from './Label.vue'
export default {
    props: {
        modelValue: {
            type: String
        },
        disabled: {
            default: false,
            type: Boolean
        },
        label: String,
        labelClass: String,
        containerClass: String,
        errorClass: String,
        isRequired: Boolean,
        info: String,
        withHelp: String,
        errors: {
            type: Array,
            default: () => []
        }
    },
    components: { Label },
    data() {
        return {
            selectedDateTime: '',
            selectedDate: '',
            showPicker: false,
            currentDate: new Date(),
            selectedHour: '',
            selectedMinute: '',
            time: '',
            month: '',
            year: '',
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        }
    },
    computed: {
        currentMonth() {
            return this.currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })
        },
        currentDay() {
            let day = new Date(this.selectedDate).getDate()
            if (this.months[new Date(this.selectedDate).getMonth()] != this.month) day = ''
            return day
        },
        years() {
            this.year = new Date().getFullYear()
            this.month = this.months[new Date().getMonth()]
            const year = new Date().getFullYear() + 3
            return Array.from({ length: 30 }, (v, i) => year - 30 + i + 1).sort((a, b) => b - a)
        },
        days() {
            return ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
        },
        dates() {
            this.findStartDay()
            const daysInMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate()
            let emptyDays = this.findStartDay().map((day) => {
                return (day = '')
            })
            return [...emptyDays, ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]
        }
    },
    watch: {
        selectedHour(val) {
            if (Number(val) > 23) this.selectedHour = 23
            else if (Number(val) < 0) this.selectedHour = '00'
            else {
                this.time = val + ':' + this.selectedMinute
                this.selectedDateTime = `${moment(this.selectedDate + ' ' + this.time).format('YYYY-MM-DD H:mm')}`
            }
        },
        selectedMinute(val) {
            if (Number(val) > 59) this.selectedMinute = 59
            else if (Number(val) < 0) this.selectedMinute = '00'
            else {
                this.time = this.selectedHour + ':' + val
                this.selectedDateTime = `${moment(this.selectedDate + ' ' + this.time).format('YYYY-MM-DD H:mm')}`
            }
        },
        selectedDate(val) {
            let date = moment(val).format('YYYY-MM-DD')
            this.selectedDateTime = date + ' ' + this.time
        },
        selectedDateTime(val) {
            this.$emit('update:modelValue', val)
        },
        modelValue(val) {
            if (val != '') {
                let time = val.split(' ')[1]
                this.selectedDate = val?.split(' ')[0] ?? moment().format('YYYY-MM-DD')
                this.selectedHour = time?.split(':')[0] ?? 0
                this.selectedMinute = time?.split(':')[1] ?? 0
            }
        },
        month(val) {
            this.currentDate = new Date(this.year, this.months.indexOf(val), 1)
        },
        year(val) {
            this.currentDate = new Date(val, this.months.indexOf(this.month), 1)
        }
    },
    methods: {
        hidePicker() {
            setTimeout(() => {
                this.showPicker = false
            }, 200)
        },
        prevMonth() {
            this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1)
            this.month = this.months[this.currentDate.getMonth()]
            this.year = this.currentDate.getFullYear()
        },
        nextMonth() {
            this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1)
            this.month = this.months[this.currentDate.getMonth()]
            this.year = this.currentDate.getFullYear()
        },
        selectDate(date) {
            if (date) {
                const today = new Date()
                if (this.time == '') {
                    this.selectedHour = today.getHours()
                    this.selectedMinute = today.getMinutes()
                    this.time = today.getHours() + ':' + today.getMinutes()
                }
                this.selectedDate = `${this.currentDate.getMonth() + 1}/${date}/${this.currentDate.getFullYear()}`
            }
        },
        findStartDay() {
            let date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1)
            var d = new Date(date)
            var dayName = this.days[d.getDay()]
            // console.log(date)
            // console.log(d)
            // console.log(dayName)
            // console.log(this.days.indexOf(dayName))
            return new Array(this.days.indexOf(dayName))
        }
    },
    mounted() {
        const today = new Date()
        this.selectedDate = `${this.currentDate.getMonth() + 1}/${today.getDate()}/${this.currentDate.getFullYear()}`
        if (this.time == '') {
            this.selectedHour = today.getHours()
            this.selectedMinute = today.getMinutes()
            this.time = today.getHours() + ':' + today.getMinutes()
        }
        if (this.selectedDateTime == '') this.selectedDateTime = this.modelValue
        // const v$ = this
        // document.onclick = function (e) {
        //     var container = document.getElementById('datePickerGroupContainer')
        //     var input = document.getElementById('inputOfDatePicker')
        //     if (!container.contains(e.target) && !input.contains(e.target)) {
        //         v$.showPicker = false
        //     }
        // }
    }
}
</script>

<style>
/* Customize the styles of the DatepickerGroup component using Tailwind CSS classes */
.select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 2px 30px 2px 2px;
    border: none;
    border: none !important;
}

.select:active {
    border: none !important;
}
</style>
