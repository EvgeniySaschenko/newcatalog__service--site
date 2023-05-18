import VueLazyLoad from 'vue3-lazyload';
import useSettingsStore from '@/store/settings';

let options = {
  observerOptions: {
    rootMargin: '100px 0px 100px 0px',
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  let { imageAppDefault } = useSettingsStore().items;
  nuxtApp.vueApp.use(VueLazyLoad, Object.assign(options, { error: imageAppDefault }));
});
