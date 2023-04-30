<template lang="pug">
label.app-label-rating(:style='`background-color: ${color}`') {{ '#' + text }}
</template>

<script lang="ts">
export default defineComponent({
  props: {
    // Background color
    color: {
      type: String,
      default: '',
      required: true,
    },
    // Text
    text: {
      type: String,
      default: '',
      required: true,
    },
  },
});
</script>
<style lang="sass" scoped>
.app-label-rating
  line-height: 1
  padding: 5px 10px
  border-radius: 10px
  display: inline-flex
  font-weight: 700
  color: #ffffff
  margin: 5px 3px
</style>
