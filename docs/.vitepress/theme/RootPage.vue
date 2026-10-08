<script setup lang="ts">
const locales = [
  { label: "English", href: "/en/" },
  { label: "日本語", href: "/ja/" },
];
</script>

<template>
  <main>
    <img src="/logo.png" alt="kosame" width="214" height="70" />

    <p>
      KosameはDrizzleをベースにmodel駆動の開発を提供するデータベースフレームワークです。
      Drizzleのsqlライクな書き方、Drizzleの軽量さを残しより開発しやすくすることができます、そして既存のDrizzleで構築されたDBスキーマにも適用させることができ複雑になる場合などの使用ではKosameのmodel駆動の開発の力を強く発揮します。
    </p>

    <nav>
      <a v-for="locale in locales" :key="locale.href" :href="locale.href">
        {{ locale.label }}
      </a>
    </nav>
  </main>
</template>
