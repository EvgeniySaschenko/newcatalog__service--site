import { dbConnect, prefixes } from '@/server/db-temporary/_db';
import { SectionType } from '@/types';

export class Sections {
  // Get sections
  async getSections(): Promise<SectionType[]> {
    try {
      await dbConnect.connect();
      let result = await dbConnect.get(prefixes['sections']);
      await dbConnect.quit();
      return result ? JSON.parse(result) : [];
    } catch (error) {
      dbConnect.quit();
      console.error(error);
    }
    return [];
  }
}

export default {};
