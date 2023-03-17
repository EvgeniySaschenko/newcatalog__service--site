import isTouchDevice from 'is-touch-device';

export type $pluginScreenType = {
  isTouchDevice: typeof isTouchDevice;
};

export default defineNuxtPlugin((nuxtApp) => {
  let $pluginScreen = {
    isTouchDevice,
  };

  return {
    provide: {
      // Check device
      pluginScreen: $pluginScreen,
    },
  };
});
