import db from '@/server/db-temporary/_db';
import {
  SectionType,
  RatingType,
  RatingFullType,
  RatinsBriefType,
  RatinsBriefListType,
} from '@/types';
type SectionsRatingsListType = [number[]];

let ratingsListCurrent: number[] = [];
let sectionsRatingsListCurrent = {} as SectionsRatingsListType;

export class Ratings {
  maxRecordsPerPage = 10;
  // Rating ids are cached in Nuxt
  async initLists({ sections }: { sections: SectionType[] }) {
    let sectionsRatingsList = {} as SectionsRatingsListType;
    let ratingsList = await this.getRatingsIds();
    if (!ratingsList) return false;
    for await (let { sectionId } of sections) {
      let list = await this.getSectionRatingsIds({ sectionId });
      if (!Array.isArray(list)) return false;
      sectionsRatingsList[sectionId] = list;
    }
    ratingsListCurrent = ratingsList as number[];
    sectionsRatingsListCurrent = sectionsRatingsList;
    return true;
  }

  // Get rating
  async getPageRating({
    ratingId,
  }: {
    ratingId: RatingType['ratingId'];
  }): Promise<RatingFullType | boolean> {
    try {
      await db.dbConnect.connect();
      let rating = JSON.parse((await db.dbConnect.get(`${db.prefixes.rating}_${ratingId}`)) || '');
      let labels = JSON.parse(
        (await db.dbConnect.get(`${db.prefixes.labels}_${ratingId}`)) || '[]'
      );
      let ratingItems = JSON.parse(
        (await db.dbConnect.get(`${db.prefixes['rating-items']}_${ratingId}`)) || '{}'
      );

      if (!rating) return false;

      await db.dbConnect.quit();
      return {
        rating,
        labels,
        ratingItems,
      };
    } catch (error) {
      await db.dbConnect.quit();
      console.error(error);
    }
    return false;
  }

  // Get rating brief (for lists)
  async getRatingBrief({
    ratingId,
  }: {
    ratingId: RatingType['ratingId'];
  }): Promise<RatinsBriefType | boolean> {
    try {
      let rating = JSON.parse(
        (await db.dbConnect.get(`${db.prefixes.rating}_${ratingId}`)) || '{}'
      );
      let labels = JSON.parse(
        (await db.dbConnect.get(`${db.prefixes.labels}_${ratingId}`)) || '[]'
      );

      return {
        rating,
        labels,
      };
    } catch (error) {
      console.error(error);
    }
    return false;
  }

  // Get list ids all ratings
  async getRatingsIds(): Promise<RatingType['ratingId'][] | boolean> {
    try {
      await db.dbConnect.connect();
      let result = await db.dbConnect.get(db.prefixes['ratings-list']);
      await db.dbConnect.quit();
      return result ? JSON.parse(result).arr : [];
    } catch (error) {
      await db.dbConnect.quit();
      console.error(error);
    }
    return false;
  }

  // Get list ids all ratings for section
  async getSectionRatingsIds({
    sectionId,
  }: {
    sectionId: SectionType['sectionId'];
  }): Promise<RatingType['ratingId'][] | boolean> {
    try {
      await db.dbConnect.connect();
      let result = await db.dbConnect.get(`${db.prefixes['section-ratings']}_${sectionId}`);
      await db.dbConnect.quit();
      return result ? JSON.parse(result).arr : [];
    } catch (error) {
      await db.dbConnect.quit();
      console.error(error);
    }
    return false;
  }

  // Get list briefs for page section
  async getSectionRatingsList({
    sectionId,
    page,
  }: {
    sectionId: SectionType['sectionId'];
    page: number;
  }): Promise<RatinsBriefListType | boolean> {
    try {
      let start = page * this.maxRecordsPerPage - this.maxRecordsPerPage;
      let end = page * this.maxRecordsPerPage;

      if (!sectionsRatingsListCurrent[sectionId]) return false;

      let listIds = sectionsRatingsListCurrent[sectionId].slice(start, end);

      if (!listIds.length) return false;

      let items = [] as RatinsBriefType[];
      await db.dbConnect.connect();
      for await (let ratingId of listIds) {
        let brief = await this.getRatingBrief({ ratingId });
        if (!brief) throw new Error(`${ratingId}`);
        items.push(brief as RatinsBriefType);
      }
      await db.dbConnect.quit();
      let itemsCount = sectionsRatingsListCurrent[sectionId].length;
      let pagesCount = Math.ceil(itemsCount / this.maxRecordsPerPage);
      return {
        items,
        page,
        pagesCount,
        itemsCount,
        maxRecordsPerPage: this.maxRecordsPerPage,
      };
    } catch (error) {
      await db.dbConnect.quit();
      console.error(error);
    }
    return false;
  }

  // Get list briefs for page list ratings
  async getRatingsList({ page }: { page: number }): Promise<RatinsBriefListType | boolean> {
    try {
      let start = page * this.maxRecordsPerPage - this.maxRecordsPerPage;
      let end = page * this.maxRecordsPerPage;
      let listIds = ratingsListCurrent.slice(start, end);

      if (!listIds.length) return false;

      let items = [] as RatinsBriefType[];
      await db.dbConnect.connect();
      for await (let ratingId of listIds) {
        let brief = await this.getRatingBrief({ ratingId });
        if (!brief) throw new Error(`${ratingId}`);
        items.push(brief as RatinsBriefType);
      }
      await db.dbConnect.quit();

      let itemsCount = ratingsListCurrent.length;
      let pagesCount = Math.ceil(itemsCount / this.maxRecordsPerPage);
      return {
        items,
        page,
        pagesCount,
        itemsCount,
        maxRecordsPerPage: this.maxRecordsPerPage,
      };
    } catch (error) {
      db.dbConnect.quit();
      console.error(error);
    }
    return false;
  }
}

export default {};
