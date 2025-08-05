<template>
    <!-- <div class="relative overflow-x-auto font-sans bg-white dark:bg-dark-bgnav shadow rounded-lg box-border p-4"></div> -->
    <Accordion name="journal_entry" title="Journal Entry">
        <table class="table text-darkone font-medium text-sm border dark:!text-secondary w-full">
            <thead>
                <tr class="text-left">
                    <th class="p-3 border dark:border-secondary dark:text-dark-darkone">Account</th>
                    <th class="p-3 border dark:border-secondary dark:text-dark-darkone">Debit</th>
                    <th class="p-3 border dark:border-secondary dark:text-dark-darkone">Credit</th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-[14px]" v-for="(data, index) of list" :key="index">
                    <td class="p-3 border dark:border-secondary dark:text-dark-darkone">
                        {{ data.name }}
                    </td>
                    <td class="p-3 border dark:border-secondary dark:text-dark-darkone">
                        {{ this.formatDigits(Math.abs(data.debit), true) }}
                    </td>
                    <td class="p-3 border dark:border-secondary dark:text-dark-darkone">
                        {{ this.formatDigits(Math.abs(data.credit), true) }}
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr class="text-[16px] font-semibold">
                    <td class="p-3 border dark:border-secondary dark:text-dark-darkone">Total</td>
                    <td class="p-3 border dark:border-secondary dark:text-dark-darkone">{{ this.formatDigits(Math.abs(totalDebits), true) }}</td>
                    <td class="p-3 border dark:border-secondary dark:text-dark-darkone">{{ this.formatDigits(Math.abs(totalCredits), true) }}</td>
                </tr>
            </tfoot>
        </table>
    </Accordion>
</template>

<script>
import ListTable from '@/components/ui/ListTable.vue'
import Accordion from '@/components/ui/Accordion.vue'
export default {
    props: {
        list: {
            typeOf: Array,
            default: []
        }
    },
    components: {
        ListTable,
        Accordion
    },
    data() {
        return {
            transList: []
        }
    },
    watch: {},

    computed: {
        totalDebits() {
            return this.list?.reduce((a, b) => Number(a) + Number(b.debit), 0)
        },
        totalCredits() {
            return this.list?.reduce((a, b) => Number(a) + Number(b.credit), 0)
        }
    },
    mounted() {}
}
</script>

<style lang="scss" scoped></style>
