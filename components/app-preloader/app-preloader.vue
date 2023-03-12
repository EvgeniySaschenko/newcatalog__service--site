<template lang="pug">
.app-preloader(v-if='isShow')
</template>

<script lang="ts">
export default defineComponent({
  emits: ['update'],
  props: {
    // Curent page
    preloader: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isShow: true,
    };
  },

  watch: {
    // Сreate new state on change in external source
    preloader: {
      immediate: true,
      handler() {
        setTimeout(() => {
          this.isShow = this.preloader;
        }, 500);
      },
    },
  },
});
</script>
<style lang="sass" scoped>
@import '@/assets/style/_variables.sass'

.app-preloader
  position: absolute
  height: 100%
  width: 100%
  @keyframes preloader-animate
    0%
      opacity: .6
      background-color: $app-primary-color
    20%
      opacity: .4
      background-color: #0000FF
    50%
      opacity: .3
      background-color: #5F9EA0
    70%
      opacity: .4
      background-color: #0000FF
    100%
      opacity: .6
      background-color: $app-primary-color

  @keyframes preloader-animate-2
    0%
      transform: scale(1.2)
      opacity: .9
    25%
      transform: scale(1)
      opacity: .7
    50%
      transform: sscale(1.2)
      opacity: .6
    75%
      transform: scale(1)
      opacity: .7
    100%
      transform: scale(1.2)
      opacity: .9

  &::before
    flex-shrink: 0
    animation: preloader-animate 3s ease-in-out infinite
    background-color: $app-primary-color
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
    display: flex
    align-items: center
    justify-content: center
    animation: preloader-animate-2 2s ease-in-out infinite
    background-color: $app-primary-color
    border-radius: 10px
    height: 80px
    margin: auto
    width: 80px
    z-index: 10
    bottom: 0
    content: "#"
    color: #ffffff
    border: 2px dashed #ffffff
    font-size: 30px
    font-weight: 700
    left: 0
    position: absolute
    right: 0
    top: 0
</style>
