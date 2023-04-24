import db from './_db';
import {
  SectionType,
  RatingType,
  RatingFullType,
  RatinsBriefType,
  RatinsBriefListType,
} from '@/types';
type SectionsRatingsListType = Record<number, number[]>;

let ratingsListCache: number[] = [];
let sectionsRatingsListCache = {} as SectionsRatingsListType;

export const ratings = {
  maxRecordsPerPage: 10,
  // Rating ids are cached in Nuxt
  async initLists({ sections }: { sections: SectionType[] }) {
    let sectionsRatingsList = {} as SectionsRatingsListType;
    let ratingsList = await this.getRatingsIds();
    if (!ratingsList) {
      throw new Error('No valid data: "initLists - !ratingsList"');
    }
    for await (let { sectionId } of sections) {
      let list = await this.getSectionRatingsIds({ sectionId });
      if (!Array.isArray(list)) {
        // eslint-disable-next-line unicorn/prefer-type-error
        throw new Error('No valid data: "initLists - !Array.isArray(list)"');
      }
      sectionsRatingsList[sectionId] = list;
    }
    if (!(ratingsList as []).length) {
      throw new Error('No valid data: "initLists - !(ratingsList as []).length"');
    }
    ratingsListCache = ratingsList as number[];

    if (!Object.keys(sectionsRatingsList).length) {
      // eslint-disable-next-line prettier/prettier
      throw new Error('No valid data: "initLists - !Object.keys(sectionsRatingsList).length"');
    }
    sectionsRatingsListCache = sectionsRatingsList;
    return true;
  },

  // Get rating
  async getPageRating({
    ratingId,
  }: {
    ratingId: RatingType['ratingId'];
  }): Promise<RatingFullType | boolean> {
    let rating = JSON.parse((await db.dbConnect.get(`${db.prefixes.rating}_${ratingId}`)) || '');

    let labels = JSON.parse((await db.dbConnect.get(`${db.prefixes.labels}_${ratingId}`)) || '[]');
    // eslint-disable-next-line prettier/prettier
    let ratingItems = JSON.parse((await db.dbConnect.get(`${db.prefixes['rating-items']}_${ratingId}`)) || '[]');

    if (!rating) throw new Error('No valid data: "getPageRating - !rating"');

    return {
      rating,
      labels,
      ratingItems,
    };
  },

  // Get rating brief (for lists)
  async getRatingBrief({
    ratingId,
  }: {
    ratingId: RatingType['ratingId'];
  }): Promise<RatinsBriefType | boolean> {
    // eslint-disable-next-line prettier/prettier
      let rating = JSON.parse((await db.dbConnect.get(`${db.prefixes.rating}_${ratingId}`)) || '');
    // eslint-disable-next-line prettier/prettier
      let labels = JSON.parse((await db.dbConnect.get(`${db.prefixes.labels}_${ratingId}`)) || '[]');

    if (!rating) return false;

    return {
      rating,
      labels,
    };
  },

  // Get list ids all ratings
  async getRatingsIds(): Promise<RatingType['ratingId'][] | boolean> {
    let result = await db.dbConnect.get(db.prefixes['ratings-list']);
    if (!result) return false;
    return JSON.parse(result).arr;
  },

  // Get list ids all ratings for section
  async getSectionRatingsIds({
    sectionId,
  }: {
    sectionId: SectionType['sectionId'];
  }): Promise<RatingType['ratingId'][] | boolean> {
    let result = await db.dbConnect.get(`${db.prefixes['section-ratings']}_${sectionId}`);
    if (!result) return false;
    return JSON.parse(result).arr;
  },

  // Get list briefs for page section
  async getPageSection({
    sectionId,
    page,
  }: {
    sectionId: SectionType['sectionId'];
    page: number;
  }): Promise<RatinsBriefListType | boolean> {
    let start = page * this.maxRecordsPerPage - this.maxRecordsPerPage;
    let end = page * this.maxRecordsPerPage;

    if (!sectionsRatingsListCache[sectionId]) {
      // eslint-disable-next-line prettier/prettier
      throw new Error('No valid data: "getPageSection - !sectionsRatingsListCache[sectionId]"');
    }

    let listIds = sectionsRatingsListCache[sectionId].slice(start, end);

    if (!listIds.length) {
      throw new Error('No valid data: "getPageSection - !listIds.length"');
    }

    let items = [] as RatinsBriefType[];
    for await (let ratingId of listIds) {
      let brief = await this.getRatingBrief({ ratingId });
      if (!brief) throw new Error(`${ratingId}`);
      items.push(brief as RatinsBriefType);
    }

    let itemsCount = sectionsRatingsListCache[sectionId].length;
    let pagesCount = Math.ceil(itemsCount / this.maxRecordsPerPage);
    return {
      items,
      page,
      pagesCount,
      itemsCount,
      maxRecordsPerPage: this.maxRecordsPerPage,
    };
  },

  // Get list briefs for page list ratings
  async getPageRatingsAll({ page }: { page: number }): Promise<RatinsBriefListType | boolean> {
    let start = page * this.maxRecordsPerPage - this.maxRecordsPerPage;
    let end = page * this.maxRecordsPerPage;
    let listIds = ratingsListCache.slice(start, end);

    if (!listIds.length) throw new Error('No valid data: "getPageRatingsAll - !listIds.length"');

    let items = [] as RatinsBriefType[];
    for await (let ratingId of listIds) {
      let brief = await this.getRatingBrief({ ratingId });
      if (!brief) throw new Error('No valid data: "getPageRatingsAll - !brief"');
      items.push(brief as RatinsBriefType);
    }

    let itemsCount = ratingsListCache.length;
    let pagesCount = Math.ceil(itemsCount / this.maxRecordsPerPage);
    return {
      items,
      page,
      pagesCount,
      itemsCount,
      maxRecordsPerPage: this.maxRecordsPerPage,
    };
  },
};
