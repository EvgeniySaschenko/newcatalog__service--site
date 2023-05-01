import VueGtag, { trackRouter } from 'vue-gtag-next';
import { AppContextType } from '@/types';
import useSettingsStore from '@/store/settings';

type GtmInfoType = {
  event: 'rating-item.click' | 'page.transition';
  elementType: number;
  timestamp: number;
  userAgent: string;
  isTouchDevice: boolean;
  screen: { height: number; width: number };
  ratingId?: number;
  ratingItemId?: number;
  siteId?: number;
  pathTo?: string | null;
  nameTo?: string | null;
  pathFrom?: string | null;
  nameFrom?: string | null;
};

export class PluginGtag {
  gtmPush(gtmInfo: GtmInfoType) {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push(gtmInfo);
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  let $gtmPush = new PluginGtag().gtmPush;

  onNuxtReady(() => {
    let { $configApp, $screen } = nuxtApp as never as AppContextType;
    let { googleTagManagerId } = useSettingsStore().items;

    if (!googleTagManagerId) return;

    nuxtApp.vueApp.use(VueGtag, {
      property: {
        id: googleTagManagerId,
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

    if (!$screen.isTouchDevice) {
      document.addEventListener('mouseup', handlerClicks);
    } else {
      document.addEventListener('touchstart', handlerClicks);
    }

    useRouter().beforeEach((to, from) => {
      let elementTypeFrom = null;

      if (elementCurent && elementCurent.dataset.elementType) {
        let elementsTypes = $configApp.elementsTypes;
        elementTypeFrom = elementCurent.dataset.elementType as keyof typeof elementsTypes;
        elementTypeFrom = elementsTypes[elementTypeFrom];
      }

      $gtmPush({
        event: 'page.transition',
        pathTo: to?.fullPath,
        nameTo: (to?.name || null) as any,
        pathFrom: from?.fullPath || null,
        nameFrom: (from?.name || null) as any,
        elementType: elementTypeFrom as number,
        timestamp: Date.now(),
        userAgent: window.navigator.userAgent,
        isTouchDevice: $screen.isTouchDevice,
        screen: { height: window.screen.height, width: window.screen.width },
      });
    });
  });

  return {
    provide: {
      // Function for add info to Google Tag Manager
      gtmPush: $gtmPush,
    },
  };
});
