export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  build: {
    transpile: ["vuetify", "@vuepic/vue-datepicker"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
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
  modules: ["@pinia/nuxt"],
});
