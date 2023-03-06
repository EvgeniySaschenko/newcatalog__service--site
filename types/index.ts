export type ValueOfType<T> = T[keyof T];

// Lang
export type LangType = {
  ua: string;
  ru: string;
};

export const LangInit = (): LangType => {
  return {
    ua: '',
    ru: '',
  };
};

// Section
export type SectionType = {
  sectionId: number;
  countRatingPublished: number;
  isHiden: boolean;
  name: LangType;
  priority: number;
};

// Rating

export enum RatingTypeTypeEnum {
  site = '1',
}

export enum RatingDisplayTypeEnum {
  tile = '1',
  inline = '2',
}

export enum RatingSortTypeEnum {
  alexa = '1',
  click = '2',
}

// Site
export type SiteType = {
  siteId: number;
  siteScreenshotId: number;
  img: string;
  color: string;
  host: string;
  alexaRank: number;
  dateDomainCreate: Date;
};

// Rating
export type RatingType = {
  userId: number;
  ratingId: number;
  isHiden: boolean;
  descr: LangType;
  name: LangType;
  sectionsIds: object;
  typeDisplay: RatingDisplayTypeEnum;
  typeRating: RatingTypeTypeEnum;
  typeSort: RatingSortTypeEnum;
  dateCreate?: Date;
  dateCacheCreation: Date | null;
  dateFirstPublication: Date | null;
  countRatingItemsTotal: number;
  countRatingItemsHidden: number;
};

// Rating item
export type RatingItemType = {
  ratingItemId: number;
  siteScreenshotId: number;
  isHiden: boolean;
  labelsIds: object;
  name: LangType;
  siteId: number;
  priority: number;
  ratingId: number;
  url: string;
  domain: string;
  color: string;
};

// Label
export type LabelType = {
  labelId: number;
  name: LangType;
  color: string;
  ratingId: number;
};

// For rating pages
export type RatingFullType = {
  labels: LabelType[];
  rating: RatingType;
  ratingItems: RatingItemType[];
};

// For list ratings pages
export type RatinsBriefType = {
  labels: LabelType[];
  rating: RatingType;
};
