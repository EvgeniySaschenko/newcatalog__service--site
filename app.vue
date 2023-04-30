<template lang="pug">
.wrapper
  app-header(
    :logoImage='settings[SettingsEnum.imageAppLogo]',
    :headerHtml='settings[SettingsEnum.headerHtml]'
  )
  .app-content.container
    app-breadcrumbs(:breadcrumbs='breadcrumbs')
    .app-content__custom-code-top(
      v-html='settings[SettingsEnum.contentTopHtml]',
      v-if='settings[SettingsEnum.contentTopHtml]'
    )
    app-menu-main(:sections='sections')
    .app-content__layout
      nuxt-layout
        nuxt-page
    .app-content__custom-code-bottom(
      v-html='settings[SettingsEnum.contentBottomHtml]',
      v-if='settings[SettingsEnum.contentBottomHtml]'
    )
  app-footer(:footerHtml='settings[SettingsEnum.footerHtml]')
</template>

<script lang="ts">
import AppHeader from '@/components/app-header/app-header.vue';
import AppFooter from '@/components/app-footer/app-footer.vue';
import AppMenuMain from '@/components/app-menu-main/app-menu-main.vue';
import AppBreadcrumbs from '@/components/app-breadcrumbs/app-breadcrumbs.vue';
import useSectionsStore from '@/store/sections';
import useSettingsStore from '@/store/settings';
import useBreadcrumbsStore from '@/store/breadcrumbs';
import { SettingsEnum } from '@/types';

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

    let headStyles = `
      :root {
        --app-color-primary: ${settings[SettingsEnum.colorPrimary]};
        --app-color-primary-inverted: ${settings[SettingsEnum.colorPrimaryInverted]};
        --app-color-text-regular: ${settings[SettingsEnum.colorTextRegular]};
        --app-color-selection-background: ${settings[SettingsEnum.colorSelectionBackground]};
        --app-color-selection-text: ${settings[SettingsEnum.colorSelectionText]};
        --app-image-preloader: url(${settings[SettingsEnum.imageAppPreloader]});
      }
      ${settings[SettingsEnum.headStyles]}`;

    useHead({
      style: [headStyles],
      script: [settings[SettingsEnum.headScript]],
    });
    return {};
  },

  data() {
    return {
      sections: useSectionsStore().items,
      settings: useSettingsStore().items,
      SettingsEnum,
    };
  },

  computed: {
    breadcrumbs() {
      return useBreadcrumbsStore().items;
    },
  },

  created() {
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
  margin-bottom: 15px
  padding: 10px
  &__custom-code
    &-top,
    &-bottom
      margin: 10px auto
    &-bottom
      margin-bottom: 0
</style>
