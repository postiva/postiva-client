import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Postiva Docs",
  titleTemplate: ':title · Postiva Docs',
  description: "Postiva is a simple and easy to use API for sending emails.",
  rewrites: {
    "": "/guide/what-is-postiva.html",
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "https://postiva.app/" },
      { text: "Guide", link: "/guide/what-is-postiva" },
    ],

    logo:"https://postiva.app/images/logo.png",

    sidebar: [
      {
        text: "Guide",
        items: [
          {
            text: "What is Postiva?",
            link: "/guide/what-is-postiva",
          },
          { text: "Getting Started", link: "/guide/getting-started" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/postiva/postiva-js" },
    ],
  },
  cleanUrls: true,
  lastUpdated: true
});
