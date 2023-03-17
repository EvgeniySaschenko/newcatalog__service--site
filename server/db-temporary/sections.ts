import db from '@/server/db-temporary/_db';
import { SectionType } from '@/types';

let sectionsCache = [] as SectionType[];
export class Sections {
  // Get sections
  async getSections(): Promise<SectionType[]> {
    try {
      await db.dbConnect.connect();
      let result = await db.dbConnect.get(db.prefixes.sections);
      await db.dbConnect.quit();
      sectionsCache = result ? JSON.parse(result) : [];
      return sectionsCache;
    } catch (error) {
      db.dbConnect.quit();
      console.error(error);
    }
    return [];
  }

  // Get sections cache
  async getSectionsCache(): Promise<SectionType[]> {
    if (sectionsCache.length) {
      return sectionsCache;
    }
    return await this.getSections();
  }
}

export default {};
