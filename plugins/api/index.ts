import { $fetch } from '@/plugins/fetch';
import { SectionType, RatingType, RatingFullType, RatinsBriefType } from '@/types';

export let $api = {
  // Get page rating
  getPageRating: async ({
    ratingId,
  }: {
    ratingId: RatingType['ratingId'];
  }): Promise<RatingFullType> => {
    let result = await $fetch(`/api/data?data=page-rating&ratingId=${ratingId}`, {
      method: 'GET',
    });
    return await result.json();
  },

  // Get page ratings list section
  getPageSection: async ({
    sectionId,
    page,
  }: {
    sectionId: SectionType['sectionId'];
    page: number;
  }): Promise<RatinsBriefType[]> => {
    let result = await $fetch(`/api/data?data=page-section&sectionId=${sectionId}&page=${page}`, {
      method: 'GET',
    });
    return await result.json();
  },

  // Get page ratings list all
  getPageRatings: async ({ page }: { page: number }): Promise<RatinsBriefType[]> => {
    let result = await $fetch(`/api/data?data=page-ratings&page=${page}`, {
      method: 'GET',
    });
    return await result.json();
  },

  // Get sections
  getSections: async (): Promise<SectionType[]> => {
    let result = await $fetch(`/api/data?data=sections`, {
      method: 'GET',
    });
    return await result.json();
  },
};

export default {
  $api,
};
