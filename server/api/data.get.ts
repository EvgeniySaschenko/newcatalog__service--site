import { $dbTemporary } from '@/server/db-temporary';
let { SITE__DOMAIN } = process.env;
let referer = `https://${SITE__DOMAIN}`;
let cacheIdDbCurrent: any;

export default defineEventHandler(async (event) => {
  let url = event.node.req.url || '';
  let searchParams = new URL(referer + url).searchParams;
  let cacheIdDb = await $dbTemporary['common'].getCacheId();
  let cacheIdUser = getCookie(event, 'cacheId');

  // Preparation data
  async function preparationData() {
    let typeData = searchParams.get('data') || '';

    switch (typeData) {
      // sections
      case 'init': {
        try {
          let sections = await $dbTemporary['sections'].getSectionsCache();
          let settings = await $dbTemporary['settings'].getSettingsCache();
          return { sections, settings };
        } catch (error) {
          console.error(error);
          return { statusCode: 503 };
        }
        break;
      }
      // page-rating
      case 'page-rating': {
        try {
          let ratingId = searchParams.get('ratingId');
          let response = await $dbTemporary['ratings'].getPageRating({
            ratingId: Number(ratingId),
          });
          return response;
        } catch (error) {
          console.error(error);
          return { statusCode: 404 };
        }
        break;
      }
      // page-ratings/home
      case 'page-ratings-all': {
        try {
          let page = Number(searchParams.get('page')) || 1;
          let response = await $dbTemporary['ratings'].getPageRatingsAll({ page });
          return response;
        } catch (error) {
          console.error(error);
          return { statusCode: 404 };
        }
        break;
      }
      // page-section
      case 'page-section': {
        try {
          let page = Number(searchParams.get('page')) || 1;
          let sectionId = Number(searchParams.get('sectionId'));
          let response = await $dbTemporary['ratings'].getPageSection({ page, sectionId });
          return response;
        } catch (error) {
          console.error(error);
          return { statusCode: 404 };
        }
        break;
      }
      default: {
        return { statusCode: 400 };
      }
    }
  }

  // We copy the lists of rating indicators in Nuxt - that they were always available as an object
  if (cacheIdDb && cacheIdDbCurrent !== cacheIdDb) {
    try {
      await $dbTemporary['settings'].getSettings();
      let sections = await $dbTemporary['sections'].getSections();
      await $dbTemporary['ratings'].initLists({ sections });
    } catch (error) {
      setCookie(event, 'cacheId', '');
      return { statusCode: 503 };
    }
    cacheIdDbCurrent = cacheIdDb;
  }

  // If the client requested data at the time of preparing the cache
  if (!cacheIdDb) {
    setCookie(event, 'cacheId', '');
    return { statusCode: 503 };
  }

  // If the client currently has outdated data and needs to refresh the page
  if (cacheIdUser && cacheIdUser !== cacheIdDb) {
    setCookie(event, 'cacheId', '');
    return { statusCode: 205 };
  }

  let result = await preparationData();

  // Check if the cache has changed while preparing data for the client
  let cacheIdDbAfter = (await $dbTemporary['common'].getCacheId()) || '';
  if (cacheIdDbAfter && cacheIdDbAfter !== cacheIdDb) {
    result = await preparationData();
    cacheIdDbCurrent = cacheIdDb;
  }

  setCookie(event, 'cacheId', cacheIdDbAfter, {
    maxAge: 3600 * 365,
  });

  return result;
});
