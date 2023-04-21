import db from './_db';

export const common = {
  // Get cache id
  async getCacheId(): Promise<string | null> {
    try {
      let result = await db.dbConnect.get(db.prefixes['cache-id']);
      if (typeof result === 'string') {
        result = result.split('-').reverse().join('-');
      }
      return result;
    } catch (error) {
      return null;
    }
  },
};
