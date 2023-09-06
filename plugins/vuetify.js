import { createVuetify } from "vuetify";
// TODO: Later organize imports
import * as components from "vuetify/components";
import * as labsComponents from "vuetify/labs/components";
import * as directives from "vuetify/directives";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components: {
      ...components,
      ...labsComponents,
    },
    directives,
  });

  nuxtApp.vueApp.use(vuetify);
});
