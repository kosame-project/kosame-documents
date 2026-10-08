<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{ lang?: "en" | "ja" }>(), {
  lang: "en",
});

const locales = [
  { label: "English", href: "/" },
  { label: "日本語", href: "/ja/" },
];

const messages = {
  en: {
    tagline:
      "Kosame is a database framework based on Drizzle that supports model-driven development.",
    getStarted: "get started",
    href: "/getting-started/installation",
  },
  ja: {
    tagline:
      "KosameはDrizzleをベースにmodel駆動の開発を提供するデータベースフレームワークです。",
    getStarted: "はじめる",
    href: "/ja/getting-started/installation",
  },
};

const t = computed(() => messages[props.lang]);
</script>

<template>
  <main>
    <div class="w-full">
      <div
        class="flex flex-col gap-4 items-center justify-center py-12 md:px-24"
      >
        <img src="/logo.png" alt="Kosame Logo" class="w-120" />
        <div class="text-2xl font-serif">
          {{ t.tagline }}
        </div>
        <div class="flex items-center gap-2">
          <div
            class="bg-amber-100 py-2 px-3 text-black rounded-md font-serif shadow-2xl border border-gray-700"
          >
            <a :href="t.href">
              <button class="text-xl">{{ t.getStarted }}</button>
            </a>
          </div>
          <nav class="flex gap-1 font-serif text-xl">
            <a v-for="locale in locales" :key="locale.href" :href="locale.href">
              {{ locale.label }}
            </a>
          </nav>
        </div>
      </div>
    </div>
  </main>
</template>
