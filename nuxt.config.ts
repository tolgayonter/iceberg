export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
    "~/assets/styles/main.scss",
  ],
  build: {
    transpile: ["vuetify", "@vuepic/vue-datepicker"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/_variables.scss" as *;',
        },
      },
    },
  },
  runtimeConfig: {
    apiSecret: "",
    public: {
      apiBase: "",
      mapsApiSecret: "",
    },
  },
  plugins: ["~/plugins/datepicker.js"],
  modules: ["@pinia/nuxt", "@vee-validate/nuxt"],
});
