<template lang="pug">
.app-language-swich(data-app-language-swich, v-if='$langs().length > 1')
  .app-language-swich__current(@click='toggleList()') {{ $langDefault() }}
  .app-language-swich__box
    ul.app-language-swich__list(v-show='isShow')
      li.app-language-swich__item(
        data-gtm-element='header-language-swich-item',
        v-for='item of $langs()',
        :class='{ active: $langDefault() == item }',
        @click='swichLang(item)'
      ) {{ item }}
</template>

<script lang="ts">
import { LangType } from '@/types';

export default defineComponent({
  data() {
    return {
      isShow: false,
    };
  },

  mounted() {
    document.addEventListener('click', this.listenerClickOutside);
  },

  beforeUnmount() {
    document.removeEventListener('click', this.listenerClickOutside);
  },

  methods: {
    // Swich lang
    swichLang(item: keyof LangType) {
      let { fullPath, params } = this.$route;
      let partsUrl = fullPath.split('/');

      if (this.$langDefault() === item) return;
      if (params.lang) {
        partsUrl[1] = item;
      }

      useCookie(this.$configApp.cookies.lang, {
        maxAge: 3600 * 24 * 365,
      }).value = item;
      window.location.href = partsUrl.join('/');
    },
    // Show / hidden list
    toggleList() {
      this.isShow = !this.isShow;
    },

    // Hidden list - if click outside
    listenerClickOutside(event: any) {
      if (!this.isShow) return;
      if (!event.target.closest('[data-app-language-swich]')) {
        this.isShow = false;
      }
    },
  },
});
</script>
<style lang="sass" scoped>
.app-language-swich
  text-transform: uppercase
  color: var(--app-color-primary-inverted)
  text-align: center
  font-size: 12px
  font-weight: 700
  &__current
    cursor: pointer
    padding: 5px
    border: 1px solid var(--app-color-primary-inverted)
  &__box
    position: relative
  &__list
    position: absolute
    top: 5px
    left: 50%
    transform: translateX(-50%)
    border: 1px solid var(--app-color-primary-inverted)
    border-radius: 2px
    background-color: var(--app-color-primary-inverted)
    text-align: center
    z-index: 100
  &__item
    padding: 6px
    cursor: pointer
    color: var(--app-color-primary)
    border: 1px solid var(--app-color-primary)
    border-bottom: 0
    &:last-child
      border-bottom: 1px solid var(--app-color-primary)
    &.active
      background-color: var(--app-color-primary)
      color: var(--app-color-primary-inverted)
</style>
