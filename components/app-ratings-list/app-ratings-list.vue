<template lang="pug">
.app-ratings-list
  .app-ratings-list__items
    .app-ratings-list__item(v-for='(item, index) in ratingsList.items')
      // content
      nuxt-link.app-ratings-list__title(
        :to='`/${$langDefault()}/rating/${item.rating.ratingId}`',
        data-analyzed-element='ratings-list-title'
      ) {{ item.rating.name[$langDefault()] }}
      .app-ratings-list__descr {{ item.rating.descr[$langDefault()] }}

      // labels
      .app-ratings-list__labels(v-if='item.labels.length')
        app-label-rating(
          v-for='label of item.labels',
          :color='label.color',
          :text='label.name[$langDefault()]'
        )

      .app-ratings-list__bottom
        // number
        div
          span.app-ratings-list__number {{ `#${calcNumberRecord(index)}` }}
        // sections
        .app-ratings-list__sections
          label.app-ratings-list__sections-item(v-for='sectionId of item.rating.sectionsIds') {{ `#${sectionsMap[sectionId].name[$langDefault()]}` }}

  app-pagination(
    v-if='ratingsList.pagesCount > 1',
    :pagesCount='ratingsList.pagesCount',
    :page='ratingsList.page'
  )
</template>

<script lang="ts">
import AppPagination from '@/components/app-pagination/app-pagination.vue';
import useSectionsStore from '@/store/sections';
import { RatinsBriefListType } from '@/types';

export default defineComponent({
  components: {
    AppPagination,
  },
  props: {
    ratingsList: {
      type: Object as () => RatinsBriefListType,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      // Sections map
      sectionsMap: useSectionsStore().itemsMap,
    };
  },

  methods: {
    // Reciord number relative all list
    calcNumberRecord(index: number) {
      let { maxRecordsPerPage, page } = this.ratingsList;
      return (page - 1) * maxRecordsPerPage + (index + 1);
    },
  },
});
</script>
<style lang="sass" scoped>
@import '@/assets/style/_variables.sass'

.app-ratings-list
  &__item
    margin-bottom: 10px
    border: 1px dashed var(--app-color-primary)
    border-left: 5px solid var(--app-color-primary)
    padding: 10px 10px 5px 10px
  &__title
    margin-bottom: 10px
    color: var(--app-color-primary)
    font-size: 20px
    font-weight: 700
    display: block
    @media (max-width: $app-screen-xl)
      font-size: 18px
  &__descr
    margin-bottom: 10px
  &__labels
    margin-bottom: 10px
  &__bottom
    display: flex
    justify-content: space-between
    align-items: center
  &__number
    font-weight: 700
    color: var(--app-color-primary)
    border: 1px dashed var(--app-color-primary)
    padding: 5px 10px
    border-radius: 5px
    display: flex
    align-items: center
    justify-content: center
    font-size: 12px
    margin-bottom: 5px
  &__sections
    display: flex
    flex-wrap: wrap
    justify-content: flex-end
    &-item
      margin: 5px 10px
      color: var(--app-color-primary)
      text-transform: uppercase
      font-weight: 700
      font-size: 12px
</style>
