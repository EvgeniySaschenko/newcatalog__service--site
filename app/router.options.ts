import type { RouterConfig } from '@nuxt/schema';
// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  routes: (routes) => [
    {
      name: 'ratings-list',
      path: '/',
      component: () => import('@/pages/ratings-list/index.vue'),
    },
    {
      name: 'rating',
      path: '/rating/:ratingId',
      component: () => import('@/pages/rating/index.vue'),
    },
    {
      name: 'section',
      path: '/section/:sectionId',
      component: () => import('@/pages/section/index.vue'),
    },
  ],
};
