// import { Router } from '@nuxt/schema';
import { Router } from 'vue-router';
import { LangsListType } from './langs-list';
import { PluginApi } from '@/plugins/api';
import { PluginRequest } from '@/plugins/request';
import { PluginConfigApp } from '@/plugins/config';
import { PluginScreen } from '@/plugins/screen.client';
import { PluginGtag } from '@/plugins/gtag.client';
import { PluginTranslations } from '@/plugins/translations';

export type AppContextType = {
  $api: PluginApi;
  $request: PluginRequest['request'];
  $configApp: PluginConfigApp;
  $screen: PluginScreen;
  $gtmPush: PluginGtag['gtmPush'];
  $router: Router;
  $langs: PluginTranslations['getLangs'];
  $langDefault: PluginTranslations['getLangDefault'];
  $t: PluginTranslations['t'];
  $setLangDefault: PluginTranslations['setLangDefault'];
  $setLangs: PluginTranslations['setLangs'];
  $setTranslations: PluginTranslations['setTranslations'];
};

// Lang
export type LangType = Partial<LangsListType>;
// Translations type
export type TranslationsType = Record<keyof LangType, Record<string, string>>;

// Settings
export enum SettingsEnum {
  // langs
  langDefault = 'langDefault',
  langs = 'langs',
  // translations
  translations = 'translations',
  // images
  imageAppFavicon = 'imageAppFavicon',
  imageAppPreloader = 'imageAppPreloader',
  imageAppLogo = 'imageAppLogo',
  // colors
  colorPrimary = 'colorPrimary',
  colorPrimaryInverted = 'colorPrimaryInverted',
  colorTextRegular = 'colorTextRegular',
  colorSelectionBackground = 'colorSelectionBackground',
  colorSelectionText = 'colorSelectionText',
  // Code / text
  headScript = 'headScript',
  headStyles = 'headStyles',
  headerHtml = 'headerHtml',
  contentTopHtml = 'contentTopHtml',
  contentBottomHtml = 'contentBottomHtml',
  footerHtml = 'footerHtml',
}

export type SettingsType = {
  // langs
  [SettingsEnum.langDefault]: keyof LangType;
  [SettingsEnum.langs]: (keyof LangType)[];
  // translations
  [SettingsEnum.translations]: TranslationsType;
  // images
  [SettingsEnum.imageAppFavicon]: string;
  [SettingsEnum.imageAppPreloader]: string;
  [SettingsEnum.imageAppLogo]: string;
  // colors
  [SettingsEnum.colorPrimary]: string;
  [SettingsEnum.colorPrimaryInverted]: string;
  [SettingsEnum.colorTextRegular]: string;
  [SettingsEnum.colorSelectionBackground]: string;
  [SettingsEnum.colorSelectionText]: string;
  // Code / text
  [SettingsEnum.headScript]: string;
  [SettingsEnum.headStyles]: string;
  [SettingsEnum.headerHtml]: string;
  [SettingsEnum.contentTopHtml]: string;
  [SettingsEnum.contentBottomHtml]: string;
  [SettingsEnum.footerHtml]: string;
};

// Response show error
export type ResponseShowErrorType = {
  isError: true;
  showError: () => void;
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
