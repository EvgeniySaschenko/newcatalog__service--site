import db from './_db';
import { SectionType } from '@/types';

let sectionsCache = [] as SectionType[];
export const sections = {
  // Get sections
  async getSections(): Promise<SectionType[]> {
    let result = await db.dbConnect.get(db.prefixes.sections);
    sectionsCache = JSON.parse(result || '');
    return sectionsCache;
  },

  // Get sections cache
  async getSectionsCache(): Promise<SectionType[]> {
    if (sectionsCache.length) {
      return sectionsCache;
    }
    return await this.getSections();
  },
};
