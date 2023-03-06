import { dbConnect, prefixes } from '@/server/db-temporary/_db';

export class Common {
  // Get cache id
  async getCacheId() {
    try {
      await dbConnect.connect();
      let result = await dbConnect.get(prefixes['cache-id']);
      if (typeof result === 'string') {
        result = result.split('').reverse().join(',');
      }
      await dbConnect.quit();
      return result;
    } catch (error) {
      await dbConnect.quit();
      console.error(error);
    }
    return false;
  }
}

export default {};
