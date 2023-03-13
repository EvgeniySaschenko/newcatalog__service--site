<template lang="pug">
header.app-header
  .app-header__row.container
    nuxt-link.app-header__logo(to='/')
      img.app-header__logo-img(src='@/assets/img/logo.png')
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
    max-width: 280px
    @include screen-xs()
      margin-bottom: 10px
    &-img
      width: 100%
</style>
