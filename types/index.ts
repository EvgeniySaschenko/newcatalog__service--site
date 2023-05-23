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
  imageAppDefault = 'imageAppDefault',
  // colors
  colorBodyBackground = 'colorBodyBackground',
  colorPrimary = 'colorPrimary',
  colorPrimaryInverted = 'colorPrimaryInverted',
  colorTextRegular = 'colorTextRegular',
  colorSelectionBackground = 'colorSelectionBackground',
  colorSelectionText = 'colorSelectionText',
  // Code / text
  headScript = 'headScript',
  headStyles = 'headStyles',
  headerInfoHtml = 'headerInfoHtml',
  headerHtml = 'headerHtml',
  contentTopHtml = 'contentTopHtml',
  contentBottomHtml = 'contentBottomHtml',
  footerHtml = 'footerHtml',
  // Seo / Marketing
  pageTitlePrefix = 'pageTitlePrefix',
  pageTitleSufix = 'pageTitleSufix',
  googleTagManagerCode = 'googleTagManagerCode',
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
  [SettingsEnum.imageAppDefault]: string;
  // colors
  [SettingsEnum.colorBodyBackground]: string;
  [SettingsEnum.colorPrimary]: string;
  [SettingsEnum.colorPrimaryInverted]: string;
  [SettingsEnum.colorTextRegular]: string;
  [SettingsEnum.colorSelectionBackground]: string;
  [SettingsEnum.colorSelectionText]: string;
  // Code / text
  [SettingsEnum.headScript]: string;
  [SettingsEnum.headStyles]: string;
  [SettingsEnum.headerInfoHtml]: string;
  [SettingsEnum.headerHtml]: string;
  [SettingsEnum.contentTopHtml]: string;
  [SettingsEnum.contentBottomHtml]: string;
  [SettingsEnum.footerHtml]: string;
  // Seo / Marketing
  [SettingsEnum.pageTitlePrefix]: string;
  [SettingsEnum.pageTitleSufix]: string;
  [SettingsEnum.googleTagManagerCode]: string;
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

export type SectionMapType = {
  [key: SectionType['sectionId']]: SectionType;
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
  linksToSources: string[];
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


// Elements types aliases, for Google Tag Manager
export enum GtmElementsEnum {
  'custom-element' = 'custom-element', // can be used in custom HTML blocks 
  'header-logo' = 'header-logo',
  'header-button-menu-main' = 'header-button-menu-main',
  'header-language-swich-item' = 'header-language-swich-item',
  'menu-main-button-close' = 'menu-main-button-close',
  'menu-main-logo' = 'menu-main-logo',
  'menu-main-item' = 'menu-main-item',
  'menu-slider-item' = 'menu-slider-item', 
  'rating-button-links-to-sources' = 'rating-button-links-to-sources', 
  'links-to-sources-item' = 'links-to-sources-item', 
  'breadcrumbs-item' = 'breadcrumbs-item',
  'pagination-item' = 'pagination-item', 
  'ratings-list-title' = 'ratings-list-title', 
  'labels-sections-item' = 'labels-sections-item', 
  'rating-items-item' = 'rating-items-item',
  'footer-langs-item' = 'footer-langs-item',
  'page-error-logo' = 'page-error-logo',
  'page-error-button-home' = 'page-error-button-home',
};
