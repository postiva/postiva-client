export default defineAppConfig({
  docus: {
    titleTemplate: "%s - Postiva",
    title: "Postiva",
    description:
      "Your ultimate solution for online documentation and knowledge management.",
    image: "logo.png",
    socials: {
      twitter: "aliosmandev",
      github: "postiva/postiva-js",
      postiva: {
        label: "Postiva",
        href: "https://postiva.com",
      },
    },
    github: {
      dir: "docs/content",
      branch: "main",
      repo: "postiva/postiva-js",
      edit: true,
      owner: "Postiva Inc.",
    },
    header: {
      logo: true,
      showLinkIcon: true,
    },
  },
});
