<template lang="pug">
app-header
.container
  app-menu-main(:sections='sections')
//- main.container
slot
</template>

<script lang="ts">
import { $api } from '@/plugins/api';
import AppHeader from '@/components/app-header/app-header.vue';
import AppBreadcrumbs from '@/components/app-breadcrumbs/app-breadcrumbs.vue';
import AppMenuMain from '@/components/app-menu-main/app-menu-main.vue';

export default defineNuxtComponent({
  async asyncData() {
    let sections = await $api.getSections();
    return {
      sections,
    };
  },
  data() {
    return {
      sections: [],
    };
  },

  components: {
    AppHeader,
    AppBreadcrumbs,
    AppMenuMain,
  },
});
</script>
<style lang="sass">
@import '@/assets/style/_style.sass'
</style>
