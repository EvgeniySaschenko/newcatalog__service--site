<template lang="pug">
.app-preloader(v-if='isShow', :style='`position: ${position};`')
</template>

<script lang="ts">
export default defineComponent({
  props: {
    // Curent page
    isLoading: {
      type: Boolean,
      default: false,
    },
    // Css position
    position: {
      type: String,
      default: 'absolute',
    },
  },

  data() {
    return {
      isShow: true,
    };
  },

  watch: {
    // Сreate new state on change in external source
    isLoading: {
      immediate: true,
      handler() {
        if (this.isLoading) {
          this.isShow = true;
        } else {
          this.isShow = false;
        }
      },
    },
  },
});
</script>
<style lang="sass">
@import '@/assets/style/_variables.sass'

.app-preloader
  display: flex
  align-items: center
  justify-content: center
  top: 0
  left: 0
  bottom: 0
  right: 0
  @keyframes preloader-animate
    0%
      opacity: .1
      background-color: $app-primary-color
    20%
      opacity: .4
      background-color: #0000FF
    50%
      opacity: .6
      background-color: #000080
    70%
      opacity: .4
      background-color: #0000FF
    100%
      opacity: .1
      background-color: $app-primary-color

  @keyframes preloader-animate-2
    0%
      transform: scale(1.2)
      opacity: 0
    25%
      transform: scale(1)
      opacity: .3
    50%
      transform: sscale(1.2)
      opacity: .6
    75%
      transform: scale(1)
      opacity: .9
    100%
      transform: scale(1.2)
      opacity: 1

  &::before
    flex-shrink: 0
    animation: preloader-animate 3s ease-in-out infinite
    background-color: $app-primary-color
    background-color: black
    height: 100%
    margin: auto
    height: 100%
    z-index: 10
    bottom: 0
    content: ""
    left: 0
    position: absolute
    right: 0
    top: 0

  &::after
    content: ""
    display: flex
    align-items: center
    justify-content: center
    animation: preloader-animate-2 2s ease-in-out infinite
    background-size: cover
    left: 0
    position: absolute
    right: 0
    top: 0
    height: 70px
    margin: auto
    width: 70px
    z-index: 10
    bottom: 0
    background-image: var(--app-preloader-image)
</style>
