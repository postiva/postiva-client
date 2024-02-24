export default defineNuxtConfig({
  // https://github.com/nuxt-themes/docus
  extends: "@nuxt-themes/docus",
  devtools: { enabled: true },
  modules: [
    // Remove it if you don't use Plausible analytics
    // https://github.com/nuxt-modules/plausible
    "@nuxtjs/plausible",
  ],
  docus: {
    title: "Postiva",
    description:
      "Your ultimate solution for online documentation and knowledge management.",
    url: "https://docs.postiva.com",
  },
});
