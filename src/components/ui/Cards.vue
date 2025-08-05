<template>
  <div :class="'border-'+color" class="col-span-3 flex items-center justify-center transform transition duration-500 hover:scale-105 bg-white dark:bg-dark-bgnav
   hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] leading-0 rounded-md border-b-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <div class="w-4/5 flex items-center justify-between">
                <div class="flex items-center justify-center flex-col py-4">
                    <span :class="'text-'+color" class="text-sm"> {{ name }}</span>
                    <span class="text-2xl text-darkone dark:text-dark-darkone"> {{ value }}</span>
                </div>
                <div class="">
                    <span class="text-btn-success">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                         class=" dark:text-dark-darkone" :class="'text-'+color">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                            />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    props: {
        name: String,
        value: String,
        color: String,
        icon: Object
        
    }
}
</script>

<style>

</style>