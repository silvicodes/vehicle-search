export default defineNuxtConfig({
  css: [
    '@/assets/scss/main.scss',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/scss/variables.scss";
          `,
        },
      },
    },
  },
  modules: [
    '@pinia/nuxt',
  ],
  pages: false,
});