module.exports = {
  title: "Toast",
  version: "1.2",
  base: "/toast/",
  description:
    "A development focused WordPress starter theme to complete your balanced breakfast.",
  base: "/horizon/",
  themeConfig: {
    logo: "/upload/horizon-logo.png",
    nav: [
      { text: "Home", link: "/" },
      { text: "About", link: "/about.html" },
      { text: "Getting Started", link: "/getting-started.html" }
    ],
    // Assumes GitHub. Can also be a full GitLab url.
    repo: "rekenna/toast",
    // Customising the header label
    // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
    // repoLabel: "Contribute!",
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: "master",
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: "Help us improve this page!"
  }
};
