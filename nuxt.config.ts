// https://nuxt.com/docs/api/configuration/nuxt-config
let { DB_TEMPORARY__HOST, DB_TEMPORARY__DB_CONTENT, DB_TEMPORARY__PORT_INTERNAL } = process.env;

export default defineNuxtConfig({
  vite: {
    server: {
      hmr: {
        protocol: 'break',
      },
    },
  },
});
