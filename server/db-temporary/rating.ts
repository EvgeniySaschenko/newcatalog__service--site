import { dbConnect, prefixes } from '@/server/db-temporary/db';

export class Rating {
  maxRatingsPage = 10;
  // Get rating
  async getRating(ratingId: number) {
    try {
      await dbConnect.connect();
      let rating = JSON.parse((await dbConnect.get(`${prefixes['rating']}_${ratingId}`)) || '{}');
      let labels = JSON.parse((await dbConnect.get(`${prefixes['labels']}_${ratingId}`)) || '[]');
      let ratingItems = JSON.parse(
        (await dbConnect.get(`${prefixes['rating-items']}_${ratingId}`)) || '{}'
      );
      await dbConnect.quit();
      return {
        rating,
        labels,
        ratingItems,
      };
    } catch (error) {
      dbConnect.quit();
      console.error(error);
    }
    return false;
  }

  // Get rating brief (for lists)
  async getRatingBrief(ratingId: number) {
    try {
      await dbConnect.connect();
      let rating = JSON.parse((await dbConnect.get(`${prefixes['rating']}_${ratingId}`)) || '{}');
      let labels = JSON.parse((await dbConnect.get(`${prefixes['labels']}_${ratingId}`)) || '[]');
      await dbConnect.quit();
      return {
        rating,
        labels,
      };
    } catch (error) {
      dbConnect.quit();
      console.error(error);
    }
    return false;
  }

  // Get list ids all ratings
  async getRatingsIds() {
    try {
      await dbConnect.connect();
      let { arr } = JSON.parse((await dbConnect.get(prefixes['ratings-list'])) || '[]');
      await dbConnect.quit();
      return arr;
    } catch (error) {
      dbConnect.quit();
      console.error(error);
    }
    return false;
  }

  // Get list ids all ratings for section
  async getSectionRatingsIds(sectionId: number) {
    try {
      await dbConnect.connect();
      let { arr } = JSON.parse(
        `${await dbConnect.get(prefixes['section-ratings'])}_${sectionId}` || '[]'
      );
      await dbConnect.quit();
      return arr;
    } catch (error) {
      dbConnect.quit();
      console.error(error);
    }
    return false;
  }
}

export default {};
