<template lang="pug">
.page.page--section
  app-preloader(:preloader='isLoading')
  h1.title-page {{ $t('Раздел') }}: {{ sectionName[$lang] }}
  .page__ratings-list
    app-ratings-list(:ratingsList='ratingsList')
</template>

<script lang="ts">
import { $api } from '@/plugins/api';
import { $lang, $t } from '@/plugins/translete';
import AppRatingsList from '@/components/app-ratings-list/app-ratings-list.vue';
import useSectionsStore from '@/store/sections';
import useBreadcrumbsStore from '@/store/breadcrumbs';
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
    useBreadcrumbsStore().setBreadcrumbs([
      {
        name: `${$t('Раздел')}: ${sectionName[$lang]}`,
        link: `/section/${params.sectionId}`,
      },
    ]);

    return {
      ratingsList,
      sectionName,
      isLoading: false,
    };
  },

  data() {
    return {
      ratingsList: {},
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
