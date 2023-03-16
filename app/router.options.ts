import type { RouterConfig } from '@nuxt/schema';
import { LangType } from '@/types';
import translate from '@/plugins/translate';

// https://router.vuejs.org/api/interfaces/routeroptions.html
let $router = <RouterConfig>{
  routes: (routes) => [
    {
      name: 'ratings-list-mome',
      path: '/',
      component: () => import('@/pages/ratings-list/index.vue'),
    },
    {
      name: 'ratings-list',
      path: '/:lang',
      component: () => import('@/pages/ratings-list/index.vue'),
    },
    {
      name: 'rating',
      path: '/:lang/rating/:ratingId',
      component: () => import('@/pages/rating/index.vue'),
    },
    {
      name: 'section',
      path: '/:lang/section/:sectionId',
      component: () => import('@/pages/section/index.vue'),
    },
  ],
};
export default $router;
