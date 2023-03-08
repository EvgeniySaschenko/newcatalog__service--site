import translete from '@/plugins/translete';

export default defineNuxtConfig({
  vite: {
    server: {
      hmr: {
        protocol: 'break',
      },
    },
  },
});
