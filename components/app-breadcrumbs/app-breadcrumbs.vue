<template lang="pug">
.app-breadcrumbs
  client-only
    .app-breadcrumbs__list
      .app-breadcrumbs__item(v-for='(item, index) in items')
        nuxt-link.app-breadcrumbs__link(
          :to='item.url',
          v-if='index != items.length - 1',
          data-element-type='app-breadcrumbs__link'
        ) {{ item.name }}
        span.app-breadcrumbs__link.active(v-else) {{ item.name }}
</template>

<script lang="ts">
import { BreadcrumbType } from '@/types';

export default defineComponent({
  props: {
    breadcrumbs: {
      type: Array as () => BreadcrumbType[],
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
            name: this.$t('Home'),
            url: `/${this.$lang}`,
          },
          ...this.breadcrumbs,
        ];
      },
    },
  },
});
</script>
<style lang="sass" scoped>
@import '@/assets/style/_variables.sass'

.app-breadcrumbs
  width: 100%
  min-height: 30px
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
      border-bottom: 0
      .app-breadcrumbs__link
        border-bottom: 0
      &::after
        content: ""
  &__link
    border-bottom: 1px solid $app-primary-color
</style>
