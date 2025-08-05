<template>
    <div :class="['mb-4', containerClass]">
        <Label :label="label" :labelClass="labelClass" :id="$attrs.id" :isRequired="isRequired" :info="info" />
        <TextArea :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs" />
        <small :class="['text-red-400 ml-1', errorClass]" v-for="error of errors" :key="error.$uid">{{ error.$message
            }}</small>
    </div>
</template>

<script>
import TextArea from './TextArea.vue'
import Label from './Label.vue'

export default {
    emits: ['update:modelValue'],
    inheritAttrs: false,
    props: {
        modelValue: String,
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
    components: {
        TextArea,
        Label
    }
}
</script>
