// Lang
export type LangType = {
  ua: string;
  ru: string;
};

// Section
export type SectionType = {
  sectionId: number;
  name: LangType;
  countRatingPublished: number;
};

// Label
export type LabelType = {
  labelId: number;
  name: LangType;
  color: string;
};

// Rating
export type RatingType = {
  ratingId: number;
  descr: LangType;
  name: LangType;
  sectionsIds: [key: SectionType['sectionId']];
  dateFirstPublication: Date | null;
};

// Rating item
export type RatingItemType = {
  ratingItemId: number;
  ratingId: number;
  siteId: number;
  url: string;
  name: LangType;
  labelsIds: [key: LabelType['labelId']];
  logoImg: string;
  hostname: string;
  color: string;
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

export type RatinsBriefListType = {
  items: RatinsBriefType[];
  page: number;
  pagesCount: number;
  itemsCount: number;
  maxRecordsPerPage: number;
};

// Breadcrum
export type BreadcrumbType = {
  name: string;
  url: string;
};
