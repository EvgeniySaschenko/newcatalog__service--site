import {
  SectionType,
  RatingType,
  RatingFullType,
  RatinsBriefType,
  ResponseShowErrorType,
  AppContextType,
  SettingsType,
} from '@/types';

export class PluginApi {
  constructor(plugins: AppContextType) {
    this._plugins = plugins;
  }

  _plugins = {} as AppContextType;
  // Get page rating
  async getPageRating({
    ratingId,
  }: {
    ratingId: RatingType['ratingId'];
  }): Promise<RatingFullType & ResponseShowErrorType> {
    let result = await this._plugins.$request(`/api/data?data=page-rating&ratingId=${ratingId}`, {
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
    let result = await this._plugins.$request(
      `/api/data?data=page-section&sectionId=${sectionId}&page=${page}`,
      {
        method: 'GET',
      }
    );
    return result;
  }

  // Get page ratings list all
  async getPageRatingsAll({
    page,
  }: {
    page: number;
  }): Promise<RatinsBriefType[] & ResponseShowErrorType> {
    let result = await this._plugins.$request(`/api/data?data=page-ratings-all&page=${page}`, {
      method: 'GET',
    });
    return result;
  }

  // Get sections
  async getInit(): Promise<
    {
      sections: SectionType[];
      settings: SettingsType;
    } & ResponseShowErrorType
  > {
    let result = await this._plugins.$request(`/api/data?data=init`, {
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
