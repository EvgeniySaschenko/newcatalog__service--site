import { SectionType, RatingType, RatingFullType, RatinsBriefType } from '@/types';
import { $pluginRequest } from '@/plugins/request';

export default defineNuxtPlugin((nuxtApp) => {
  let $pluginApi = {
    // Get page rating
    getPageRating: async ({
      ratingId,
    }: {
      ratingId: RatingType['ratingId'];
    }): Promise<RatingFullType> => {
      let result = await $pluginRequest(`/api/data?data=page-rating&ratingId=${ratingId}`, {
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
      let result = await $pluginRequest(
        `/api/data?data=page-section&sectionId=${sectionId}&page=${page}`,
        {
          method: 'GET',
        }
      );
      return result;
    },

    // Get page ratings list all
    getPageRatingsList: async ({ page }: { page: number }): Promise<RatinsBriefType[]> => {
      let result = await $pluginRequest(`/api/data?data=page-ratings-list&page=${page}`, {
        method: 'GET',
      });
      return result;
    },

    // Get sections
    getSections: async (): Promise<SectionType[]> => {
      let result = await $pluginRequest(`/api/data?data=sections`, {
        method: 'GET',
      });
      return result;
    },
  };

  return {
    provide: {
      pluginApi: $pluginApi,
    },
  };
});
