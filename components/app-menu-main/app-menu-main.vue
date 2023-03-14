<template lang="pug">
ul.app-menu-main
  li.app-menu-main__item(v-for='(item, index) in sections')
    nuxt-link.app-menu-main__link(
      :to='`/section/${item.sectionId}`',
      data-element-type='app-menu-main__link'
    ) {{ item.name[$lang] }}
</template>

<script lang="ts">
import { SectionType } from '@/types';

export default defineComponent({
  props: {
    // sections
    sections: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    // Add data to GTM
    gtmPush(index: number) {
      let section = this.sections[index] as SectionType;
      let gtmInfo = {
        event: 'click',
        type: 'section',
        sectionIdFrom: Number(this.$route.params.sectionId),
        sectionIdTo: section.sectionId,
      };
      this.$gtmPush(gtmInfo);
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
  // @media (max-width: $app-screen-xl)
  //   display: none
  &__item
    margin: 10px 7px
    font-weight: bold
    color: $app-primary-color
    cursor: pointer
    border-radius: 5px
  &__link
    border: 1px dashed $app-primary-color
    padding: 5px 7px
    display: inline-flex
    &.router-link-active
      border: 1px dashed #ffffff
      color: #ffffff
      background: $app-primary-color
</style>
