export let $config = {
  projectName: 'NEWCATALOG',
};

// Tell TypeScript that this property is global i.e. available in components via "this"
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $config: typeof $config;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      ...$config,
    },
  };
});
