export class PluginConfigApp {
  cookies = {
    // Current language
    lang: 'lang',
    // Current cache id - to refresh the page if the cache has changed
    cacheId: 'cacheId',
  };

  // image stub
  imageStub = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
}

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      configApp: new PluginConfigApp(),
    },
  };
});
