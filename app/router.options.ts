import type { RouterConfig } from '@nuxt/schema';

// https://router.vuejs.org/api/interfaces/routeroptions.html
const $router = <RouterConfig>{
  routes: (routes) => [
    {
      name: 'home',
      path: '/',
      component: () => import('@/pages/ratings-all/index.vue'),
    },
    {
      name: 'ratings-all',
      path: '/:lang',
      component: () => import('@/pages/ratings-all/index.vue'),
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
