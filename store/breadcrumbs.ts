import { defineStore } from 'pinia';
import { BreadcrumbType } from '@/types';

export default defineStore('breadcrumbs', {
  state: () => ({
    items: [] as BreadcrumbType[],
  }),
  actions: {
    // Breadcrumbs
    setBreadcrumbs(items: BreadcrumbType[]) {
      this.items = items;
    },
  },
});
