import { $fetch } from '@/plugins/fetch';

export let $api = {
  // Get all labels for rating
  getLabels: async ({ ratingId }: { ratingId: number }) => {
    let result = (await $fetch(`/api/labels/rating/${ratingId}`, {
      method: 'GET',
    })) as any;
    return await result.json();
  },

  getRatings: async () => {
    let result = (await $fetch(`/api/ratings`, {
      method: 'GET',
    })) as any;
    return await result.json();
  },

  getItems: async ({ ratingId }: { ratingId: number; typeSort: string }) => {
    let result = (await $fetch(`/api/ratings-items/rating/${ratingId}`, {
      method: 'GET',
    })) as any;
    return await result.json();
  },

  getSections: async () => {
    let result = (await $fetch(`/api/cache?data=sections`, {
      method: 'GET',
    })) as any;
    return await result.json();
  },
};

export default {
  $api,
};
