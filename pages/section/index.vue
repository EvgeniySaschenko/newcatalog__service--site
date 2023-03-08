<template lang="pug">
</template>

<script lang="ts">
import { $api } from '@/plugins/api';

export default defineNuxtComponent({
  // data() {
  //   return {
  //     sections: [],
  //   };
  // },
  async mounted() {
    let sections = await $api.getSections();
    // let sections = await $api.getSections();
    console.log(2222);
    return {
      sections,
    };
  },
});
</script>
<style lang="sass"></style>
