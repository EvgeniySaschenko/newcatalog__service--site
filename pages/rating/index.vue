<template lang="pug">
.page.page--section
  app-preloader(:isLoading='isLoading')
  h1.title-page {{ rating.name[$lang] }}

  .page__top
    .labels-sections
      nuxt-link.labels-sections__item(
        data-element-type='labels-sections__item',
        v-for='sectionId of rating.sectionsIds',
        :to='`/section/${sectionId}`'
      ) {{ `#${sectionsMap[sectionId].name[$lang]}` }}

  .page__rating-items
    rating-items(:labels='labels', :items='ratingItems', :rating='rating')

  .page__descr {{ rating.descr[$lang] }}
</template>

<script lang="ts">
import { $api } from '@/plugins/api';
import { $lang } from '@/plugins/translete';
import { $config } from '@/plugins/config';
import RatingItems from './rating-items.vue';
import { LabelType, RatingType, RatingItemType } from '@/types';
import useSectionsStore from '@/store/sections';
import useBreadcrumbsStore from '@/store/breadcrumbs';

// Get ratings list
export default defineNuxtComponent({
  async asyncData() {
    let { params } = useRoute();
    let { labels, rating, ratingItems } = await $api.getPageRating({
      ratingId: Number(params.ratingId),
    });
    let store = useBreadcrumbsStore();

    store.setBreadcrumbs([
      {
        name: rating.name[$lang],
        link: `/rating/${rating.ratingId}`,
      },
    ]);

    useSeoMeta({
      title: `${$config.projectName} - ${rating.name[$lang]}`,
      description: rating.descr[$lang],
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
  &__descr
    margin: 15px 0
    color: $app-primary-color
    text-align: center

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
