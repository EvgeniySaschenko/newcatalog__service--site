<template lang="pug">
.links-sources
  .links-sources__item(v-for='(item, index) in linksToSources')
    span.links-sources__number {{ `#${index + 1}` }}.
    a.links-sources__link(href='item', target='_blank') {{ item }}
</template>

<script lang="ts">
import { RatingType } from '@/types';

export default defineComponent({
  props: {
    // links
    linksToSources: {
      type: Array as () => RatingType['linksToSources'],
      default: () => {
        return [];
      },
    },
  },
});
</script>
<style lang="sass" scoped>
@import '@/assets/style/_variables.sass'

.links-sources
  color: var(--app-color-primary)
  &__item
    font-size: 16px
    margin-bottom: 10px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
  &__number
    padding-right: 5px
    font-weight: bold
  &__link
    text-decoration: underline
</style>
