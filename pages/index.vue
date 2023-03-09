<template lang="pug">
h1.title-page {{ ratingsList.items }} 444
</template>

<script lang="ts">
import { $api } from '@/plugins/api';
import { defineComponent } from 'vue';

// import useSectionsStore from '@/store/sections';
export default defineNuxtComponent({
  fetchKey: 'hello',
  async asyncData() {
    let ratingsList = await $api.getPageSection({ sectionId: 1, page: 1 });
    return {
      ratingsList,
    };
  },

  data() {
    return {
      ratingsList: {},
    };
  },
});
// export default defineComponent({
//   setup() {},

//   // data() {
//   //   return {
//   //     // sections: [],
//   //     ratingsList: {},
//   //   };
//   // },

//   // async mounted() {
//   //   let ratingsList = await $api.getPageSection({ sectionId: 1, page: 1 });
//   //   // this.ratingsList = ratingsList;
//   //   // console.log(ratingsList);
//   // },
// });
</script>
<style lang="sass"></style>
