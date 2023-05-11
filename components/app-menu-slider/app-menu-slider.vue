<template lang="pug">
ul.app-menu-slider
  li.app-menu-slider__item(v-for='(item, index) in sections')
    nuxt-link.app-menu-slider__link(
      :to='`/${$langDefault()}/section/${item.sectionId}`',
      data-element-type='app-menu-slider__link',
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
  },
});
</script>
<style lang="sass" scoped>
@import '@/assets/style/_variables.sass'

.app-menu-slider
  $item-m-lr: 7px

  margin: 5px auto
  display: flex
  font-size: 14px
  font-weight: bold
  overflow-x: auto
  scrollbar-width: 8px
  scrollbar-color: var(--app-color-primary) var(--app-color-primary-inverted)
  &::-webkit-scrollbar
    // width: 5px
    height: 8px
    background-color: var(--app-color-primary-inverted)
  &::-webkit-scrollbar-thumb
    background: var(--app-color-primary)

  &__item
    margin: 12px $item-m-lr
    cursor: pointer
    border-radius: 5px
    min-width: calc(100% / 5 - $item-m-lr * 2)
    padding: 5px
    background: var(--app-color-primary)
    display: flex
    align-items: center
    justify-content: center
    @media (max-width: $app-screen-xl)
      min-width: calc(100% / 4 - $item-m-lr * 2)
    @media (max-width: $app-screen-lg)
      min-width: calc(100% / 3 - $item-m-lr * 2)
    @media (max-width: $app-screen-md)
      min-width: calc(100% / 2 - $item-m-lr * 2)
    @media (max-width: $app-screen-sm)
      min-width: calc(100% - $item-m-lr * 2)
  &__link
    padding: 5px
    color: var(--app-color-primary-inverted)
    border: 1px dashed var(--app-color-primary)
    display: flex
    align-items: center
    justify-content: center
    text-align: center
    height: 100%
    width: 100%
    &.active
      border: 1px dashed var(--app-color-primary-inverted)
      color: var(--app-color-primary-inverted)
      background: var(--app-color-primary)
</style>
