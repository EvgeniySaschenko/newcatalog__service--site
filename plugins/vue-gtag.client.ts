import VueGtag, { trackRouter } from 'vue-gtag-next';

export default defineNuxtPlugin((nuxtApp) => {
  let $pluginGtmPush = (gtmInfo: object) => {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push(gtmInfo);
  };

  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: nuxtApp.$pluginConfig.gtmId,
    },
  });

  trackRouter(useRouter());

  let elementCurent: any = null;

  // Google Tag Manager - collection of statistics of transitions of transitions between pages
  let handlerClicks = (event: any) => {
    let element: any = event.target;
    if (!element) return;
    if (!element.dataset.elementType) return;
    elementCurent = element;
  };

  if (!nuxtApp.$pluginScreen.isTouchDevice()) {
    document.addEventListener('mouseup', handlerClicks);
  } else {
    document.addEventListener('touchstart', handlerClicks);
  }

  useRouter().beforeEach((to, from) => {
    let elementTypeFrom = null;
    if (elementCurent && elementCurent.dataset.elementType) {
      elementTypeFrom = elementCurent.dataset
        .elementType as keyof typeof nuxtApp.$pluginConfig.elementsTypes;
      elementTypeFrom = nuxtApp.$pluginConfig.elementsTypes[elementTypeFrom];
    }
    $pluginGtmPush({
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
      isTouchDevice: nuxtApp.$pluginScreen.isTouchDevice(),
      screen: { height: window.screen.height, width: window.screen.width },
    });
  });

  return {
    provide: {
      // Function for add info to Google Tag Manager
      pluginGtmPush: $pluginGtmPush,
    },
  };
});
