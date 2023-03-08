<template lang="pug">
ul.language-swich
  li.language-swich__item(v-for='item of langs', :class='{ active: $lang == item }') {{ item }}
</template>

<script lang="ts">
import { LangInit } from '@/types';

export default defineNuxtComponent({
  data() {
    return {
      langs: Object.keys(LangInit()),
    };
  },
});
</script>
<style lang="sass" scoped>
.language-swich
  display: flex
  text-transform: uppercase
  color: #ffffff
  &__item
    padding: 4px
    line-height: 1
    cursor: pointer
    font-size: 12px
    font-weight: 700
    margin: 0 2px
    &.active
      border: 1px solid #ffffff
</style>
