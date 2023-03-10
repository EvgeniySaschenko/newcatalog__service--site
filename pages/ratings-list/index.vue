<template lang="pug">
.page.page--section
  h1.title-page {{ $t('Список рейтингов') }}
  app-ratings-list(:ratingsList='ratingsList', :class='{ preloader: isLoading }')
</template>

<script lang="ts">
import { $api } from '@/plugins/api';
import AppRatingsList from '@/components/app-ratings-list/app-ratings-list.vue';

// Get ratings list
async function getRatingsList() {
  let { query } = useRoute();
  let ratingsList = await $api.getPageRatings({
    page: Number(query.page) || 1,
  });
  return ratingsList;
}

export default defineNuxtComponent({
  async asyncData() {
    let ratingsList = await getRatingsList();

    return {
      // Ratings list
      ratingsList,
    };
  },

  data() {
    return {
      // Ratings list
      ratingsList: {},
      // Loading data
      isLoading: false,
    };
  },

  watch: {
    $route: {
      async handler(to, from) {
        if (to.query.page === from.query.page) return; // Do not request data if "query.page" has not changed
        if (to.path !== from.path) return; // Do not request data for the page when the user leaves it
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
