import { dbConnect, prefixes } from '@/server/db-temporary/_db';
import { SectionType, RatingType, LabelType, RatingItemType } from '@/types';
let ratingsListCurrent: number[] = [];
let sectionsRatingsListCurrent: any = {};

type RatingFullType = {
  labels: LabelType[];
  rating: RatingType;
  ratingItems: RatingItemType[];
};

type RatinsBriefType = {
  labels: LabelType[];
  rating: RatingType;
};

export class Ratings {
  maxCountRatingsPage = 10;
  // Rating ids are cached in Nuxt
  async initLists({ sections }: { sections: SectionType[] }) {
    let sectionsRatingsList = {} as any;
    let ratingsList = await this.getRatingsIds();
    if (!ratingsList) return false;
    for await (let { sectionId } of sections) {
      let list = await this.getSectionRatingsIds({ sectionId });
      if (!list && typeof Array.isArray(list)) return false;
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
      await dbConnect.connect();
      let rating = JSON.parse((await dbConnect.get(`${prefixes['rating']}_${ratingId}`)) || '');
      let labels = JSON.parse((await dbConnect.get(`${prefixes['labels']}_${ratingId}`)) || '[]');
      let ratingItems = JSON.parse(
        (await dbConnect.get(`${prefixes['rating-items']}_${ratingId}`)) || '{}'
      );

      if (!rating) return false;

      await dbConnect.quit();
      return {
        rating,
        labels,
        ratingItems,
      };
    } catch (error) {
      await dbConnect.quit();
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
      let rating = JSON.parse((await dbConnect.get(`${prefixes['rating']}_${ratingId}`)) || '{}');
      let labels = JSON.parse((await dbConnect.get(`${prefixes['labels']}_${ratingId}`)) || '[]');

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
      await dbConnect.connect();
      let result = await dbConnect.get(prefixes['ratings-list']);
      await dbConnect.quit();
      return result ? JSON.parse(result).arr : [];
    } catch (error) {
      await dbConnect.quit();
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
      await dbConnect.connect();
      let result = await dbConnect.get(`${prefixes['section-ratings']}_${sectionId}`);
      await dbConnect.quit();
      return result ? JSON.parse(result).arr : [];
    } catch (error) {
      await dbConnect.quit();
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
  }): Promise<
    | {
        items: RatinsBriefType[];
        page: number;
        countItems: number;
      }
    | boolean
  > {
    try {
      let start = page * this.maxCountRatingsPage - this.maxCountRatingsPage;
      let end = page * this.maxCountRatingsPage;

      if (!sectionsRatingsListCurrent[sectionId]) return false;

      let listIds = sectionsRatingsListCurrent[sectionId].slice(start, end);

      if (!listIds.length) return false;

      let items = [] as RatinsBriefType[];
      await dbConnect.connect();
      for await (let ratingId of listIds) {
        let brief = await this.getRatingBrief({ ratingId });
        if (!brief) throw Error(`${ratingId}`);
        items.push(brief as RatinsBriefType);
      }
      await dbConnect.quit();
      return {
        items,
        page,
        countItems: sectionsRatingsListCurrent[sectionId].length,
      };
    } catch (error) {
      await dbConnect.quit();
      console.error(error);
    }
    return false;
  }

  // Get list briefs for page list ratings
  async getRatingsList({ page }: { page: number }): Promise<
    | {
        items: RatinsBriefType[];
        page: number;
        countItems: number;
      }
    | boolean
  > {
    try {
      let start = page * this.maxCountRatingsPage - this.maxCountRatingsPage;
      let end = page * this.maxCountRatingsPage;
      let listIds = ratingsListCurrent.slice(start, end);

      if (!listIds.length) return false;

      let items = [] as RatinsBriefType[];
      await dbConnect.connect();
      for await (let ratingId of listIds) {
        let brief = await this.getRatingBrief({ ratingId });
        if (!brief) throw Error(`${ratingId}`);
        items.push(brief as RatinsBriefType);
      }
      await dbConnect.quit();
      return {
        items,
        page,
        countItems: ratingsListCurrent.length,
      };
    } catch (error) {
      dbConnect.quit();
      console.error(error);
    }
    return false;
  }
}

export default {};
