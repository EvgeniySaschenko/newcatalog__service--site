import { defineStore } from 'pinia';
import { SettingsType } from '@/types';

export default defineStore('settings', {
  state: () => ({
    items: {} as SettingsType,
  }),
  actions: {
    // Set settings
    setSettings(items: SettingsType) {
      this.items = items;
    },
  },
});
