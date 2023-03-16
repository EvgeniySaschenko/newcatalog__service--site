import { LangType } from '@/types';
let words = {
  ru: {
    Главная: 'Главная',
    'Рейтинг интернет-сервисов': 'Рейтинг интернет-сервисов',
    Раздел: 'Раздел',
  },
  ua: {
    Главная: 'Головна',
    'Рейтинг интернет-сервисов': 'Рейтинг інтернет-сервісів',
    Раздел: 'Розділ',
  },
};

export type $tType = (key: string) => string;

export default defineNuxtPlugin((nuxtApp) => {
  let $langDefault: keyof LangType = 'ru';
  let { params } = useRoute();
  let cookieLang = useCookie('lang').value as keyof LangType;
  let $langs = ['ua', 'ru'];
  let $lang: keyof LangType = cookieLang || $langDefault;

  // We change the language if the user entered the language in the URL without switching the language. Or if the language in the url does not match the cookie for another reason
  if (params?.lang && params.lang !== $lang) {
    $lang = params.lang as keyof LangType;
  }

  if (!$langs.includes($lang)) {
    $lang = $langDefault;
  }

  let $t = (key: string): string => {
    return words[$lang][key] || key || '';
  };

  return {
    $langDefault,
    $lang,
    $t,
    $langs,
    provide: {
      langs: $langs,
      langDefault: $langDefault,
      t: $t,
      lang: $lang,
    },
  };
});

// Tell TypeScript that this property is global i.e. available in components via "this"
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: $tType;
    $lang: keyof LangType;
  }
}
