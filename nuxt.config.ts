// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-icon'
  ],
  devtools: { enabled: true },
  ssr: false,
  routeRules: {
    // Homepage pre-rendered at build time
    '/*': {
      cors: true,
      headers: {
        'access-control-allow-methods': 'GET, POST',
      }
    },
  },
})
