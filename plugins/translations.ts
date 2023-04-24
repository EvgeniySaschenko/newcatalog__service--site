import { LangType, AppContextType, TranslationsType, SettingsType } from '@/types';

export class PluginTranslations {
  constructor(plugins: AppContextType) {
    this._plugins = plugins;
  }

  translations = {} as unknown as TranslationsType;
  // ['en', 'uk']
  _langs = [] as SettingsType['langs'];
  // 'en'
  _langDefault = '' as keyof LangType;

  _plugins = {} as AppContextType;

  // Function for  translate
  t(key: string) {
    if (!this.translations) return key;
    if (!this.translations[this._langDefault]) return key;
    return this.translations[this._langDefault][key] || key;
  }

  // Set lang default
  setLangDefault(langDefault: keyof LangType) {
    let cookitName = this._plugins.$configApp.cookies.lang;
    let cookieLangDefault = useCookie(cookitName).value as keyof LangType;
    this._langDefault = cookieLangDefault;

    let { params, path } = useRoute();

    // We change the language if the user entered the language in the URL without switching the language. Or if the language in the url does not match the cookie for another reason
    if (params?.lang && params.lang !== this._langDefault) {
      this._langDefault = params.lang as keyof LangType;
    }

    // If the path does not exist in the router, then the "lang params" does not exist either.
    let error: any = useError();
    if (error?.value?.statusCode == 404) {
      let lang = path.split('/')[1];
      this._langDefault = lang as keyof LangType;
    }

    if (!this._langs.includes(this._langDefault)) {
      this._langDefault = langDefault;
    }
  }

  // Set langs
  setLangs(langs: SettingsType['langs']) {
    this._langs = langs;
  }

  // Set translations
  setTranslations(translations: TranslationsType) {
    this.translations = translations;
  }

  // Get langDefault
  getLangDefault() {
    return this._langDefault;
  }

  // Get langs
  getLangs() {
    return this._langs;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  let context = nuxtApp as never as AppContextType;
  let pluginTranslations = new PluginTranslations(context);
  let { getLangs, getLangDefault, t, setLangDefault, setLangs, setTranslations } =
    pluginTranslations;

  return {
    // As an exception, the "plugin" prefix was not added
    provide: {
      // All langs
      langs: getLangs.bind(pluginTranslations),
      // Lang default (Current language)
      langDefault: getLangDefault.bind(pluginTranslations),
      // Function for  translate
      t: t.bind(pluginTranslations),
      // setLangDefault
      setLangDefault: setLangDefault.bind(pluginTranslations),
      // setLangs
      setLangs: setLangs.bind(pluginTranslations),
      // setTranslations
      setTranslations: setTranslations.bind(pluginTranslations),
    },
  };
});
