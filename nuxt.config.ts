export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  vite: {
    server: {
      hmr: {
        // I disable the socket so that no error appears in the console
        protocol: 'break',
      },
    },
  },
  components: {
    global: true,
    dirs: ['@/components/app-preloader', '@/components/app-label-rating', '@/components/app-title'],
  },
});
