export interface TransleteType {
  (key: string): string;
}

// Tell TypeScript that this property is global i.e. available in components via "this"
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: TransleteType;
  }
}

export let lang = 'ua';

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      lang,
      t: (key: string): string => {
        return key || '';
      },
    },
  };
});
