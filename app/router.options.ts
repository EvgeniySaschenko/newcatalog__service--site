import type { RouterConfig } from '@nuxt/schema';
// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  routes: (routes) => [
    {
      name: 'Список рейтингов',
      path: '/',
      component: () => import('@/pages/ratings-list/index.vue'),
    },
    {
      name: 'Рейтинг',
      path: '/rating/:ratingId',
      component: () => import('@/pages/rating/index.vue'),
    },
    {
      name: 'Раздел',
      path: '/section/:sectionId',
      component: () => import('@/pages/section/index.vue'),
    },
  ],
};
