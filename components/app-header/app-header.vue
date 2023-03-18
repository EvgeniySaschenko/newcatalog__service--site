<template lang="pug">
header.app-header
  .app-header__row.container
    nuxt-link.app-header__logo(:to='`/${$lang}`', data-element-type='app-header__logo')
      img.app-header__logo-img(src='@/assets/img/logo.png', alt='Logo')
    .app-header__langs
      app-language-swich
</template>

<script lang="ts">
import AppLanguageSwich from '@/components/app-language-swich/app-language-swich.vue';

export default defineComponent({
  components: {
    AppLanguageSwich,
  },
});
</script>
<style lang="sass" scoped>
@import '@/assets/style/_variables.sass'

.app-header
  padding: 15px 0
  background-color: $app-primary-color
  margin-bottom: 15px
  &__row
    display: flex
    justify-content: space-between
    align-items: center
    @media (max-width: $app-screen-sm)
      flex-direction: column
  &__logo
    max-width: 280px
    @media (max-width: $app-screen-sm)
      margin-bottom: 10px
    &-img
      width: 100%
</style>
