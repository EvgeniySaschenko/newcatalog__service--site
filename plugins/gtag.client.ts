import VueGtag, { trackRouter } from 'vue-gtag-next';
import { AppContextType, GtmElementsEnum } from '@/types';
import useSettingsStore from '@/store/settings';

const gtmElemtSelector = '[data-gtm-element]';

type GtmInfoType = {
  event: 'click' | 'goToPage';
  elementType: number;
  timestamp: number;
  userAgent: string;
  isTouchDevice: boolean;
  screen: { height: number; width: number };
  data?: any;
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
    let { $screen } = nuxtApp as never as AppContextType;
    let { googleTagManagerId } = useSettingsStore().items;

    if (!googleTagManagerId) return;

    nuxtApp.vueApp.use(VueGtag, {
      property: {
        id: googleTagManagerId,
      },
    });

    trackRouter(useRouter());

    let elementCurent: any = null;

    // Google Tag Manager - Click handling
    let handlerClicks = (event: any) => {
      let element: any = event.target.closest(gtmElemtSelector);
      if (!element) return;
      if (!element.dataset.gtmElement) return;
      elementCurent = element;
      let gtmElementData: any = element.dataset.gtmElementData || null;
      let gtmElement = element.dataset.gtmElement as keyof typeof GtmElementsEnum;
      let gtmElementType = GtmElementsEnum[gtmElement];

      switch (gtmElementType) {
        case GtmElementsEnum['custom-element']:
        case GtmElementsEnum['header-button-menu-main']:
        case GtmElementsEnum['header-language-swich-item']:
        case GtmElementsEnum['menu-main-button-close']:
        case GtmElementsEnum['rating-button-links-to-sources']:
        case GtmElementsEnum['links-to-sources-item']:
        case GtmElementsEnum['footer-langs-item']: {
          let { fullPath, name } = useRoute();
          $gtmPush({
            event: 'click',
            pathFrom: fullPath,
            nameFrom: name as any,
            elementType: gtmElementType,
            timestamp: Date.now(),
            userAgent: window.navigator.userAgent,
            isTouchDevice: $screen.isTouchDevice,
            screen: { height: window.screen.height, width: window.screen.width },
            data: gtmElementData,
          });
          break;
        }
      }
    };

    if (!$screen.isTouchDevice) {
      document.addEventListener('mouseup', handlerClicks);
    } else {
      document.addEventListener('touchend', handlerClicks);
    }

    // Adding page transitions in Google Tag Manager
    useRouter().beforeEach((to, from) => {
      let gtmElementType = null;

      if (elementCurent && elementCurent.dataset.gtmElement) {
        gtmElementType = elementCurent.dataset.gtmElement as keyof typeof GtmElementsEnum;
      }
      if (!gtmElementType) return;

      $gtmPush({
        event: 'goToPage',
        pathTo: to?.fullPath,
        nameTo: (to?.name || null) as any,
        pathFrom: from?.fullPath || null,
        nameFrom: (from?.name || null) as any,
        elementType: GtmElementsEnum[gtmElementType],
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
