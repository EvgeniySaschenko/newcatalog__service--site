<template lang="pug">
.app-ratings-list
  .app-ratings-list__items
    .app-ratings-list__item(v-for='(item, index) in ratingsList.items')
      // content
      nuxt-link.app-ratings-list__title(
        :to='`/${$lang}/rating/${item.rating.ratingId}`',
        data-element-type='app-ratings-list__title'
      ) {{ item.rating.name[$lang] }}
      .app-ratings-list__descr {{ item.rating.descr[$lang] }}

      // labels
      .app-ratings-list__labels(v-if='item.labels.length')
        app-label-rating(
          v-for='label of item.labels',
          :color='label.color',
          :text='label.name[$lang]'
        )

      .app-ratings-list__bottom
        // number
        div
          span.app-ratings-list__number {{ `#${calcNumberRecord(index)}` }}
        // sections
        .app-ratings-list__sections
          label.app-ratings-list__sections-item(v-for='sectionId of item.rating.sectionsIds') {{ `#${sectionsMap[sectionId].name[$lang]}` }}

  app-pagination(
    v-if='ratingsList.pagesCount > 1',
    :pagesCount='ratingsList.pagesCount',
    :page='ratingsList.page'
  )
</template>

<script lang="ts">
import { RatinsBriefListType } from '@/types';
import AppPagination from '@/components/app-pagination/app-pagination.vue';
import useSectionsStore from '@/store/sections';

export default defineComponent({
  data() {
    return {
      // Sections map
      sectionsMap: useSectionsStore().itemsMap,
    };
  },
  props: {
    ratingsList: {
      type: Object,
      default: () => {
        return {} as RatinsBriefListType;
      },
    },
  },

  components: {
    AppPagination,
  },

  methods: {
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
    border: 1px dashed $app-primary-color
    border-left: 5px solid $app-primary-color
    padding: 10px 10px 5px 10px
  &__title
    margin-bottom: 10px
    color: $app-primary-color
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
    color: $app-primary-color
    border: 1px dashed $app-primary-color
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
      color: $app-primary-color
      text-transform: uppercase
      font-weight: 700
      font-size: 12px
</style>
