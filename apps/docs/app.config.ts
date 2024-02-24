export default defineAppConfig({
  docus: {
    titleTemplate: "%s - Postiva",
    title: "Documentation",
    description:
      "Your ultimate solution for online documentation and knowledge management.",
    url: "https://docs.postiva.com",
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
