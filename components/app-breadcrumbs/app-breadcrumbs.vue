<template lang="pug">
</template>

<script lang="ts">
import { SectionType } from '@/types';

export default defineNuxtComponent({
  props: {
    sections: {
      type: Array,
      default: () => [] as SectionType[],
    },
  },
  mounted() {
    console.log(this.$route.name);
    console.log(this.$router);
  },
});
</script>
<style lang="sass" scoped>
@import '@/assets/style/_variables.sass'

.app-menu-main
  margin: 5px auto
  display: flex
  flex-wrap: wrap
  justify-content: center
  &__item
    margin: 10px
    font-weight: bold
    color: $app-primary-color
    cursor: pointer
    border-radius: 5px
  &__link
    border: 1px dashed $app-primary-color
    padding: 5px 10px
    display: inline-flex
    &.router-link-active
      border: 1px dashed #ffffff
      color: #ffffff
      background: $app-primary-color
</style>
