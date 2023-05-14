export class PluginConfigApp {
  cookies = {
    // Current language
    lang: 'lang',
    // Current cache id - to refresh the page if the cache has changed
    cacheId: 'cacheId',
  };
}

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      configApp: new PluginConfigApp(),
    },
  };
});
