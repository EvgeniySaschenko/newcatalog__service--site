<template lang="pug">
.page.page--section
  app-preloader(:isLoading='isLoading', position='fixed')
  app-page-title(:text='rating.name[$langDefault()]')
  .page__top
    .labels-sections
      nuxt-link.labels-sections__item(
        data-element-type='labels-sections__item',
        v-for='sectionId of rating.sectionsIds',
        :to='`/${$langDefault()}/section/${sectionId}`'
      ) {{ `#${sectionsMap[sectionId].name[$langDefault()]}` }}

  .page__rating-items
    rating-items(:labels='labels', :items='ratingItems', :rating='rating')

  .page__descr {{ rating.descr[$langDefault()] }}
</template>

<script lang="ts">
import RatingItems from './rating-items.vue';
import useSectionsStore from '@/store/sections';
import useBreadcrumbsStore from '@/store/breadcrumbs';
import { LabelType, RatingType, RatingItemType } from '@/types';

// Get ratings list
export default defineNuxtComponent({
  async asyncData() {
    let { $configApp, $langDefault, $api } = useNuxtApp();

    let { params } = useRoute();
    let response = await $api.getPageRating({
      ratingId: Number(params.ratingId),
    });

    if (response?.isError) {
      response.showError();
    }

    let { labels, rating, ratingItems } = response;

    let store = useBreadcrumbsStore();

    store.setBreadcrumbs([
      {
        name: rating.name[$langDefault()] || '',
        url: `/${$langDefault()}/rating/${rating.ratingId}`,
      },
    ]);

    useSeoMeta({
      title: `${$configApp.projectName} - ${rating.name[$langDefault()]}`,
      description: rating.descr[$langDefault()],
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
      handler(to, from) {
        if (to.path !== from.path) {
          this.isLoading = true;
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
.page
  position: relative
  &__top
    display: flex
    justify-content: flex-end
    margin-bottom: 10px
  &__descr
    margin: 15px 0
    color: var(--app-color-primary)
    text-align: center

.labels-sections
  display: inline-flex
  flex-wrap: wrap
  justify-content: center
  &__item
    margin: 5px
    padding: 5px
    border-bottom: 2px dotted var(--app-color-primary)
    color: var(--app-color-primary)
    text-transform: uppercase
    font-weight: 700
</style>
