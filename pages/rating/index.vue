<template lang="pug">
.page.page--section
  app-preloader(:preloader='isLoading')
  h1.title-page {{ rating.name[$lang] }}

  .page__top
    .labels-sections
      nuxt-link.labels-sections__item(
        v-for='sectionId of rating.sectionsIds',
        :to='`/section/${sectionId}`'
      ) {{ `#${sectionsMap[sectionId].name[$lang]}` }}

  .page__rating-items
    rating-items(:labels='labels', :items='ratingItems', :rating='rating')
</template>

<script lang="ts">
import { $api } from '@/plugins/api';
import RatingItems from './rating-items.vue';
import { LabelType, RatingType, RatingItemType } from '@/types';
import useSectionsStore from '@/store/sections';

// Get ratings list
export default defineNuxtComponent({
  async asyncData() {
    let { params } = useRoute();
    let { labels, rating, ratingItems } = await $api.getPageRating({
      ratingId: Number(params.ratingId),
    });
    return {
      labels,
      rating,
      ratingItems,
      isLoading: false,
    };
  },

  data() {
    return {
      // labels
      labels: [] as LabelType[],
      // rating
      rating: {} as RatingType,
      // rating items
      ratingItems: [] as RatingItemType[],
      // Loading data
      isLoading: true,
      // Sections map
      sectionsMap: useSectionsStore().itemsMap,
    };
  },

  watch: {
    $route: {
      async handler(to, from) {
        if (to.path !== from.path) {
          this.isLoading = true;
          return;
        }
      },
    },
  },
  components: {
    RatingItems,
  },
});
</script>
<style lang="sass">
@import '@/assets/style/_variables.sass'

.page
  &__top
    display: flex
    justify-content: flex-end
    margin-bottom: 10px
.labels-sections
  display: inline-flex
  flex-wrap: wrap
  justify-content: center
  &__item
    margin: 5px
    padding: 5px
    border-bottom: 2px dotted $app-primary-color
    color: $app-primary-color
    text-transform: uppercase
    font-weight: 700
</style>
