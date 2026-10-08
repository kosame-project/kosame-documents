<script setup lang="ts">
import { onMounted } from "vue";

const STORAGE_KEY = "kosame-docs-locale";
const locales = [
  { code: "en", label: "English", href: "/en/" },
  { code: "ja", label: "日本語", href: "/ja/" },
];

// Send the reader to their language: the last one they picked, else the browser's.
onMounted(() => {
  let code: string | null = null;
  try {
    code = localStorage.getItem(STORAGE_KEY);
  } catch {}
  if (!locales.some((l) => l.code === code)) {
    code = navigator.language.toLowerCase().startsWith("ja") ? "ja" : "en";
  }
  window.location.replace(locales.find((l) => l.code === code)!.href);
});

// Remember an explicit choice so the next visit goes straight to it.
function remember(code: string) {
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {}
}
</script>

<template>
  <main>
    <div class="w-full">
      <div
        class="flex flex-col gap-4 items-center justify-center py-12 md:px-24"
      >
        <div class="text-2xl font-serif">
          Kosame is a database framework based on Drizzle that supports
          model-driven development.
        </div>
        <div class="bg-amber-100 py-2 px-3 text-black rounded-md font-serif">
          <a href="/en/getting-started/installation">
            <button class="text-xl">get started</button>
          </a>
        </div>
      </div>
      <nav>
        <a
          v-for="locale in locales"
          :key="locale.code"
          :href="locale.href"
          @click="remember(locale.code)"
        >
          {{ locale.label }}
        </a>
      </nav>
    </div>
  </main>
</template>
