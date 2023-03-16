<template lang="pug">
.app-ratings-list
  .app-ratings-list__items
    .app-ratings-list__item(v-for='item of ratingsList.items')
      nuxt-link.app-ratings-list__title(
        :to='`/${$lang}/rating/${item.rating.ratingId}`',
        data-element-type='app-ratings-list__title'
      ) {{ item.rating.name[$lang] }}
      .app-ratings-list__descr {{ item.rating.descr[$lang] }}
      .app-ratings-list__labels-list(v-if='item.labels.length')
        .app-ratings-list__label.label-rating(
          v-for='label of item.labels',
          :style='`background-color: ${label.color}`'
        ) {{ '#' + label.name[$lang] }}

  app-pagination(
    v-if='ratingsList.pagesCount > 1',
    :pagesCount='ratingsList.pagesCount',
    :page='ratingsList.page'
  )
</template>

<script lang="ts">
import { RatinsBriefListType } from '@/types';
import AppPagination from '@/components/app-pagination/app-pagination.vue';

export default defineComponent({
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
});
</script>
<style lang="sass" scoped>
@import '@/assets/style/_variables.sass'

.app-ratings-list
  &__item
    padding: 10px
    margin-bottom: 10px
    border: 1px dashed $app-primary-color
    border-left: 5px solid $app-primary-color
  &__title
    margin-bottom: 10px
    color: $app-primary-color
    font-size: 20px
    font-weight: 700
    display: block
  &__descr
    margin-bottom: 10px
  &__labels-list
    margin-bottom: 10px
</style>
