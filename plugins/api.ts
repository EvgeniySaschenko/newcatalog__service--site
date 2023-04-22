import {
  SectionType,
  RatingType,
  RatingFullType,
  RatinsBriefType,
  ResponseShowErrorType,
  AppContextType,
} from '@/types';

export class PluginApi {
  constructor(nuxtApp: AppContextType) {
    this.nuxtApp = nuxtApp;
  }

  nuxtApp = {} as AppContextType;
  // Get page rating
  async getPageRating({
    ratingId,
  }: {
    ratingId: RatingType['ratingId'];
  }): Promise<RatingFullType & ResponseShowErrorType> {
    let result = await this.nuxtApp.$request(`/api/data?data=page-rating&ratingId=${ratingId}`, {
      method: 'GET',
    });
    return result;
  }

  // Get page ratings list section
  async getPageSection({
    sectionId,
    page,
  }: {
    sectionId: SectionType['sectionId'];
    page: number;
  }): Promise<RatinsBriefType[] & ResponseShowErrorType> {
    let result = await this.nuxtApp.$request(
      `/api/data?data=page-section&sectionId=${sectionId}&page=${page}`,
      {
        method: 'GET',
      }
    );
    return result;
  }

  // Get page ratings list all
  async getPageRatingsList({
    page,
  }: {
    page: number;
  }): Promise<RatinsBriefType[] & ResponseShowErrorType> {
    let result = await this.nuxtApp.$request(`/api/data?data=page-ratings-list&page=${page}`, {
      method: 'GET',
    });
    return result;
  }

  // Get sections
  async getSections(): Promise<SectionType[] & ResponseShowErrorType> {
    let result = await this.nuxtApp.$request(`/api/data?data=sections`, {
      method: 'GET',
    });
    return result;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  let context = nuxtApp as never as AppContextType;
  return {
    provide: {
      api: new PluginApi(context),
    },
  };
});
