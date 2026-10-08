<script setup lang="ts">
const locales = [
  { label: "English", href: "/" },
  { label: "日本語", href: "/ja/" },
];
</script>

<template>
  <main>
    <div class="w-full">
      <div
        class="flex flex-col gap-4 items-center justify-center py-12 md:px-24"
      >
        <img src="/logo.png" alt="Kosame Logo" class="w-120" />
        <div class="text-2xl font-serif">
          Kosame is a database framework based on Drizzle that supports
          model-driven development.
        </div>
        <div class="flex items-center gap-2">
          <div
            class="bg-amber-100 py-2 px-3 text-black rounded-md font-serif shadow-2xl border border-gray-700"
          >
            <a href="/getting-started/installation">
              <button class="text-xl">get started</button>
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
