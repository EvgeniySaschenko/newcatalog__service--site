<template lang="pug">
.page.page--section
  app-preloader(:isLoading='isLoading', position='fixed')
  app-title(:text='`${$t("Section")}: ${sectionName} ${pageText}`')
  .page__ratings-list
    app-ratings-list(:ratingsList='ratingsList')
  // descr
  .page__descr(v-if='descr')
    app-title(:text='$t("Description")', :level='3', textAlign='left')
    div {{ `${descr} ${pageText}` }}
</template>

<script lang="ts">
import AppRatingsList from '@/components/app-ratings-list/app-ratings-list.vue';
import useSectionsStore from '@/store/sections';
import useBreadcrumbsStore from '@/store/breadcrumbs';
import useSettingsStore from '@/store/settings';
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
    let { $t, $langDefault } = useNuxtApp();
    let { params, query } = useRoute();
    let ratingsList = await getRatingsList();

    if (ratingsList?.isError) {
      ratingsList.showError();
    }

    let sections = useSectionsStore();
    let sectionCurrent = sections.itemsMap[+params.sectionId];
    let sectionName = '';
    let descr = '';

    let pageText = '';
    if (Number(query.page) > 1) {
      pageText = `(${$t('Page')} ${query.page})`;
    }

    if (sectionCurrent) {
      sectionName = `${sectionCurrent.name[$langDefault()]}`.trim();
      descr = `${sectionCurrent.descr[$langDefault()]}`.trim();
    }

    useBreadcrumbsStore().setBreadcrumbs([
      {
        name: sectionName,
        url: `/${$langDefault()}/section/${params.sectionId}`,
      },
    ]);

    let { pageTitlePrefix, pageTitleSufix } = useSettingsStore().items;

    useSeoMeta({
      title: `${pageTitlePrefix} 
      ${$t('Section')}: 
      ${sectionName} ${pageText} ${pageTitleSufix}`.trim(),
      description: `${descr} ${pageText}`.trim(),
    });

    return {
      ratingsList,
      sectionName,
      isLoading: false,
      descr,
      pageText,
    };
  },

  data() {
    return {
      ratingsList: [] as RatinsBriefType[],
      sectionName: '',
      isLoading: true,
      descr: '',
      pageText: '',
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

        // set page name
        let pageText = '';
        if (Number(to.query.page) > 1) {
          pageText = `(${this.$t('Page')} ${to.query.page})`;
        }

        this.pageText = pageText;
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
