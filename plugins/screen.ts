import isTouchDevice from 'is-touch-device';

export let $screen = {
  isTouchDevice,
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $screen: typeof $screen;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      screen: $screen,
    },
  };
});
