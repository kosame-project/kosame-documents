<script setup lang="ts">
import { computed, ref } from "vue";

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
    getStarted: "Get Started",
    href: "/getting-started/installation",
  },
  ja: {
    tagline:
      "Drizzleをベースにmodel駆動の開発を提供するデータベースフレームワーク",
    getStarted: "Get Started",
    href: "/ja/getting-started/installation",
  },
};

const t = computed(() => messages[props.lang]);

const installCommand = "bun add kosame";
const copied = ref(false);

async function copyInstall() {
  try {
    await navigator.clipboard.writeText(installCommand);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
  } catch {}
}
</script>

<template>
  <main class="root-page">
    <div class="w-full">
      <div
        class="flex flex-col gap-4 items-center justify-center py-12 md:px-24 px-5"
      >
        <img src="/logo.png" alt="Kosame Logo" class="w-120" />
        <div class="text-2xl font-semibold">
          {{ t.tagline }}
        </div>
        <div class="flex items-center gap-2">
          <div
            class="bg-amber-100 py-2 px-3 text-black shadow-2xl border border-gray-700 hover:opacity-70 duration-200"
          >
            <a :href="t.href">
              <button class="font-bold">{{ t.getStarted }}</button>
            </a>
          </div>
          <!-- <nav class="flex gap-1 font-serif text-xl">
            <a v-for="locale in locales" :key="locale.href" :href="locale.href">
              {{ locale.label }}
            </a>
          </nav> -->
          <div
            class="border border-amber-100 py-2 px-3 hover:opacity-70 duration-200"
          >
            <a href="https://github.com/kosame-project/kosame-model">
              GitHub
            </a>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <pre
            class="py-2 px-2 bg-gray-500"
          ><code>{{ installCommand }}</code></pre>
          <div class="bg-gray-700 p-2 text-white">
            <button
              type="button"
              class="border border-amber-100 text-sm hover:opacity-70 duration-200"
              @click="copyInstall"
            >
              {{ copied ? "Copied!" : "Copy" }}
            </button>
          </div>
        </div>
        <div class="border-b w-full" />
        <slot />
      </div>
    </div>
  </main>
</template>

<style>
.root-page [class*="language-"] > span.lang {
  display: none;
}
</style>
