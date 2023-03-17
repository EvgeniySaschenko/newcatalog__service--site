import { LangType } from '@/types';

export default defineNuxtPlugin((nuxtApp) => {
  onNuxtReady(() => {
    let { path, params } = nuxtApp.$router.currentRoute.value;
    let { $lang, $langDefault, $langs } = nuxtApp;

    // If the main page is requested without specifying the language
    if (path === '/') {
      return navigateTo('/' + $lang);
    }

    // If a non-existent language is specified
    if (params?.lang && !$langs.includes(params.lang as keyof LangType)) {
      showError({ statusCode: 404, statusMessage: 'Page Not Found' });
    }

    // If on the client the user ended up on the main page without the language in the url (For example, when moving from 404)
    nuxtApp.$router.beforeResolve((to: any) => {
      if (to.path === '/') {
        nuxtApp.$router.push('/' + $langDefault);
      }
    });
  });
});
