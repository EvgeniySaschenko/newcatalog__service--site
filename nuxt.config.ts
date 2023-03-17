export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  vite: {
    server: {
      hmr: {
        protocol: 'break',
      },
    },
  },
  components: {
    global: true,
    dirs: [
      '@/components/app-preloader',
      '@/components/app-label-rating',
      '@/components/app-page-title',
    ],
  },
});
