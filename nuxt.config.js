// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // modules: ['@unocss/nuxt', 'nuxt-icon', '@nuxtjs/tailwindcss'],
  modules: ['nuxt-icon', '@nuxt/ui', '@nuxtjs/color-mode'],
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },


  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL || 'https://mirspecf.mtradeasia.com:8443/api' ,
    },
  },
  typescript: {
    typeCheck: false,
  },
  ssr: false,
  router: {
    options: {
      // hashMode: true,
    },
    middleware: ['auth']
  },
  colorMode: {
    preference: 'light', // default value of $colorMode.preference
    fallback: 'light',
  },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in', // default
    },
  },
  devtools: {
    enabled: true,
  },
})
