import db from './_db';
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

export const ratings = {
  maxRecordsPerPage: 10,
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

    if (!rating) return false;

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
  async getSectionRatingsList({
    sectionId,
    page,
  }: {
    sectionId: SectionType['sectionId'];
    page: number;
  }): Promise<RatinsBriefListType | boolean> {
    let start = page * this.maxRecordsPerPage - this.maxRecordsPerPage;
    let end = page * this.maxRecordsPerPage;

    if (!sectionsRatingsListCurrent[sectionId]) return false;

    let listIds = sectionsRatingsListCurrent[sectionId].slice(start, end);

    if (!listIds.length) return false;

    let items = [] as RatinsBriefType[];
    for await (let ratingId of listIds) {
      let brief = await this.getRatingBrief({ ratingId });
      if (!brief) throw new Error(`${ratingId}`);
      items.push(brief as RatinsBriefType);
    }

    let itemsCount = sectionsRatingsListCurrent[sectionId].length;
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
  async getRatingsList({ page }: { page: number }): Promise<RatinsBriefListType | boolean> {
    let start = page * this.maxRecordsPerPage - this.maxRecordsPerPage;
    let end = page * this.maxRecordsPerPage;
    let listIds = ratingsListCurrent.slice(start, end);

    if (!listIds.length) return false;

    let items = [] as RatinsBriefType[];
    for await (let ratingId of listIds) {
      let brief = await this.getRatingBrief({ ratingId });
      if (!brief) throw new Error(`${ratingId}`);
      items.push(brief as RatinsBriefType);
    }

    let itemsCount = ratingsListCurrent.length;
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
