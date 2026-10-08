<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const el = ref<HTMLElement | null>(null);
const shown = ref(false);
let observer: IntersectionObserver | undefined;

onMounted(() => {
  // Readers who prefer less motion get the content right away.
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    shown.value = true;
    return;
  }
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        shown.value = true;
        observer?.disconnect();
      }
    },
    { threshold: 0.15 },
  );
  if (el.value) observer.observe(el.value);
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <div
    ref="el"
    class="w-full transition duration-700 ease-out"
    :class="shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
  >
    <slot />
  </div>
</template>
