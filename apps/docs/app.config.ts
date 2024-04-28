export default defineAppConfig({
  docus: {
    titleTemplate: "%s - Postiva",
    title: "Documentation",
    description:
      "Boost your digital presence effortlessly with Postiva's SDK. Learn to integrate streamlined content management into your apps for enhanced visibility and engagement",
    url: "https://docs.postiva.com",
    socials: {
      twitter: "aliosmandev",
      github: "postiva/postiva-js",
      postiva: {
        label: "Postiva",
        href: "https://postiva.com",
      },
    },

    image: "/og_image.png",

    github: {
      dir: "docs/content",
      branch: "main",
      repo: "postiva/postiva-js",
      edit: true,
      owner: "Postiva Inc.",
    },

    aside: {
      level: 0,
      collapsed: false,
      exclude: [],
    },

    main: {
      padded: true,
      fluid: true,
    },

    header: {
      logo: true,
      showLinkIcon: true,
      fluid: true,
    },
  },
});
