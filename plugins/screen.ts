import isTouchDevice from 'is-touch-device';

export type $screenType = {
  isTouchDevice: typeof isTouchDevice;
};

export let $screen = {
  // Check device
  isTouchDevice,
};

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      screen: $screen,
    },
  };
});

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $screen: $screenType;
  }
}
