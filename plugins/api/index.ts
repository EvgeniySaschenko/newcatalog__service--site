import { SectionType, RatingType, RatingFullType, RatinsBriefType } from '@/types';
import { $request } from '@/plugins/fetch';

export let $api = {
  // Get page rating
  getPageRating: async ({
    ratingId,
  }: {
    ratingId: RatingType['ratingId'];
  }): Promise<RatingFullType> => {
    let result = await $request(`/api/data?data=page-rating&ratingId=${ratingId}`, {
      method: 'GET',
    });
    return result;
  },

  // Get page ratings list section
  getPageSection: async ({
    sectionId,
    page,
  }: {
    sectionId: SectionType['sectionId'];
    page: number;
  }): Promise<RatinsBriefType[]> => {
    let result = await $request(`/api/data?data=page-section&sectionId=${sectionId}&page=${page}`, {
      method: 'GET',
    });
    return result;
  },

  // Get page ratings list all
  getPageRatings: async ({ page }: { page: number }): Promise<RatinsBriefType[]> => {
    let result = await $request(`/api/data?data=page-ratings&page=${page}`, {
      method: 'GET',
    });
    return result;
  },

  // Get sections
  getSections: async (requestClient: any = null): Promise<SectionType[]> => {
    let result = await $request(`/api/data?data=sections`, {
      method: 'GET',
    });
    return result;
  },
};

export default {
  $api,
};
