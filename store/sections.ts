import { defineStore } from 'pinia';
import { SectionType } from '@/types';

export default defineStore('sections', {
  state: () => ({
    items: [] as SectionType[],
  }),
  actions: {
    // Set sections
    setSections(items: SectionType[]) {
      this.items = items;
    },
  },
});
