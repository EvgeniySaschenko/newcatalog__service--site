import { Common } from '@/server/db-temporary/common';
import { Sections } from '@/server/db-temporary/sections';
import { Ratings } from '@/server/db-temporary/ratings';
let { SITE__DOMAIN } = process.env;
let referer = `https://${SITE__DOMAIN}`;
let cacheIdDbCurrent: any;

export default defineEventHandler(async (event) => {
  let url = event.node.req.url || '';
  let searchParams = new URL(referer + url).searchParams;
  let common = new Common();
  let cacheIdDb = await common.getCacheId();
  let cacheIdUser = getCookie(event, 'cacheId');

  // Preparation data
  async function preparationData() {
    let typeData = searchParams.get('data') || '';
    let response;

    switch (typeData) {
      // sections
      case 'sections': {
        let sections = new Sections();
        response = await sections.getSectionsCache();
        break;
      }
      // page-rating
      case 'page-rating': {
        let ratingId = searchParams.get('ratingId');
        let ratings = new Ratings();
        response = await ratings.getPageRating({ ratingId: Number(ratingId) });
        event.node.res.statusCode = 200;
        if (!response) {
          event.node.res.statusCode = 404;
        }
        break;
      }
      // page-ratings
      case 'page-ratings-list': {
        let page = Number(searchParams.get('page')) || 1;
        let ratings = new Ratings();
        response = await ratings.getRatingsList({ page });
        event.node.res.statusCode = 200;
        if (!response) {
          event.node.res.statusCode = 404;
        }
        break;
      }
      // page-ratings
      case 'page-section': {
        let page = Number(searchParams.get('page')) || 1;
        let sectionId = Number(searchParams.get('sectionId'));
        let ratings = new Ratings();
        response = await ratings.getSectionRatingsList({ page, sectionId });
        event.node.res.statusCode = 200;
        if (!response) {
          event.node.res.statusCode = 404;
        }
        break;
      }
      default:
        event.node.res.statusCode = 404;
    }
    return response;
  }

  // We copy the lists of rating indicators in Nuxt - that they were always available as an object
  if (cacheIdDb && cacheIdDbCurrent !== cacheIdDb) {
    let ratings = new Ratings();
    let sections = await new Sections().getSections();
    let isSuccess = await ratings.initLists({ sections });
    if (!isSuccess) {
      setCookie(event, 'cacheId', '');
      throw createError({ statusCode: 202 });
    }
    cacheIdDbCurrent = cacheIdDb;
  }

  // If the client requested data at the time of preparing the cache
  if (!cacheIdDb) {
    setCookie(event, 'cacheId', '');
    throw createError({ statusCode: 202 });
  }

  // If the client currently has outdated data and needs to refresh the page
  if (cacheIdUser && cacheIdUser !== cacheIdDb) {
    setCookie(event, 'cacheId', '');
    throw createError({ statusCode: 205 });
  }

  let result = await preparationData();

  // Check if the cache has changed while preparing data for the client
  let cacheIdDbAfter = (await common.getCacheId()) || '';
  if (cacheIdDbAfter && cacheIdDbAfter !== cacheIdDb) {
    result = await preparationData();
    cacheIdDbCurrent = cacheIdDb;
  }

  setCookie(event, 'cacheId', cacheIdDbAfter, {
    maxAge: 3600 * 365,
  });

  return result;
});
