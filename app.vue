<template lang="pug">
.wrapper
  app-header
  .app-content.container
    app-breadcrumbs(:breadcrumbs='breadcrumbs')
    app-menu-main(:sections='sections')
    nuxt-layout
      nuxt-page
  app-footer
</template>

<script lang="ts">
import { $api } from '@/plugins/api';
import AppHeader from '@/components/app-header/app-header.vue';
import AppFooter from '@/components/app-footer/app-footer.vue';
import AppBreadcrumbs from '@/components/app-breadcrumbs/app-breadcrumbs.vue';
import AppMenuMain from '@/components/app-menu-main/app-menu-main.vue';
import useSectionsStore from '@/store/sections';
import useBreadcrumbsStore from '@/store/breadcrumbs';
import { SectionType } from '@/types';

export default defineNuxtComponent({
  async asyncData() {
    let sections = await $api.getSections();
    let store = useSectionsStore();
    store.setSections(sections);
    return {
      sections,
    };
  },

  data() {
    return {
      sections: useSectionsStore().items as SectionType[],
    };
  },

  computed: {
    breadcrumbs() {
      return useBreadcrumbsStore().items;
    },
  },

  components: {
    AppHeader,
    AppFooter,
    AppBreadcrumbs,
    AppMenuMain,
  },
});
</script>
<style lang="sass">
@import '@/assets/style/_style.sass'
.app-content
  background-color: #ffffff
  min-height: 100vh
</style>
