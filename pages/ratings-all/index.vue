<template lang="pug">
.page.page--section
  app-preloader(:isLoading='isLoading', position='fixed')
  app-title(:text='`${$t("#Title main page")} ${pageText}`')
  .page__ratings-list
    app-ratings-list(:ratingsList='ratingsList')
  // descr
  .page__descr(v-if='descr')
    app-title(:text='$t("Description")', :level='3', textAlign='left')
    div {{ `${descr} ${pageText}` }}
</template>

<script lang="ts">
import AppRatingsList from '@/components/app-ratings-list/app-ratings-list.vue';
import useBreadcrumbsStore from '@/store/breadcrumbs';
import useSettingsStore from '@/store/settings';
import useSectionsStore from '@/store/sections';
import { RatinsBriefType } from '@/types';

// Get ratings list
async function getRatingsList() {
  let { $api } = useNuxtApp();
  let { query } = useRoute();
  let ratingsList = await $api.getPageRatingsAll({
    page: Number(query.page) || 1,
  });

  return ratingsList;
}

export default defineNuxtComponent({
  async asyncData() {
    let { $t, $langDefault } = useNuxtApp();
    let ratingsList = await getRatingsList();
    if (ratingsList?.isError) {
      return ratingsList.showError();
    }
    let { query } = useRoute();
    let store = useBreadcrumbsStore();
    let pageText = Number(query.page) > 1 ? `(${$t('Page')} ${query.page})` : '';
    let sections = useSectionsStore().items;
    let descr = `#${sections.map((el) => el.name[$langDefault()]).join(' #')}`;

    store.setBreadcrumbs([]);
    let { pageTitlePrefix, pageTitleSufix } = useSettingsStore().items;

    useSeoMeta({
      title: `${pageTitlePrefix} ${$t('#Title main page')} ${pageText} ${pageTitleSufix}`.trim(),
      description: `${descr} ${pageText}`.trim(),
    });

    return {
      ratingsList,
      isLoading: false,
      title: `${$t('#Title main page')}`.trim(),
      pageText,
      descr,
    };
  },

  data() {
    return {
      // Ratings list
      ratingsList: [] as RatinsBriefType[],
      // Loading data
      isLoading: true,
      title: '',
      pageText: '',
      descr: '',
    };
  },

  watch: {
    $route: {
      async handler(to, from) {
        if (to.path !== from.path) {
          // Do not request data for the page when the user leaves it
          this.isLoading = true;
          return;
        }
        if (to.query.page === from.query.page) return; // Do not request data if "query.page" has not changed
        this.pageText = Number(to.query.page) > 1 ? `(${this.$t('Page')} ${to.query.page})` : '';
        await this.setRatingsList();
      },
    },
  },

  methods: {
    async setRatingsList() {
      this.isLoading = true;
      try {
        let ratingsList = await getRatingsList();
        if (ratingsList?.isError) {
          return ratingsList.showError();
        }
        this.ratingsList = ratingsList;
      } catch (error) {
        console.error(error);
        this.ratingsList = [];
      } finally {
        this.isLoading = false;
      }
    },
  },

  components: {
    AppRatingsList,
  },
});
</script>
<style lang="sass"></style>
