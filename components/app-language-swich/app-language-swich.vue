<template lang="pug">
ul.app-language-swich
  li.app-language-swich__item(
    v-for='item of $langs',
    :class='{ active: $lang == item }',
    @click='swichLang(item)'
  ) {{ item }}
</template>

<script lang="ts">
import { LangType } from '@/types';
import { $config } from '@/plugins/config';

export default defineComponent({
  methods: {
    // Swich lang
    swichLang(item: keyof LangType) {
      let { fullPath, params } = this.$route;
      let partsUrl = fullPath.split('/');

      if (this.$lang === item) return;
      if (params.lang) {
        partsUrl[1] = item;
      }

      useCookie($config.cookies.lang, {
        maxAge: 3600 * 24 * 365,
      }).value = item;
      window.location.href = partsUrl.join('/');
    },
  },
});
</script>
<style lang="sass" scoped>
.app-language-swich
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
