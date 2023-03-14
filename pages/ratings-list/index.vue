<template lang="pug">
.page.page--section
  app-preloader(:isLoading='isLoading')
  h1.title-page {{ $t('Рейтинг интернет сервисов') }}
  .page__ratings-list
    app-ratings-list(:ratingsList='ratingsList')
</template>

<script lang="ts">
import { $config } from '@/plugins/config';
import { $api } from '@/plugins/api';
import { $t } from '@/plugins/translete';
import AppRatingsList from '@/components/app-ratings-list/app-ratings-list.vue';
import useBreadcrumbsStore from '@/store/breadcrumbs';

// Get ratings list
async function getRatingsList() {
  let { query } = useRoute();
  let ratingsList = await $api.getPageRatingsList({
    page: Number(query.page) || 1,
  });
  return ratingsList;
}

export default defineNuxtComponent({
  async asyncData() {
    let ratingsList = await getRatingsList();

    let store = useBreadcrumbsStore();

    store.setBreadcrumbs([]);

    useSeoMeta({
      title: `${$config.projectName} - ${$t('Рейтинг интернет сервисов')}`,
    });

    return {
      // Ratings list
      ratingsList,
      isLoading: false,
    };
  },

  data() {
    return {
      // Ratings list
      ratingsList: {},
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
        this.ratingsList = await getRatingsList();
      } catch (error) {
        console.error(error);
        this.ratingsList = {};
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
