<template lang="pug">
.labels-sections
  nuxt-link.labels-sections__item(
    data-gtm-element='labels-sections-item',
    v-for='sectionId of sectionsIds',
    :to='`/${$langDefault()}/section/${sectionId}`'
  ) {{ `#${sectionsMap[sectionId].name[$langDefault()]}` }}
</template>

<script lang="ts">
import { RatingType, SectionMapType } from '@/types';

export default defineComponent({
  props: {
    // Sections ids
    sectionsIds: {
      type: Object as () => RatingType['sectionsIds'],
      default: () => {
        return {};
      },
    },
    // Sections map
    sectionsMap: {
      type: Object as () => SectionMapType,
      default: () => {
        return {};
      },
    },
  },
});
</script>
<style lang="sass" scoped>
@import '@/assets/style/_variables.sass'

.labels-sections
  display: inline-flex
  flex-wrap: wrap
  justify-content: flex-end
  &__item
    margin: 5px
    padding: 5px
    border-bottom: 2px dotted var(--app-color-primary)
    color: var(--app-color-primary)
    text-transform: uppercase
    font-weight: 700
    @media (max-width: $app-screen-lg)
      font-size: 14px
</style>
