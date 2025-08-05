<template>
  <div :class="['flex flex-col items-center relative ', containerClass]" ref="selectWrapper">
    <label v-if="hasLabel" :class="['text-darkone ml-1 dark:text-dark-darkone font-normal text-sm pb-1 capitalize', labelClass]" :for="$attrs.id">
      {{ label }}
      <span v-if="isRequired" class="text-red-900"></span>
        <span v-if="info" :title="info">
      </span>

    </label>
    <input
      :type="'checkbox'"
      :id="id"
      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    />
  </div>
</template>

<script>
export default {
  props: {
    containerClass: { type: String, default: ''},
    hasLabel: { type: Boolean, default: false},
    label: { type: String, default: ''},
    labelClass: { type: String, default: ''},
    isRequired: { type: Boolean, default: false},
    id: { type: String, default: ''},
    modelValue: { type: String,default: ''
    }
  }
}
</script>
