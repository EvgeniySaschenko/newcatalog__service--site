import type { RouterConfig } from '@nuxt/schema';
// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  routes: (routes) => [
    {
      name: 'Рейтинг',
      path: '/rating/:ratingId',
      component: () => import('@/pages/rating/index.vue'),
    },
    {
      name: 'Раздел',
      path: '/section/:sectionId',
      component: () => import('@/pages/rating/index.vue'),
    },
  ],
};
