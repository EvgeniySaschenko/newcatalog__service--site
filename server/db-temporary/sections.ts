import { dbConnect, prefixes } from '@/server/db-temporary/db';

export class Sections {
  // Get sections
  async getSections() {
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
