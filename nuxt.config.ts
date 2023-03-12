import translete from '@/plugins/translete';

export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  // vite: {
  //   server: {
  //     hmr: {
  //       protocol: 'break',
  //     },
  //   },
  // },
  components: {
    global: true,
    dirs: ['@/components/app-preloader'],
  },
});
