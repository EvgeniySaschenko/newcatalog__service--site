<template lang="pug">
.app-pagination
  .app-pagination__list
    nuxt-link.app-pagination__item(
      :to='`?page=${item}`',
      data-element-type='app-pagination__item',
      @click.prevent='setUrlParam(item)',
      v-for='item of pages',
      :class='{ active: item === pageCurent }'
    ) {{ item }}
</template>

<script lang="ts">
export default defineComponent({
  emits: ['update'],
  props: {
    // Curent page
    page: {
      type: Number,
      default: 1,
    },
    // Count pages
    pagesCount: {
      type: Number,
      default: 1,
    },
  },

  data() {
    return {
      // List pages
      pages: [] as number[],
      // Page curent
      pageCurent: 1,
    };
  },

  created() {
    this.createPagesList();
    this.pageCurent = this.page;
  },

  methods: {
    // Create pages list
    createPagesList() {
      for (let i = 1; this.pagesCount >= i; i++) {
        this.pages.push(i);
      }
    },

    // Add number page to url
    async setUrlParam(page: number) {
      if (page == this.pageCurent) return;
      this.pageCurent = page;
      await this.$router.push({ query: { page: [page] } });
      this.$emit('update', { page });
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  },
});
</script>
<style lang="sass" scoped>
@import '@/assets/style/_variables.sass'

.app-pagination
  margin: 15px auto
  &__list
    display: flex
    justify-content: center
    flex-wrap: wrap
    font-weight: bold
    overflow-y: auto
  &__item
    display: inline-flex
    justify-content: center
    align-items: center
    height: 30px
    min-width: 30px
    margin: 5px
    padding: 5px
    border: 2px solid $app-primary-color
    cursor: pointer
    &.active
      background-color: $app-primary-color
      color: #ffffff
</style>
