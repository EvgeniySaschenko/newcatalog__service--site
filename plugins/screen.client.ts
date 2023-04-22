import isTouchDevice from 'is-touch-device';

export class PluginScreen {
  isTouchDevice = isTouchDevice();
}

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      // Check device
      screen: new PluginScreen(),
    },
  };
});
