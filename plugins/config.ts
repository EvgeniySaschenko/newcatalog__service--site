export let $config = {
  // Used in meta tags
  projectName: 'NEWCATALOG',
  // Google Tag Manager
  gtmId: 'GTM-KCCL483',
  // Elements types aliases, for Google Tag Manager
  elementsTypes: {
    'app-header__logo': 1,
    'app-breadcrumbs__link': 2,
    'app-menu-main__link': 3,
    'app-pagination__item': 4,
    'app-ratings-list__title': 5,
    'labels-sections__item': 6,
    'rating-items__item': 7,
  },
  cookies: {
    // Current language
    lang: 'lang',
    // Current cache id - to refresh the page if the cache has changed
    cacheId: 'cacheId',
  },
};

// Tell TypeScript that this property is global i.e. available in components via "this"
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $config: typeof $config;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      $config,
    },
  };
});
