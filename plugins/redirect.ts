import { LangType, AppContextType } from '@/types';

export default defineNuxtPlugin((nuxtApp) => {
  onNuxtReady(() => {
    let context = nuxtApp as never as AppContextType;
    let { path, params } = context.$router.currentRoute.value;
    let { $langs, $langDefault } = context;

    // If the main page is requested without specifying the language
    if (path === '/') {
      return navigateTo('/' + $langDefault());
    }

    // If a non-existent language is specified
    if (params?.lang && !$langs().includes(params.lang as keyof LangType)) {
      showError({ statusCode: 404 });
    }

    // If on the client the user ended up on the main page without the language in the url (For example, when moving from 404)
    context.$router.beforeResolve((to: any) => {
      if (to.path === '/') {
        context.$router.push('/' + $langDefault());
      }
    });
  });
});
