// https://nuxt.com/docs/api/configuration/nuxt-confignux
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxtjs/supabase",
    "@vueuse/nuxt",
    "nuxt-headlessui",
    "magic-regexp/nuxt",
  ],
  colorMode: {
    classSuffix: "",
  },
  runtimeConfig: {
    public: {
      TITLE: "",
      DESCRIPTION: "",
      OG_IMAGE: "",
    },
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config.js",
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },
  ssr: true,
  nitro: {
    prerender: {
      routes: ["/"],
    },
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
});
