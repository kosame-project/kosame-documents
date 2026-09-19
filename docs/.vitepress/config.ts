import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "en-US",
  title: "kosame",
  description: "A Drizzle-based ORM with a model-driven approach.",
  cleanUrls: true,
  lastUpdated: true,

  head: [["link", { rel: "icon", type: "image/png", href: "/logo.png" }]],

  themeConfig: {
    logo: "/logo.png",

    nav: [
      { text: "Guide", link: "/getting-started/installation" },
      { text: "GitHub", link: "https://github.com/kosame-project/kosame-orm" },
      { text: "npm", link: "https://www.npmjs.com/package/kosame" },
    ],

    sidebar: [
      {
        text: "Getting Started",
        items: [
          { text: "Installation", link: "/getting-started/installation" },
          { text: "Quick Start", link: "/getting-started/quick-start" },
        ],
      },
      {
        text: "Essential",
        items: [
          { text: "Defining a Model", link: "/essential/model" },
          { text: "Creating a Context", link: "/essential/context" },
          { text: "CRUD", link: "/essential/crud" },
          { text: "Relations", link: "/essential/relations" },
          { text: "Hooks", link: "/essential/hooks" },
          { text: "Transactions", link: "/essential/transactions" },
          { text: "Mixins", link: "/essential/mixins" },
          { text: "Validation", link: "/essential/validation" },
          { text: "Escape Hatch (context.raw)", link: "/essential/raw" },
        ],
      },
      {
        text: "Patterns",
        items: [
          { text: "Model Field Declarations", link: "/patterns/model-field-declarations" },
          { text: "The `Model` Naming Collision", link: "/patterns/naming-collision" },
          { text: "Dialect Notes (pg / mysql / sqlite / D1)", link: "/patterns/dialects" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/kosame-project/kosame-orm" }],

    search: {
      provider: "local",
    },

    editLink: {
      pattern: "https://github.com/kosame-project/kosame-documents/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
  },
});
