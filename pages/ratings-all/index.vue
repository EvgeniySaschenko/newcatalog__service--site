<template lang="pug">
.page.page--section
  app-preloader(:isLoading='isLoading', position='fixed')
  app-page-title(:text='$t("Rating of Internet services")')
  .page__ratings-list
    app-ratings-list(:ratingsList='ratingsList')
</template>

<script lang="ts">
import AppRatingsList from '@/components/app-ratings-list/app-ratings-list.vue';
import useBreadcrumbsStore from '@/store/breadcrumbs';
import useSettingsStore from '@/store/settings';
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
    let { $t } = useNuxtApp();
    let ratingsList = await getRatingsList();
    if (ratingsList?.isError) {
      return ratingsList.showError();
    }

    let store = useBreadcrumbsStore();

    store.setBreadcrumbs([]);
    let { pageTitlePrefix, pageTitleSufix } = useSettingsStore().items;

    useSeoMeta({
      title: `${pageTitlePrefix} ${$t('Rating of Internet services')} ${pageTitleSufix}`.trim(),
    });

    return {
      ratingsList,
      isLoading: false,
    };
  },

  data() {
    return {
      // Ratings list
      ratingsList: [] as RatinsBriefType[],
      // Loading data
      isLoading: true,
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
