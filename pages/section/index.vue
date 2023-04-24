<template lang="pug">
.page.page--section
  app-preloader(:isLoading='isLoading', position='fixed')
  app-page-title(:text='`${$t("Section")}: ${sectionName}`')
  .page__ratings-list
    app-ratings-list(:ratingsList='ratingsList')
</template>

<script lang="ts">
import AppRatingsList from '@/components/app-ratings-list/app-ratings-list.vue';
import useSectionsStore from '@/store/sections';
import useBreadcrumbsStore from '@/store/breadcrumbs';
import { RatinsBriefType } from '@/types';

async function getRatingsList() {
  let { $api } = useNuxtApp();
  let { params, query } = useRoute();
  let ratingsList = await $api.getPageSection({
    sectionId: Number(params.sectionId),
    page: Number(query.page) || 1,
  });

  return ratingsList;
}

export default defineNuxtComponent({
  async asyncData() {
    let { $configApp, $t, $langDefault } = useNuxtApp();
    let { params } = useRoute();
    let ratingsList = await getRatingsList();

    if (ratingsList?.isError) {
      ratingsList.showError();
    }

    let store = useSectionsStore();
    let section = store.items.filter((el: any) => el.sectionId == params.sectionId);
    let sectionName = '';

    if (section[0].name) {
      sectionName = `${section[0].name[$langDefault()]}`;
    }

    useBreadcrumbsStore().setBreadcrumbs([
      {
        name: sectionName,
        url: `/${$langDefault()}/section/${params.sectionId}`,
      },
    ]);

    useSeoMeta({
      title: `${$configApp.projectName} - ${$t('Section')}: ${sectionName}`,
    });

    return {
      ratingsList,
      sectionName,
      isLoading: false,
    };
  },

  data() {
    return {
      ratingsList: [] as RatinsBriefType[],
      sectionName: '',
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
