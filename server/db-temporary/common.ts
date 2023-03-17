import db from '@/server/db-temporary/_db';

export class Common {
  // Get cache id
  async getCacheId() {
    try {
      await db.dbConnect.connect();
      let result = await db.dbConnect.get(db.prefixes['cache-id']);
      if (typeof result === 'string') {
        result = result.split('-').reverse().join('-');
      }
      await db.dbConnect.quit();
      return result;
    } catch (error) {
      await db.dbConnect.quit();
      console.error(error);
    }
    return false;
  }
}

export default {};
