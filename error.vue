<template lang="pug">
.page-error
  .page-error__box
    nuxt-link.page-error__logo(:to='`/${$lang}`', data-element-type='page-error__logo')
      img.page-error__logo-img(src='@/assets/img/logo.png', alt='Logo')

    .page-error__code {{ error.statusCode }}
    // 500
    .page-error__text(v-if='error.statusCode == 500')
      .page-error__text-1 {{ $t('Server error') }}
    // 404
    .page-error__text(v-if='error.statusCode == 404')
      .page-error__text-1 {{ $t('Page not found') }}
      nuxt-link.page-error__btn(:to='`/${$lang}`', data-element-type='page-error__btn--go-to-home') {{ $t('Go to home') }}
    // 202
    .page-error__text(v-if='error.statusCode == 202')
      .page-error__text-1 {{ $t('The server is being updated') }}
      .page-error__text-2 {{ $t('Try refreshing the page a little later') }}
      button.page-error__btn(@click='refreshPage()') {{ $t('Refresh page') }}
</template>

<script lang="ts">
export default defineNuxtComponent({
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
.page-error
  width: 100%
  height: 100vh
  background-color: $app-primary-color
  color: #ffffff
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
    color: #ffffff
    border: 2px solid #ffffff
    padding: 15px
    border-radius: 10px
    margin-top: 30px
    font-weight: 700
    background-color: $app-primary-light-color
</style>
