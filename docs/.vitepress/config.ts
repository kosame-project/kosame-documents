import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitepress";

export default defineConfig({
  title: "kosame",
  description: "A Drizzle-based ORM with a model-driven approach.",
  cleanUrls: true,
  lastUpdated: true,

  vite: { plugins: [tailwindcss()] },

  head: [["link", { rel: "icon", type: "image/svg", href: "/favicon.svg" }]],

  themeConfig: {
    logo: "/logo.png",
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/kosame-project/kosame-model",
      },
    ],
    search: { provider: "local" },
  },

  locales: {
    en: {
      label: "English",
      lang: "en",
      link: "/",
      themeConfig: {
        nav: [
          { text: "Guide", link: "/en/kosame" },
          {
            text: "GitHub",
            link: "https://github.com/kosame-project/kosame-model",
          },
          { text: "npm", link: "https://www.npmjs.com/package/kosame" },
        ],
        sidebar: [
          {
            text: "Getting Started",
            items: [
              { text: "What is Kosame?", link: "/en/kosame" },
              {
                text: "Installation",
                link: "/en/getting-started/installation",
              },
              { text: "Quick Start", link: "/en/getting-started/quick-start" },
            ],
          },
          {
            text: "Essential",
            items: [
              { text: "Creating a Model", link: "/en/essential/model" },
              { text: "Creating a Context", link: "/en/essential/context" },
              { text: "CRUD", link: "/en/essential/crud" },
              { text: "Relations", link: "/en/essential/relations" },
              { text: "Hooks", link: "/en/essential/hooks" },
              { text: "Transactions", link: "/en/essential/transactions" },
              { text: "Mixins", link: "/en/essential/mixins" },
              { text: "Validation", link: "/en/essential/validation" },
              { text: "Escape Hatch (context.raw)", link: "/en/essential/raw" },
            ],
          },
          {
            text: "Patterns",
            items: [
              {
                text: "Model Field Declarations",
                link: "/en/patterns/model-field-declarations",
              },
              {
                text: "The Model Naming Collision",
                link: "/en/patterns/naming-collision",
              },
              {
                text: "Dialect Notes (pg / mysql / sqlite / D1)",
                link: "/en/patterns/dialects",
              },
            ],
          },
        ],
        editLink: {
          pattern:
            "https://github.com/kosame-project/kosame-documents/edit/main/docs/:path",
          text: "Edit this page on GitHub",
        },
      },
    },

    ja: {
      label: "日本語",
      lang: "ja",
      link: "/",
      themeConfig: {
        nav: [
          { text: "ガイド", link: "/ja/kosame" },
          {
            text: "GitHub",
            link: "https://github.com/kosame-project/kosame-model",
          },
          { text: "npm", link: "https://www.npmjs.com/package/kosame" },
        ],
        sidebar: [
          {
            text: "はじめに",
            items: [
              { text: "Kosameとは?", link: "/ja/kosame" },
              {
                text: "インストール",
                link: "/ja/getting-started/installation",
              },
              {
                text: "クイックスタート",
                link: "/ja/getting-started/quick-start",
              },
            ],
          },
          {
            text: "基本機能",
            items: [
              { text: "Modelの定義", link: "/ja/essential/model" },
              { text: "Contextの作成", link: "/ja/essential/context" },
              { text: "CRUD", link: "/ja/essential/crud" },
              { text: "リレーション", link: "/ja/essential/relations" },
              { text: "Hooks", link: "/ja/essential/hooks" },
              { text: "トランザクション", link: "/ja/essential/transactions" },
              { text: "Mixins", link: "/ja/essential/mixins" },
              { text: "バリデーション", link: "/ja/essential/validation" },
              {
                text: "エスケープハッチ（context.raw）",
                link: "/ja/essential/raw",
              },
            ],
          },
          {
            text: "パターン",
            items: [
              {
                text: "Modelのフィールド宣言",
                link: "/ja/patterns/model-field-declarations",
              },
              {
                text: "Modelという名前の衝突について",
                link: "/ja/patterns/naming-collision",
              },
              {
                text: "Dialectごとの注意点（pg / mysql / sqlite / D1）",
                link: "/ja/patterns/dialects",
              },
            ],
          },
        ],
        editLink: {
          pattern:
            "https://github.com/kosame-project/kosame-documents/edit/main/docs/:path",
          text: "GitHubでこのページを編集",
        },
      },
    },
  },
});
