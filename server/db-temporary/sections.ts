import { dbConnect, prefixes } from '@/server/db-temporary/_db';
import { SectionType } from '@/types';

let sectionsCache = [] as SectionType[];
export class Sections {
  // Get sections
  async getSections(): Promise<SectionType[]> {
    try {
      await dbConnect.connect();
      let result = await dbConnect.get(prefixes['sections']);
      await dbConnect.quit();
      sectionsCache = result ? JSON.parse(result) : [];
      return sectionsCache;
    } catch (error) {
      dbConnect.quit();
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
