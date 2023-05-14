<template lang="pug">
.page.page--rating
  app-preloader(:isLoading='isLoading', position='fixed')
  app-title(:text='rating.name[$langDefault()]')
  .page__top
    // button-sources
    .page__top-col-1
      .button-sources(
        v-if='rating.linksToSources.length',
        data-gtm-element='rating-button-links-to-sources',
        @click='scrollToLinksSources()'
      )
        span.button-sources-text-1 {{ $t('Links to sources') }}
        span.button-sources-text-2 {{ $t('Sources') }}

    // labels-sections
    .page__top-col-2
      .labels-sections
        nuxt-link.labels-sections__item(
          data-gtm-element='labels-sections-item',
          v-for='sectionId of rating.sectionsIds',
          :to='`/${$langDefault()}/section/${sectionId}`'
        ) {{ `#${sectionsMap[sectionId].name[$langDefault()]}` }}

  // rating-items
  .page__rating-items
    rating-items(:labels='labels', :items='ratingItems', :rating='rating')

  // descr
  .page__descr(v-if='rating.descr[$langDefault()]')
    app-title(:text='$t("Description")', :level='3', textAlign='left')
    div {{ rating.descr[$langDefault()] }}

  // links-sources
  .page__links-sources(v-if='rating.linksToSources.length', ref='links-sources')
    app-title(:text='$t("Links to sources")', :level='3', textAlign='left')
    .links-sources
      .links-sources__item(v-for='(item, index) in rating.linksToSources')
        span.links-sources__number {{ `#${index + 1}` }}.
        a.links-sources__link(
          :href='item',
          target='_blank',
          data-gtm-element='links-to-sources-item'
        ) {{ item }}
</template>

<script lang="ts">
import RatingItems from './rating-items.vue';
import LabelsSections from './labels-sections.vue';
import LinksSources from './links-sources.vue';
import useSectionsStore from '@/store/sections';
import useBreadcrumbsStore from '@/store/breadcrumbs';
import useSettingsStore from '@/store/settings';
import { LabelType, RatingType, RatingItemType } from '@/types';

// Get ratings list
export default defineNuxtComponent({
  async asyncData() {
    let { $langDefault, $api } = useNuxtApp();

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

    let { pageTitlePrefix, pageTitleSufix } = useSettingsStore().items;

    useSeoMeta({
      title: `${pageTitlePrefix} ${rating.name[$langDefault()]} ${pageTitleSufix}`.trim(),
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
    LinksSources,
    LabelsSections,
  },

  methods: {
    // Scroll to links sources
    scrollToLinksSources() {
      if (!this.$refs['links-sources']) return;
      (this.$refs['links-sources'] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
      });
    },
  },
});
</script>
<style lang="sass">
@import '@/assets/style/_variables.sass'

.page
  position: relative
  &__top
    display: flex
    justify-content: space-between
    align-items: center
    margin-bottom: 10px
  &__descr
    margin: 20px 0

  .button-sources
    color: var(--app-color-primary)
    text-transform: uppercase
    font-weight: 700
    cursor: pointer
    display: inline-block
    margin-right: 20px
    &-text-1
      @media (max-width: $app-screen-lg)
        display: none
    &-text-2
      display: none
      @media (max-width: $app-screen-lg)
        display: inline
        font-size: 14px

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
