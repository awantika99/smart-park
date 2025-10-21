// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxt-icon', '@nuxt/ui', '@nuxtjs/color-mode'],

  build: {
    transpile: ['@vuepic/vue-datepicker']
  },

  runtimeConfig: {
    // ⚠️ Everything under `public` is exposed to the browser
    public: {
      runtimeConfig: {
  public: {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'
  }
}

    },
  },

  typescript: {
    typeCheck: false,
  },

  ssr: false,

  // temporarily remove authentication middleware for public access
  router: {
    options: {
      // hashMode: true,
    },
    // Comment out or remove auth middleware to bypass login protection
    // middleware: ['auth']
  },

  colorMode: {
    preference: 'light',
    fallback: 'light',
  },

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    head: {
      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`,
          async: true,
          defer: true,
        },
      ],
    },
  },

  devtools: {
    enabled: true,
  },
})
