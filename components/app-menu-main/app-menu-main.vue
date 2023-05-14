<template lang="pug">
ul.app-menu-main(v-if='modelValue')
  .app-menu-main__btn-close(@click='closeMenu()')
  nuxt-link.app-menu-main__logo(:to='`/${$langDefault()}`', @click='closeMenu()')
    img.app-menu-main__logo-img(:src='imageAppLogo')
  ul.app-menu-main__list
    li.app-menu-main__item(v-for='(item, index) in sections')
      nuxt-link.app-menu-main__link(
        :to='`/${$langDefault()}/section/${item.sectionId}`',
        data-element-type='app-menu-main__link',
        @click='closeMenu()',
        :class='{ active: $route.path == `/${$langDefault()}/section/${item.sectionId}` }'
      ) {{ item.name[$langDefault()] }}
</template>

<script lang="ts">
import { SectionType } from '@/types';

export default defineComponent({
  props: {
    // sections
    sections: {
      type: Array as () => SectionType[],
      default: () => [],
    },
    // Is show menu main
    modelValue: {
      type: Boolean,
      default: false,
    },
    // Logo image second
    imageAppLogo: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],

  watch: {
    // Body scroll toggle
    modelValue(current, prev) {
      let bodyElement = document.querySelector('body');
      if (!bodyElement) return;
      if (current) {
        bodyElement.classList.add('body-scroll-lock');
      } else {
        bodyElement.classList.remove('body-scroll-lock');
      }
    },
  },

  methods: {
    // Close menu
    closeMenu() {
      this.$emit('update:modelValue', false);
    },
  },
});
</script>
<style lang="sass" scoped>
@import '@/assets/style/_variables.sass'

.app-menu-main
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  position: fixed
  top: 0
  left: 0
  bottom: 0
  right: 0
  z-index: 1000
  overflow-y: auto
  background: var(--app-color-primary)
  font-weight: bold
  padding: 10px
  &__item
    font-size: 18px
    text-transform: uppercase
    text-align: center
    @media (max-width: $app-screen-md)
      font-size: 16px
  &__link
    color: var(--app-color-primary-inverted)
    padding: 10px
    width: 100%
    border: 1px dashed var(--app-color-primary)
    border-bottom-color: var(--app-color-primary-inverted)
    display: inline-block
    &.active
      display: block
      background-color: var(--app-color-selection-background)
      position: relative

  &__logo
    margin: 20px 10px
    max-width: 300px
    &-img
      max-width: 100%
  &__btn-close
    position: absolute
    height: 30px
    width: 30px
    top: 10px
    right: 10px
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    cursor: pointer
    &::after,
    &::before
      content: ""
      background: var(--app-color-primary-inverted)
      width: 100%
      height: 6px
      border-radius: 3px
      display: block
    &::after
      transform: rotate(-45deg)
    &::before
      transform: rotate(45deg)
      margin-bottom: -6px
</style>
