import db from './_db';
import { SettingsType } from '@/types';

let settingsCache = {} as never as SettingsType;

export const settings = {
  // Get settings
  async getSettings(): Promise<SettingsType> {
    let langs = JSON.parse((await db.dbConnect.get(db.prefixes['langs-site'])) || '');
    let langDefault = JSON.parse((await db.dbConnect.get(db.prefixes['lang-default-site'])) || '');
    let translations = JSON.parse((await db.dbConnect.get(db.prefixes['translations-site'])) || '');

    settingsCache = {
      langs,
      langDefault,
      translations,
    };

    let key: keyof typeof settingsCache;
    for (key in settingsCache) {
      if (!settingsCache[key]) {
        settingsCache = {} as never as SettingsType;
        throw new Error('No valid data: "getSettings - !settingsCache[key]"');
      }
    }
    return settingsCache;
  },

  // Get settings cache
  async getSettingsCache(): Promise<SettingsType> {
    if (settingsCache) {
      return settingsCache;
    }
    return await this.getSettings();
  },
};
