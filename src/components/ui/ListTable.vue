<template>
    <div class="w-full">
        <div class="text-start">
            <div class="flex flex-row justify-between items-center">
                <h4 class="fw-bolder">{{ title }}</h4>
                <div class="text-center flex gap-3 pb-2" v-if="actionButtons">
                    <Button v-if="isChecked" class="bg-red-500 hover:bg-red-600 border-0 rounded-lg" @click="removeRow()" style="display: inline-block; padding: calc(0.25rem + 1px) calc(0.5rem + 1px)"> <i class="fa fa-trash" style="font-size: 12px"></i> </Button>
                    <Button v-if="isChecked" class="bg-sky-500 hover:bg-sky-600 border-0 rounded-lg" @click="duplicateRow()" style="display: inline-block; padding: calc(0.25rem + 1px) calc(0.5rem + 1px)"> <i class="fa fa-clone" style="font-size: 12px"></i> </Button>
                    <Button class="bg-primary-400 hover:bg-primary-600 border-0" @click="addROw" style="display: inline-block; padding: calc(0.25rem + 1px) calc(0.5rem + 1px)">
                        <i class="fa fa-plus" style="font-size: 12px"></i>
                    </Button>
                </div>
            </div>
        </div>
        <div class="max-w-[100vw] overflow-x-scroll !overflow-y-visible">
            <table class="table-auto text-darkone font-medium text-sm border border-bgcolor dark:text-dark-darkone w-full min-w-[800px]">
                <thead>
                    <tr class="whitespace-nowrap text-sm">
                        <slot name="thead"></slot>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(value, index) of tableList" :key="index">
                        <slot name="tbody" :data="value"></slot>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <slot name="tfoot"></slot>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>

    {{ getList }}
</template>

<script>
import Button from '@/components/ui/Button.vue'
export default {
    props: {
        title: {
            typeOf: String,
            default: 'List Table'
        },
        list: {
            typeOf: Array,
            default: []
        },
        actionButtons: {
            typeof: Boolean,
            default: true
        }
    },
    components: {
        Button
    },
    data() {
        return {
            tableList: [],
            isChecked: false
        }
    },
    watch: {
        list(val) {
            // console.log(val)
            this.tableList = val?.map((item, index) => {
                return {
                    ...item,
                    index
                }
            })
        }
    },
    computed: {
        isChecked() {
            let isChecked = this.tableList.filter((item) => item.checkbox == true)
            return isChecked.length > 0 ? true : false
        },
        newRow() {
            let newRow = { ...this.tableList[0] }
            for (let key in newRow) {
                if (typeof newRow[key] === 'string') {
                    newRow[key] = ''
                } else if (typeof newRow[key] === 'number') {
                    newRow[key] = 0
                }
            }
            newRow['checkbox'] = false
            newRow['index'] = this.tableList.length

            return newRow
        },

        getList() {
            this.tableList = this.list
            return
        }
    },
    methods: {
        addROw() {
            this.tableList.push(this.newRow)
            this.$emit('update:modelValue', this.tableList)
            this.$emit('update:list', this.tableList)
        },
        duplicateRow() {
            let checkedObjects = this.tableList?.filter((val) => val.checkbox)
            checkedObjects.map((item) => {
                item.checkbox = false
                item.index = this.tableList.length + 1
                // this.tableList.push(JSON.parse(JSON.stringify(item)))
            })
            this.tableList = [...this.tableList, ...checkedObjects]
            this.$emit('update:modelValue', this.tableList)
            this.$emit('update:list', this.tableList)
        },
        removeRow() {
            let allChecked = this.tableList.filter((item) => item.checkbox == true)
            if (allChecked.length == this.tableList.length) this.tableList = [this.newRow]
            else this.tableList = this.tableList.filter((val) => !val.checkbox)

            this.$emit('update:modelValue', this.tableList)
            this.$emit('update:list', this.tableList)
        }
    },
    mounted() {
        this.tableList = this.list
        // setTimeout(() => {
        //     this.tableList = this.list
        // }, 200)
    }
}
</script>

<style lang="scss" scoped></style>
