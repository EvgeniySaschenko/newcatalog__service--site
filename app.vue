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
import AppHeader from '@/components/app-header/app-header.vue';
import AppFooter from '@/components/app-footer/app-footer.vue';
import AppMenuMain from '@/components/app-menu-main/app-menu-main.vue';
import AppBreadcrumbs from '@/components/app-breadcrumbs/app-breadcrumbs.vue';
import useSectionsStore from '@/store/sections';
import useSettingsStore from '@/store/settings';
import useBreadcrumbsStore from '@/store/breadcrumbs';
import { SectionType } from '@/types';

export default defineNuxtComponent({
  async asyncData() {
    let { $api } = useNuxtApp();
    let response = await $api.getInit();

    if (response?.isError) {
      response.showError();
    }
    let { sections, settings } = response;
    // The data was not stored in "data()", so I used "Store"
    useSectionsStore().setSections(sections);
    useSettingsStore().setSettings(settings); //

    // console.log(settings);
    return {
      settings,
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

  beforeCreate() {
    let { $setTranslations, $setLangs, $setLangDefault } = useNuxtApp();
    let { translations, langs, langDefault } = useSettingsStore().items;
    $setTranslations(translations);
    $setLangs(langs);
    $setLangDefault(langDefault);
  },

  components: {
    AppHeader,
    AppFooter,
    AppMenuMain,
    AppBreadcrumbs,
  },
});
</script>
<style lang="sass">
@import '@/assets/style/_style.sass'
.app-content
  background-color: #ffffff
  min-height: 100vh
</style>
