<template lang="pug">
.app-breadcrumbs
  .app-breadcrumbs__list
    .app-breadcrumbs__item(v-for='(item, index) in items')
      nuxt-link.app-breadcrumbs__link(:to='item.link', v-if='index != items.length - 1') {{ item.name }}
      span.app-breadcrumbs__link.active(v-else) {{ item.name }}
</template>

<script lang="ts">
import { BreadcrumbType } from '@/types';

export default defineComponent({
  props: {
    breadcrumbs: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },

  data() {
    return {
      items: [] as BreadcrumbType[],
    };
  },

  watch: {
    breadcrumbs: {
      deep: true,
      immediate: true,
      handler() {
        this.items = [
          {
            name: this.$t('Главная'),
            link: '/',
          },
          ...this.breadcrumbs,
        ] as BreadcrumbType[];
      },
    },
  },
});
</script>
<style lang="sass" scoped>
@import '@/assets/style/_variables.sass'

.app-breadcrumbs
  width: 100%
  margin: 10px 0
  &__list
    display: flex
    color: $app-primary-color
    overflow-x: auto
    white-space: nowrap
    padding-bottom: 10px
  &__item
    font-weight: 700
    &::after
      content: "/"
      margin: 0 5px
      font-weight: 400
      font-size: 10px
    &:last-child
      font-weight: 400
      &::after
        content: ""
</style>
