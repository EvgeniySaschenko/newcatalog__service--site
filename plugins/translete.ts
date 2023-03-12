export let $t = (key: string): string => {
  return key || '';
};

export let $lang = 'ua';

// Tell TypeScript that this property is global i.e. available in components via "this"
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: typeof $t;
    $lang: typeof $lang;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      t: $t,
      lang: $lang,
    },
  };
});
