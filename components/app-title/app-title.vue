<template lang="pug">
h1.app-title-1(v-if='level == 1', :style='`text-align: ${textAlign}`') {{ text }}
h3.app-title-3(v-if='level == 3', :style='`text-align: ${textAlign}`') {{ text }}
</template>

<script lang="ts">
export default defineComponent({
  props: {
    // Text title
    text: {
      type: String,
      default: '',
    },
    // level
    level: {
      type: Number,
      default: 1,
    },
    // align
    textAlign: {
      type: String,
      default: 'center',
    },
  },
});
</script>
<style lang="sass" scoped>
@import '@/assets/style/_variables.sass'

.app-title
  &-1
    font-size: 28px
    text-transform: uppercase
    margin: 25px 0 25px
    @media (max-width: $app-screen-xl)
      font-size: 25px
    @media (max-width: $app-screen-md)
      font-size: 20px
  &-3
    color: var(--app-color-primary)
    font-weight: bold
    font-size: 18px
    margin: 15px 0 10px
    text-transform: uppercase
</style>
