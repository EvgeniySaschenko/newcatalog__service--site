<template lang="pug">
.page-error
  .page-error__box
    nuxt-link.page-error__logo(
      :to='`/${$langDefault()}`',
      data-analyzed-element='page-error-logo',
      v-if='logoImage'
    )
      img.page-error__logo-img(:src='logoImage', alt='Logo')

    .page-error__code {{ error.statusCode }}
    // 503
    .page-error__text(v-if='error.statusCode == 503')
      .page-error__text-1 {{ $t('The server is being updated') }}
      .page-error__text-2 {{ $t('Try refreshing the page a little later') }}
      button.page-error__btn(@click='refreshPage()') {{ $t('Refresh page') }}
    // 500
    .page-error__text(v-if='error.statusCode == 500')
      .page-error__text-1 {{ $t('Server error') }}
    // 404
    .page-error__text(v-if='error.statusCode == 404')
      .page-error__text-1 {{ $t('Page not found') }}
      nuxt-link.page-error__btn(
        :to='`/${$langDefault()}`',
        data-analyzed-element='page-error-button-home'
      ) {{ $t('Go to Main Page') }}
    // 204
    .page-error__text(v-if='error.statusCode == 204')
      .page-error__text-1 {{ $t('Page content not found') }}
      nuxt-link.page-error__btn(
        :to='`/${$langDefault()}`',
        data-analyzed-element='page-error-button-home'
      ) {{ $t('Go to Main Page') }}
</template>

<script lang="ts">
import useSettingsStore from '@/store/settings';

export default defineNuxtComponent({
  async asyncData() {
    let { $api } = useNuxtApp();
    let response = await $api.getInit();
    if (response?.isError) {
      response.showError();
    }
    useSettingsStore().setSettings(response.settings);
    return {};
  },

  created() {
    // Settings will be applied if available
    let { $setTranslations, $setLangs, $setLangDefault } = useNuxtApp();
    let settings = useSettingsStore().items;
    if (settings && Object.keys(settings).length) {
      this.logoImage = settings.imageAppLogo;
      $setTranslations(settings.translations);
      $setLangs(settings.langs);
      $setLangDefault(settings.langDefault);
    }
  },

  data() {
    return {
      logoImage: '',
    };
  },

  props: {
    error: {
      type: Object,
    },
  },
  methods: {
    refreshPage() {
      location.reload();
    },
  },
});
</script>
<style lang="sass">
@import '@/assets/style/_style.sass'
// In case of an error, variables may not come from the server, so they are on this page on their own
.page-error
  --app-color-primary: #5a448d
  --app-color-primary-inverted: #ffffff
  --app-color-text-regular: #222222
  --app-color-selection-background: #f88686
  --app-color-selection-text: #ffffff

  width: 100%
  height: 100vh
  background-color: var(--app-color-primary)
  color: var(--app-color-primary-inverted)
  text-align: center
  padding: 10px
  display: flex
  align-items: center
  justify-content: center
  &__logo
    max-width: 350px
    display: inline-flex
    &-img
      width: 100%
  &__code
    font-size: 150px
    font-weight: 700
    @media (max-width: $app-screen-md)
      font-size: 100px
  &__text
    &-1
      font-size: 40px
      text-transform: uppercase
      @media (max-width: $app-screen-md)
        font-size: 25px
    &-2
      margin-top: 10px
  &__btn
    display: inline-flex
    font-size: 16px
    text-transform: uppercase
    color: var(--app-color-primary-inverted)
    border: 2px solid var(--app-color-primary-inverted)
    padding: 15px
    border-radius: 10px
    margin-top: 30px
    font-weight: 700
    background-color: var(--app-color-primary)
    position: relative
    overflow: hidden
    &::after
      content: ""
      background-color: rgba(255, 255, 255, .1)
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
</style>
