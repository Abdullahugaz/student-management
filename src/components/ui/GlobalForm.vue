<template>
  <form id="globalForm" @submit.prevent="$emit('handleSubmit')" novalidate>
    <slot></slot>
    <button type="submit" id="__submitBtn__" style="display: none"></button>
  </form>
</template>

<script>
export default {
  name: "GlobalForm",
};
</script>
