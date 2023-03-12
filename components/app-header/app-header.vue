<template lang="pug">
header.app-header
  .app-header__row.container
    nuxt-link.app-header__logo(to='/')
      .app-header__logo-col-1 #
      .app-header__logo-col-2
        .app-header__logo-text-1 new
        .app-header__logo-text-2 catalog
      .app-header__logo-col-3 .net
    .app-header__langs
      language-swich
</template>

<script lang="ts">
import LanguageSwich from './language-swich.vue';

export default defineComponent({
  components: {
    LanguageSwich,
  },
});
</script>
<style lang="sass" scoped>
@import '@/assets/style/_variables.sass'

.app-header
  padding: 15px 0
  background-color: $app-primary-color
  &__row
    display: flex
    justify-content: space-between
    align-items: center
    @include screen-xs()
      flex-direction: column
  &__logo
    display: inline-flex
    font-size: 25px
    font-weight: 700
    text-transform: uppercase
    border: 2px dashed #ffffff
    border-left: 2px solid
    border-right: 2px solid
    padding: 10px
    border-radius: 10px
    background-color: rgba(255, 255, 255, .1)
    color: #ffffff
    @include screen-xs()
      margin-bottom: 15px
    &-text-1
      color: #ff3c00
    &-col-1
      margin-right: 1px
    &-col-2
      display: flex
    &-col-3
      display: flex
      align-items: flex-end
      text-transform: uppercase
      font-size: 15px
      padding-bottom: 3px
</style>
