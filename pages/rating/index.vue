<template lang="pug">
h1 Hello World!223333
</template>

<script lang="ts">
import { $api } from '@/plugins/api';

import { defineComponent } from 'vue';
export default defineComponent({
  async mounted() {
    console.log(await $api.getPageRating({ ratingId: 1 }));
    console.log(await $api.getPageSection({ sectionId: 1, page: 1 }));
    console.log(await $api.getPageRatings({ page: 3 }));
    console.log(await $api.getSections());
  },
});
</script>
<style lang="sass"></style>
