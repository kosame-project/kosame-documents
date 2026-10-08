<script setup lang="ts">
const locales = [
  { label: "English", href: "/en/" },
  { label: "日本語", href: "/ja/" },
];
</script>

<template>
  <main>
    <div class="w-full">
      <div
        class="flex flex-col gap-4 items-center justify-center py-12 md:px-24"
      >
        <img src="/logo.png" alt="kosame" width="214" height="70" />
        <div class="text-2xl font-serif">
          KosameはDrizzleをベースにmodel駆動の開発を提供するデータベースフレームワークです。
        </div>
      </div>
      <nav>
        <a v-for="locale in locales" :key="locale.href" :href="locale.href">
          {{ locale.label }}
        </a>
      </nav>
    </div>
  </main>
</template>
