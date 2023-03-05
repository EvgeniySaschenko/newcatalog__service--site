let { SITE__DOMAIN } = process.env;
let referer = `https://${SITE__DOMAIN}`;
import { Common } from '@/server/db-temporary/common';
import { Sections } from '@/server/db-temporary/sections';

export default defineEventHandler(async (event) => {
  let url = event.node.req.url || '';
  let searchParams = new URL(referer + url).searchParams;
  let common = new Common();
  let cacheIdDb = await common.getCacheId();
  let cookies = parseCookies(event);
  let cacheIdUser = cookies.cacheId;

  // Preparation data
  async function preparationData() {
    let typeData = searchParams.get('data') || '';
    let response;
    switch (typeData) {
      case 'sections': {
        let sections = new Sections();
        response = await sections.getSections();
        break;
      }
    }

    return response;
  }

  // If the client requested data at the time of preparing the cache
  if (!cacheIdDb) {
    setCookie(event, 'cacheId', '');
    event.node.res.statusCode = 202;
    return;
  }

  // If the client currently has outdated data and needs to refresh the page
  if (cacheIdUser && cacheIdUser !== cacheIdDb) {
    setCookie(event, 'cacheId', '');
    event.node.res.statusCode = 205;
  }

  let result = await preparationData();

  // Check if the cache has changed while preparing data for the client
  let cacheIdDbAfter = (await common.getCacheId()) || '';
  if (cacheIdDbAfter !== cacheIdDb) {
    result = await preparationData();
  }

  setCookie(event, 'cacheId', cacheIdDbAfter);

  return result;
});
