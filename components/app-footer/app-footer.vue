<template lang="pug">
footer.app-footer
  .container
    .app-footer__row.app-footer__row--email newcatalog.net@gmail.com
    .app-footer__row.app-footer__row--langs
      .langs
        a.langs__item(:href='`/${item}`', v-for='item in $langs()') {{ item }}
</template>

<script lang="ts">
export default defineComponent({});
</script>
<style lang="sass" scoped>
@import '@/assets/style/_variables.sass'

.app-footer
  background-color: $app-primary-color
  padding: 20px 0
  color: #ffffff
  text-align: center
  &__row--email
    margin-bottom: 10px
  .langs
    font-size: 12px
    text-align: center
    &__item
      display: inline-block
      color: #ffffff
      text-transform: uppercase
      padding: 5px
      border: 1px solid #ffffff
      margin: 2px 1px
      min-width: 40px // All to be the same width
</style>
