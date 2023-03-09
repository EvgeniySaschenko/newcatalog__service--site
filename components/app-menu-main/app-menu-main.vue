<template lang="pug">
ul.app-menu-main
  li.app-menu-main__item(v-for='item of sections')
    nuxt-link.app-menu-main__link(:to='`/section/${item.sectionId}`') {{ item.name[$lang] }}
</template>

<script lang="ts">
import { SectionType } from '@/types';

export default defineComponent({
  props: {
    // sections
    sections: {
      type: Array,
      default: () => [] as SectionType[],
    },
  },
});
</script>
<style lang="sass" scoped>
@import '@/assets/style/_variables.sass'

.app-menu-main
  margin: 5px auto
  display: flex
  flex-wrap: wrap
  justify-content: center
  @include screen-lg()
    width: 650px !important
  &__item
    margin: 10px
    font-weight: bold
    color: $app-primary-color
    cursor: pointer
    border-radius: 5px
  &__link
    border: 1px dashed $app-primary-color
    padding: 5px 10px
    display: inline-flex
    &.router-link-active
      border: 1px dashed #ffffff
      color: #ffffff
      background: $app-primary-color
</style>
