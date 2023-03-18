import { LangType } from '@/types';
let $words = {
  ru: {
    Home: 'Главная',
    'Rating of Internet services': 'Рейтинг интернет-сервисов',
    Section: 'Раздел',
    'Server error': 'Ошибка сервера',
    'Page not found': 'Страница не найдена',
    'The server is being updated': 'Сервер обновляется',
    'Try refreshing the page a little later': 'Попробуйте обновить страницу немного позже',
    'Go to home': 'Перейти на главную',
    'Refresh page': 'Обновить страницу',
  },
  ua: {
    Home: 'Головна',
    'Rating of Internet services': 'Рейтинг інтернет-сервісів',
    Section: 'Розділ',
    'Server error': 'Помилка сервера',
    'Page not found': 'Сторінка не знайдена',
    'The server is being updated': 'Сервер оновлюється',
    'Try refreshing the page a little later': 'Спробуйте оновити сторінку трохи пізніше',
    'Go to home': 'Перейти на головну',
    'Refresh page': 'Оновити сторінку',
  },
};

export type $wordsType = keyof (typeof $words)[keyof LangType];
export type $tType = (key: $wordsType) => string;

export default defineNuxtPlugin((nuxtApp) => {
  let cookitName = nuxtApp.$pluginConfig.cookies.lang;
  let cookieLang = useCookie(cookitName).value as keyof LangType;
  let $langDefault: keyof LangType = 'ru';
  let $langs = ['ua', 'ru'];
  let $lang: keyof LangType = cookieLang || $langDefault;

  let { params, path } = useRoute();

  // We change the language if the user entered the language in the URL without switching the language. Or if the language in the url does not match the cookie for another reason
  if (params?.lang && params.lang !== $lang) {
    $lang = params.lang as keyof LangType;
  }

  // If the path does not exist in the router, then the "lang params" does not exist either.
  let error: any = useError();
  if (error?.value?.statusCode == 404) {
    let lang = path.split('/')[1];
    $lang = lang as keyof LangType;
  }

  if (!$langs.includes($lang)) {
    $lang = $langDefault;
  }

  let $t: $tType = (key) => {
    let words = '';
    if ($words[$lang]) {
      words = $words[$lang][key];
    }
    return words || key || '';
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
