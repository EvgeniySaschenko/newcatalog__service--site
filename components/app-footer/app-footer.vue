<template lang="pug">
footer.app-footer
  .container
    .app-footer__row(v-if='footerHtml')
      .app-footer__custom-code(v-html='footerHtml')
    .app-footer__row
      .app-footer__langs
        a.app-footer__langs-item(
          :href='`/${item}`',
          v-for='item in $langs()',
          data-gtm-element='footer-langs-item'
        ) {{ item }}
</template>

<script lang="ts">
export default defineComponent({
  props: {
    footerHtml: {
      type: String,
      default: '',
    },
  },
});
</script>
<style lang="sass" scoped>
.app-footer
  background-color: var(--app-color-primary)
  padding: 20px 0
  color: var(--app-color-primary-inverted)
  text-align: center
  &__custom-code
    margin-bottom: 10px
  &__langs
    font-size: 12px
    text-align: center
    &-item
      display: inline-block
      color: var(--app-color-primary-inverted)
      text-transform: uppercase
      padding: 5px
      border: 1px solid var(--app-color-primary-inverted)
      margin: 2px 1px
      min-width: 40px // All to be the same width
</style>
