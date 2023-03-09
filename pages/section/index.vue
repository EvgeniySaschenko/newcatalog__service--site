<template lang="pug">
.page.page--section
  h1.title-page {{ $t('Раздел') }}: {{ sectionName[$lang] }}
  app-ratings-list(:ratingsList='ratingsList', :class='{ preloader: isLoading }')
</template>

<script lang="ts">
import { $api } from '@/plugins/api';
import AppRatingsList from '@/components/app-ratings-list/app-ratings-list.vue';
import useSectionsStore from '@/store/sections';
import { LangInit } from '@/types';

async function getRatingsList() {
  let { params, query } = useRoute();
  let ratingsList = await $api.getPageSection({
    sectionId: Number(params.sectionId),
    page: Number(query.page) || 1,
  });
  return ratingsList;
}

export default defineNuxtComponent({
  async asyncData() {
    let { params } = useRoute();
    let ratingsList = await getRatingsList();
    let store = useSectionsStore();
    let section = store.items.filter((el: any) => el.sectionId == params.sectionId);
    let sectionName = LangInit();

    if (section.length) {
      sectionName = section[0].name;
    }

    return {
      ratingsList,
      sectionName,
    };
  },

  data() {
    return {
      ratingsList: {},
      sectionName: '',
      isLoading: false,
    };
  },

  watch: {
    $route: {
      async handler() {
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
