import { defineStore } from 'pinia';
import { SectionType, SectionMapType } from '@/types';

export default defineStore('sections', {
  state: () => ({
    items: [] as SectionType[],
    itemsMap: {} as SectionMapType,
  }),
  actions: {
    // Set sections
    setSections(items: SectionType[]) {
      this.items = items;

      for (let section of items) {
        let sectionId = section.sectionId;
        this.itemsMap[sectionId] = section;
      }
    },
  },
});
