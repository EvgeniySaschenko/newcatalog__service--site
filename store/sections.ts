import { defineStore } from 'pinia';
import { SectionType } from '@/types';

type ItemsMapType = {
  [key: SectionType['sectionId']]: SectionType;
};

export default defineStore('sections', {
  state: () => ({
    items: [] as SectionType[],
    itemsMap: {} as ItemsMapType,
  }),
  actions: {
    // Set sections
    setSections(items: SectionType[]) {
      this.items = items;

      for (let section of items) {
        let sectionId = section['sectionId'];
        this.itemsMap[sectionId] = section;
      }
    },
  },
});
