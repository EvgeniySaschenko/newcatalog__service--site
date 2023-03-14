import VueGtag, { trackRouter } from 'vue-gtag-next';
import { $config } from './config';
import { $screen } from './screen';

let initGtmEvents = false;
export let $gtmPush = (gtmInfo: object) => {
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push(gtmInfo);
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $gtmPush: typeof $gtmPush;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: $config.gtmId,
    },
  });

  trackRouter(useRouter());

  let elementCurent: any = null;

  // Google Tag Manager - collection of statistics of transitions of transitions between pages
  let handlerClicks = (event: any) => {
    initGtmEvents = true;

    let element: any = event.target;
    if (!element) return;
    if (!element.dataset.elementType) return;
    elementCurent = element;
  };

  if (!initGtmEvents) {
    if (!$screen.isTouchDevice()) {
      document.addEventListener('mouseup', handlerClicks);
    } else {
      document.addEventListener('touchstart', handlerClicks);
    }
  }

  useRouter().beforeEach((to, from) => {
    let elementTypeFrom = null;
    if (elementCurent && elementCurent.dataset.elementType) {
      elementTypeFrom = elementCurent.dataset.elementType as keyof typeof $config.elementsTypes;
      elementTypeFrom = $config.elementsTypes[elementTypeFrom];
    }
    $gtmPush({
      event: 'page.transition',
      pathTo: to.path,
      typeTo: to.name,
      paramsTo: to.params,
      queryTo: to.query,
      pathFrom: from.path,
      typeFrom: from.name,
      paramsFrom: from.params,
      queryFrom: from.query,
      elementType: elementTypeFrom,
      timestamp: Date.now(),
      userAgent: window.navigator.userAgent,
      isTouchDevice: $screen.isTouchDevice(),
      screen: { height: window.screen.height, width: window.screen.width },
    });
  });

  return {
    provide: {
      gtmPush: $gtmPush,
    },
  };
});
