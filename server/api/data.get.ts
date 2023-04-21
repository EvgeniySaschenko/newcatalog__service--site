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
    let response;

    switch (typeData) {
      // sections
      case 'sections': {
        try {
          response = await $dbTemporary['sections'].getSectionsCache();
          if (!response?.length) throw new Error('Not response');
        } catch (error) {
          console.error(error);
          return { statusCode: 202 };
        }
        break;
      }
      // page-rating
      case 'page-rating': {
        try {
          let ratingId = searchParams.get('ratingId');
          response = await $dbTemporary['ratings'].getPageRating({ ratingId: Number(ratingId) });
          if (!response) throw new Error('Not response');
        } catch (error) {
          console.error(error);
          return { statusCode: 204 };
        }
        break;
      }
      // page-ratings
      case 'page-ratings-list': {
        try {
          let page = Number(searchParams.get('page')) || 1;
          response = await $dbTemporary['ratings'].getRatingsList({ page });
          if (!response) throw new Error('Not response');
        } catch (error) {
          console.error(error);
          return { statusCode: 204 };
        }
        break;
      }
      // page-ratings
      case 'page-section': {
        try {
          let page = Number(searchParams.get('page')) || 1;
          let sectionId = Number(searchParams.get('sectionId'));
          response = await $dbTemporary['ratings'].getSectionRatingsList({ page, sectionId });
          if (!response) throw new Error('Not response');
        } catch (error) {
          console.error(error);
          return { statusCode: 204 };
        }
        break;
      }
      default: {
        return { statusCode: 404 };
      }
    }
    return response;
  }

  // We copy the lists of rating indicators in Nuxt - that they were always available as an object
  if (cacheIdDb && cacheIdDbCurrent !== cacheIdDb) {
    try {
      let sections = await $dbTemporary['sections'].getSections();
      let isSuccess = await $dbTemporary['ratings'].initLists({ sections });
      if (!isSuccess || !sections?.length) throw new Error('Not response');
    } catch (error) {
      setCookie(event, 'cacheId', '');
      return { statusCode: 202 };
    }
    cacheIdDbCurrent = cacheIdDb;
  }

  // If the client requested data at the time of preparing the cache
  if (!cacheIdDb) {
    setCookie(event, 'cacheId', '');
    return { statusCode: 202 };
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
