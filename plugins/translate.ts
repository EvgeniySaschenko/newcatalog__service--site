import { LangType } from '@/types';
let $words = {
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

export type $wordsType = keyof (typeof $words)[keyof LangType];
export type $tType = (key: $wordsType) => string;

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

  let $t: $tType = (key) => {
    return $words[$lang][key] || key || '';
  };

  return {
    // As an exception, the "plugin" prefix was not added
    provide: {
      // All langs
      langs: $langs,
      // Lang default
      langDefault: $langDefault,
      // Function for  translate
      t: $t,
      // Current language
      lang: $lang,
    },
  };
});
