<template lang="pug">
h1.app-page-title {{ text }}
</template>

<script lang="ts">
export default defineComponent({
  props: {
    // Text title
    text: {
      type: String,
      default: '',
    },
  },
});
</script>
<style lang="sass" scoped>
@import '@/assets/style/_variables.sass'

.app-page-title
  font-size: 28px
  text-transform: uppercase
  text-align: center
  margin: 20px 0 30px
  @media (max-width: $app-screen-xl)
    font-size: 25px
  @media (max-width: $app-screen-md)
    font-size: 20px
</style>
