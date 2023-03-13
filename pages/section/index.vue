<template lang="pug">
.page.page--section
  app-preloader(:isLoading='isLoading')
  h1.title-page {{ $t('Раздел') }}: {{ sectionName }}
  .page__ratings-list
    app-ratings-list(:ratingsList='ratingsList')
head
  title {{ pageTitle }}
</template>

<script lang="ts">
import { $config } from '@/plugins/config';
import { $api } from '@/plugins/api';
import { $lang, $t } from '@/plugins/translete';
import AppRatingsList from '@/components/app-ratings-list/app-ratings-list.vue';
import useSectionsStore from '@/store/sections';
import useBreadcrumbsStore from '@/store/breadcrumbs';

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
    let sectionName = '';

    if (section[0].name) {
      sectionName = `${section[0].name[$lang]}`;
    }

    useBreadcrumbsStore().setBreadcrumbs([
      {
        name: sectionName,
        link: `/section/${params.sectionId}`,
      },
    ]);

    return {
      pageTitle: `${$config.projectName} - ${$t('Раздел')}: ${sectionName}`,
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
