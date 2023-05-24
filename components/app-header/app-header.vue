<template lang="pug">
header.app-header
  .app-header__row.container
    .app-header__col.app-header__col--logo
      nuxt-link.app-header__logo(:to='`/${$langDefault()}`', data-analyzed-element='header-logo')
        img.app-header__logo-img(:src='imageAppLogo', alt='Logo')
    .app-header__col.app-header__col--custom-code
      .app-header__custom-code(v-html='headerHtml', v-if='headerHtml')
    .app-header__col.app-header__col--control
      .app-header__langs
        app-language-swich
      .app-header__btn-menu(
        @click='isShowMenuMain = true',
        data-analyzed-element='header-button-menu-main'
      )
        .app-header__btn-menu-item
        .app-header__btn-menu-item
        .app-header__btn-menu-item
  app-menu-main(v-model='isShowMenuMain', :sections='sections', :imageAppLogo='imageAppLogo')
</template>

<script lang="ts">
import AppLanguageSwich from '@/components/app-language-swich/app-language-swich.vue';
import AppMenuMain from '@/components/app-menu-main/app-menu-main.vue';
import { SectionType } from '@/types';

export default defineComponent({
  components: {
    AppLanguageSwich,
    AppMenuMain,
  },
  props: {
    imageAppLogo: {
      type: String,
      required: true,
    },
    headerHtml: {
      type: String,
      default: '',
    },
    // sections
    sections: {
      type: Array as () => SectionType[],
      default: () => [],
    },
  },
  data() {
    return {
      isShowMenuMain: false,
    };
  },
  methods: {
    toggleMenuMain() {
      this.isShowMenuMain = !this.isShowMenuMain;
    },
  },
});
</script>
<style lang="sass" scoped>
@import '@/assets/style/_variables.sass'

.app-header
  padding: 15px 0
  background-color: var(--app-color-primary)
  margin-bottom: 15px
  box-shadow: 0 4px 2px -2px var(--app-color-primary)
  border-radius: 0 0 2px 2px
  &__row
    display: flex
    justify-content: space-between
    align-items: center
    @media (max-width: $app-screen-sm)
      flex-direction: column
  &__col
    display: flex
    align-items: center
    padding: 0 5px
    &--logo
      @media (max-width: $app-screen-sm)
        margin-bottom: 15px
    &--control
      @media (max-width: $app-screen-sm)
        margin-top: 15px
  &__btn-menu
    margin-left: 20px
    @media (max-width: $app-screen-sm)
      margin-left: 30px
  &__logo
    height: 75px
    max-width: 300px
    display: inline-flex
    align-items: center
    &-img
      max-width: 100%
      max-height: 100%
  &__btn-menu
    height: 40px
    width: 40px
    display: flex
    align-items: center
    justify-content: space-around
    flex-direction: column
    cursor: pointer
    @media (max-width: $app-screen-sm)
      height: 35px
      width: 35px
    &-item
      background-color: var(--app-color-primary-inverted)
      width: 100%
      height: 4px
      border-radius: 3px
</style>
