import {
  SectionType,
  RatingType,
  RatingFullType,
  RatinsBriefType,
  ResponseShowErrorType,
} from '@/types';

export default defineNuxtPlugin((nuxtApp) => {
  let $pluginApi;

  $pluginApi = {
    // Get page rating
    getPageRating: async ({
      ratingId,
    }: {
      ratingId: RatingType['ratingId'];
    }): Promise<RatingFullType & ResponseShowErrorType> => {
      let result = await nuxtApp.$request(`/api/data?data=page-rating&ratingId=${ratingId}`, {
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
    }): Promise<RatinsBriefType[] & ResponseShowErrorType> => {
      let result = await nuxtApp.$request(
        `/api/data?data=page-section&sectionId=${sectionId}&page=${page}`,
        {
          method: 'GET',
        }
      );
      return result;
    },

    // Get page ratings list all
    getPageRatingsList: async ({
      page,
    }: {
      page: number;
    }): Promise<RatinsBriefType[] & ResponseShowErrorType> => {
      let result = await nuxtApp.$request(`/api/data?data=page-ratings-list&page=${page}`, {
        method: 'GET',
      });
      return result;
    },

    // Get sections
    getSections: async (): Promise<SectionType[] & ResponseShowErrorType> => {
      let result = await nuxtApp.$request(`/api/data?data=sections`, {
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
