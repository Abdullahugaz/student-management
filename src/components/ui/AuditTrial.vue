<template>
    <div v-if="dataShow" class="print:hidden">
        <div class="block rounded-lg bg-white p-6 shadow-sm hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.09),0_20px_40px_-4px_rgba(0,0,0,0.08)] transition dark:bg-dark-bgnav mb-8">
            <h4 class="text-darkone dark:text-dark-darkone capitalize">Add Comment</h4>
            <TextareaGroup id="comment" :inputOnly="true" v-model="comment" :rows="5" textareaStyle="resize:none;border:none" />
            <Button v-if="comment !== ''" class="btn btn-secondary btn-sm mt-3" type="button" @click="saveComment()">comment</Button>
        </div>

        <Accordion name="TimeLine" title="Activity Timeline">
            <div class="intro-x flex items-center h-10">
                <h4 class="text-sm font-medium truncate mr-5">
                    <span class="" v-if="dataLength > 0">Showing 1 to {{ showing }} of {{ dataLength }} entries </span> <span v-else>No activity found </span>
                </h4>
                <span @click="showMore()" class="ml-auto text-primary text-sm truncate cursor-pointer">{{ getAuditTrails?.length >= Number(dataLength) ? '' : Number(dataLength) > 5 ? 'Show More...' : '' }} </span>
            </div>
            <ol class="border-l dark:border-l-slate-500 border-info-100" v-for="(value, index) of getAuditTrails ?? []" :key="index">
                <li>
                    <div class="flex">
                        <div class="-ml-4 w-8 h-8 flex-none image-fit rounded-full overflow-hidden mt-7 mr-2">
                            <img src="https://randomuser.me/api/portraits/men/14.jpg" data-int="14" data-gender="men" class="come_in" />
                        </div>
                        <div class="cursor-pointer border dark:border-slate-700 transform transition duration-500 hover:scale-105 bg-white dark:bg-dark-bgnav hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] p-3 leading-0 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-full mt-2">
                            <div class="flex items-center justify-between">
                                <h3 class="font-bold text-sm text-darkone dark:text-dark-darkone">
                                    <span :class="badgeColor(value.action)">{{ value.action }} - </span>by {{ value.userName }}
                                </h3>
                                <span class="text-xs text-success ml-auto text-end">{{ formatDate(value.created_at, true) }}</span>
                            </div>
                            <p class="text-slate-500 dark:text-slate-400 mt-1 w-[50%] truncate text-xs">{{ value.comment }}</p>
                        </div>
                    </div>
                </li>
            </ol>
        </Accordion>
    </div>
</template>

<script>
import TextareaGroup from '@/components/form/TextAreaGroup.vue'
import Accordion from '@/components/ui/Accordion.vue'
import Button from '@/components/ui/Button.vue'
import axios from '@/axios'
import moment from 'moment'

export default {
    name: 'AuditTrail',

    components: {
        TextareaGroup,
        Accordion,
        Button
    },

    props: {
        show: Boolean,
        related_to: String,
        auditTrailList: Array
    },

    data() {
        return {
            dataShow: false,
            data: [],
            allData: [],
            comment: '',
            showing: 0,
            dataLength: 0
        }
    },

    watch: {
        show(val) {
            this.dataShow = val
        },
        auditTrailList(val) {
            this.allData = val ?? []
        }
    },

    computed: {
        getAuditTrails() {
            let val = this.allData ?? []
            if (Number(val.length) == 0) val = this.auditTrailList ?? []
            if (Number(val.length) > 0) {
                if (this.showing == 0) this.showing = Number(val.length) >= 5 ? 5 : Number(val.length)
                this.dataLength = Number(val.length)
                this.displayAudit(val)
            }
            // console.log(Number(val.length), this.showing)
            return this.data?.slice(0, this.showing + 1) ?? []
        }
    },

    methods: {
        saveComment() {
            let update_id = this.$route.params.view
            this.allData = []
            axios
                .post(`system/auditTrail/${update_id}/${this.related_to}`, { comment: this.comment })
                .then((res) => {
                    this.allData = res.data ?? []
                    this.getAuditTrails
                    // this.allData = res.data?.slice(res.data?.length > 5 ? res.data?.length - 6 : 0, res.data?.length) ?? []
                    this.comment = ''
                })
                .catch((e) => console.log(e))
        },

        showMore() {
            this.showing = Number(this.showing) + 5
            if (Number(this.showing) > Number(this.dataLength)) this.showing = Number(this.dataLength)
            this.getAuditTrails
        },

        badgeColor(status) {
            if (status === 'save') return 'text-success'
            else if (status === 'update') return 'text-warning'
            else if (status === 'comment') return 'text-comment'
            else if (status === 'cancel') return 'text-danger'
            else return 'text-primary'
        },
        displayAudit(val) {
            if (val != '') {
                var array = val
                    ?.sort((a, b) => (a.created_at > b.created_at ? -1 : 1))
                    ?.map((value) => ({
                        ...value,
                        created_at: moment(value.created_at).format('YYYY-MM-DD HH:mm:ss'),
                        userName: value?.user?.id == this.$authUser?.id ?? 1 ? 'You' : `${value.user?.first_name} ${value.user?.last_name}`,
                        image: value?.user?.image
                    }))
                this.data = array ?? []

                return array ?? []
            }
        }
    },
    mounted() {
        setTimeout(() => {
            this.dataShow = this.show
            this.allData = this.auditTrailList
        }, 100)
    }
}
</script>
