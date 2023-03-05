import { dbConnect, prefixes } from '@/server/db-temporary/db';

export class Common {
  // Get cache id
  async getCacheId() {
    try {
      await dbConnect.connect();
      let result = await dbConnect.get(prefixes['cache-id']);
      await dbConnect.quit();
      return result;
    } catch (error) {
      dbConnect.quit();
      console.error(error);
    }
    return false;
  }
}

export default {};
