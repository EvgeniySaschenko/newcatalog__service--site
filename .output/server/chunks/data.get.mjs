import { defineEventHandler, getCookie, setCookie } from 'h3';
import { createClient } from 'redis';

let {
  DB_TEMPORARY__HOST,
  DB_TEMPORARY__DB_SITE,
  DB_TEMPORARY__PORT_INTERNAL,
  DB_TEMPORARY__DB_SITE_PREFIXES
} = process.env;
let dbConnect = createClient({
  url: `${DB_TEMPORARY__HOST}:${DB_TEMPORARY__PORT_INTERNAL}/${DB_TEMPORARY__DB_SITE}`
});
dbConnect.connect();
dbConnect.on("error", async (err) => {
  console.error('Redis content "SITE"', err);
  await dbConnect.quit();
  await dbConnect.connect();
});
let prefixes = JSON.parse(DB_TEMPORARY__DB_SITE_PREFIXES || "");
const db = { dbConnect, prefixes };

const common = {
  // Get cache id
  async getCacheId() {
    try {
      let result = await db.dbConnect.get(db.prefixes["cache-id"]);
      if (typeof result === "string") {
        result = result.split("-").reverse().join("-");
      }
      return result;
    } catch (error) {
      return null;
    }
  }
};

let ratingsListCache = [];
let sectionsRatingsListCache = {};
const ratings = {
  maxRecordsPerPage: 10,
  // Rating ids are cached in Nuxt
  async initLists({ sections }) {
    let sectionsRatingsList = {};
    let ratingsList = await this.getRatingsIds();
    if (!ratingsList) {
      throw new Error('No valid data: "initLists - !ratingsList"');
    }
    for await (let { sectionId } of sections) {
      let list = await this.getSectionRatingsIds({ sectionId });
      if (!Array.isArray(list)) {
        throw new Error('No valid data: "initLists - !Array.isArray(list)"');
      }
      sectionsRatingsList[sectionId] = list;
    }
    if (!ratingsList.length) {
      throw new Error('No valid data: "initLists - !(ratingsList as []).length"');
    }
    ratingsListCache = ratingsList;
    if (!Object.keys(sectionsRatingsList).length) {
      throw new Error('No valid data: "initLists - !Object.keys(sectionsRatingsList).length"');
    }
    sectionsRatingsListCache = sectionsRatingsList;
    return true;
  },
  // Get rating
  async getPageRating({
    ratingId
  }) {
    let rating = JSON.parse(await db.dbConnect.get(`${db.prefixes.rating}_${ratingId}`) || "");
    let labels = JSON.parse(await db.dbConnect.get(`${db.prefixes.labels}_${ratingId}`) || "[]");
    let ratingItems = JSON.parse(await db.dbConnect.get(`${db.prefixes["rating-items"]}_${ratingId}`) || "[]");
    if (!rating)
      throw new Error('No valid data: "getPageRating - !rating"');
    return {
      rating,
      labels,
      ratingItems
    };
  },
  // Get rating brief (for lists)
  async getRatingBrief({
    ratingId
  }) {
    let rating = JSON.parse(await db.dbConnect.get(`${db.prefixes.rating}_${ratingId}`) || "");
    let labels = JSON.parse(await db.dbConnect.get(`${db.prefixes.labels}_${ratingId}`) || "[]");
    if (!rating)
      return false;
    return {
      rating,
      labels
    };
  },
  // Get list ids all ratings
  async getRatingsIds() {
    let result = await db.dbConnect.get(db.prefixes["ratings-list"]);
    if (!result)
      return false;
    return JSON.parse(result).arr;
  },
  // Get list ids all ratings for section
  async getSectionRatingsIds({
    sectionId
  }) {
    let result = await db.dbConnect.get(`${db.prefixes["section-ratings"]}_${sectionId}`);
    if (!result)
      return false;
    return JSON.parse(result).arr;
  },
  // Get list briefs for page section
  async getPageSection({
    sectionId,
    page
  }) {
    let start = page * this.maxRecordsPerPage - this.maxRecordsPerPage;
    let end = page * this.maxRecordsPerPage;
    if (!sectionsRatingsListCache[sectionId]) {
      throw new Error('No valid data: "getPageSection - !sectionsRatingsListCache[sectionId]"');
    }
    let listIds = sectionsRatingsListCache[sectionId].slice(start, end);
    if (!listIds.length) {
      throw new Error('No valid data: "getPageSection - !listIds.length"');
    }
    let items = [];
    for await (let ratingId of listIds) {
      let brief = await this.getRatingBrief({ ratingId });
      if (!brief)
        throw new Error(`${ratingId}`);
      items.push(brief);
    }
    let itemsCount = sectionsRatingsListCache[sectionId].length;
    let pagesCount = Math.ceil(itemsCount / this.maxRecordsPerPage);
    return {
      items,
      page,
      pagesCount,
      itemsCount,
      maxRecordsPerPage: this.maxRecordsPerPage
    };
  },
  // Get list briefs for page list ratings
  async getPageRatingsAll({ page }) {
    let start = page * this.maxRecordsPerPage - this.maxRecordsPerPage;
    let end = page * this.maxRecordsPerPage;
    let listIds = ratingsListCache.slice(start, end);
    if (!listIds.length)
      throw new Error('No valid data: "getPageRatingsAll - !listIds.length"');
    let items = [];
    for await (let ratingId of listIds) {
      let brief = await this.getRatingBrief({ ratingId });
      if (!brief)
        throw new Error('No valid data: "getPageRatingsAll - !brief"');
      items.push(brief);
    }
    let itemsCount = ratingsListCache.length;
    let pagesCount = Math.ceil(itemsCount / this.maxRecordsPerPage);
    return {
      items,
      page,
      pagesCount,
      itemsCount,
      maxRecordsPerPage: this.maxRecordsPerPage
    };
  }
};

let sectionsCache = [];
const sections = {
  // Get sections
  async getSections() {
    let result = await db.dbConnect.get(db.prefixes.sections);
    sectionsCache = JSON.parse(result || "");
    if (!(sectionsCache == null ? void 0 : sectionsCache.length)) {
      sectionsCache = [];
      throw new Error('No valid data: "getSections - !sectionsCache?.length"');
    }
    return sectionsCache;
  },
  // Get sections cache
  async getSectionsCache() {
    if (sectionsCache.length) {
      return sectionsCache;
    }
    return await this.getSections();
  }
};

let settingsCache = {};
const settings = {
  // Get settings
  async getSettings() {
    let settings2 = JSON.parse(await db.dbConnect.get(db.prefixes["settings"]) || "");
    let translations = JSON.parse(await db.dbConnect.get(db.prefixes["translations-site"]) || "");
    settingsCache = Object.assign({}, settings2, { translations });
    let key;
    for (key in settingsCache) {
      if (!settingsCache[key] === void 0) {
        settingsCache = {};
        throw new Error('No valid data: "getSettings - !settingsCache[key]"');
      }
    }
    return settingsCache;
  },
  // Get settings cache
  async getSettingsCache() {
    if (settingsCache) {
      return settingsCache;
    }
    return await this.getSettings();
  }
};

const $dbTemporary = { common, ratings, sections, settings };

let { SITE__DOMAIN } = process.env;
let referer = `https://${SITE__DOMAIN}`;
let cacheIdDbCurrent;
const data_get = defineEventHandler(async (event) => {
  let url = event.node.req.url || "";
  let searchParams = new URL(referer + url).searchParams;
  let cacheIdDb = await $dbTemporary["common"].getCacheId();
  let cacheIdUser = getCookie(event, "cacheId");
  async function preparationData() {
    let typeData = searchParams.get("data") || "";
    switch (typeData) {
      case "init": {
        try {
          let sections = await $dbTemporary["sections"].getSectionsCache();
          let settings = await $dbTemporary["settings"].getSettingsCache();
          return { sections, settings };
        } catch (error) {
          console.error(error);
          return { statusCode: 503 };
        }
        break;
      }
      case "page-rating": {
        try {
          let ratingId = searchParams.get("ratingId");
          let response = await $dbTemporary["ratings"].getPageRating({
            ratingId: Number(ratingId)
          });
          return response;
        } catch (error) {
          console.error(error);
          return { statusCode: 404 };
        }
        break;
      }
      case "page-ratings-all": {
        try {
          let page = Number(searchParams.get("page")) || 1;
          let response = await $dbTemporary["ratings"].getPageRatingsAll({ page });
          return response;
        } catch (error) {
          console.error(error);
          return { statusCode: 404 };
        }
        break;
      }
      case "page-section": {
        try {
          let page = Number(searchParams.get("page")) || 1;
          let sectionId = Number(searchParams.get("sectionId"));
          let response = await $dbTemporary["ratings"].getPageSection({ page, sectionId });
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
  if (cacheIdDb && cacheIdDbCurrent !== cacheIdDb) {
    try {
      await $dbTemporary["settings"].getSettings();
      let sections = await $dbTemporary["sections"].getSections();
      await $dbTemporary["ratings"].initLists({ sections });
    } catch (error) {
      setCookie(event, "cacheId", "");
      return { statusCode: 503 };
    }
    cacheIdDbCurrent = cacheIdDb;
  }
  if (!cacheIdDb) {
    setCookie(event, "cacheId", "");
    return { statusCode: 503 };
  }
  if (cacheIdUser && cacheIdUser !== cacheIdDb) {
    setCookie(event, "cacheId", "");
    return { statusCode: 205 };
  }
  let result = await preparationData();
  let cacheIdDbAfter = await $dbTemporary["common"].getCacheId() || "";
  if (cacheIdDbAfter && cacheIdDbAfter !== cacheIdDb) {
    result = await preparationData();
    cacheIdDbCurrent = cacheIdDb;
  }
  setCookie(event, "cacheId", cacheIdDbAfter, {
    maxAge: 3600 * 365
  });
  return result;
});

export { data_get as default };
//# sourceMappingURL=data.get.mjs.map
