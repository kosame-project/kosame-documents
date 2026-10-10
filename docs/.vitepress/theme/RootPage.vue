<script setup lang="ts">
import { computed, ref } from "vue";
import HeroLogo from "./HeroLogo.vue";
import Reveal from "./Reveal.vue";

const props = withDefaults(defineProps<{ lang?: "en" | "ja" }>(), {
  lang: "en",
});

const messages = {
  en: {
    tagline:
      "Kosame is a database framework based on Drizzle that supports model-driven development.",
    getStarted: "Get Started",
    copy: "Copy",
    copied: "Copied",
    href: "/getting-started/installation",
    model: {
      title: "Add a Model on top of your Drizzle table",
      body: "Add a Model class and start building model-driven.",
      link: "Defining a Model",
      href: "/essential/model",
    },
    keep: {
      title: "Keep the Drizzle project you already have",
      body: "Kosame works with the schema you already wrote. Pass your own db to createContext, and drop back to plain Drizzle through context.raw whenever you want.",
      files: [
        { name: "schema.ts", note: "unchanged" },
        { name: "db.ts", note: "unchanged" },
        { name: "models/user.ts", note: "new" },
        { name: "data/context.ts", note: "new" },
      ],
    },
    hooks: {
      title: "Stop a bad write before it happens",
      body: "Override beforeCreate, beforeUpdate or beforeDelete on the Model and throw to abort the write. Inside a transaction, afterCommit and afterRollback run once the outcome is known.",
      link: "Hooks",
      href: "/essential/hooks",
    },
    bench: {
      title: "Close to raw Drizzle",
      body: "Measured against raw Drizzle on PostgreSQL. Where Kosame has a first-class API the cost is within noise; where it needs an extra round trip, it says so.",
      note: "Time per operation relative to raw Drizzle (1.0). Shorter is faster. One run on Apple M3, Bun 1.3, PostgreSQL 17.",
      legend: { drizzle: "Drizzle", kosame: "Kosame", raw: "Kosame via context.raw (2 queries)", prisma: "Prisma" },
      rows: [
        { op: "find by id", drizzle: 1, kosame: 0.94, prisma: 1.22 },
        { op: "find by id + include", drizzle: 1, kosame: 1.12, prisma: 1.25 },
        { op: "insert one", drizzle: 1, kosame: 1.02, prisma: 1.15 },
        { op: "update one", drizzle: 1, kosame: 1.63, prisma: 1.49 },
        { op: "20 roots + relation (one call per root)", drizzle: 1, kosame: 5.31, raw: 1.05, prisma: 1.72 },
      ],
      link: "Full results and method",
      href: "https://github.com/kosame-project/kosame-benchmark",
    },
    dialects: {
      title: "Runs where Drizzle runs",
      body: "Install the Drizzle driver you already use.",
      items: [
        { name: "PostgreSQL", note: "node-postgres" },
        { name: "MySQL", note: "mysql2" },
        { name: "SQLite", note: "better-sqlite3 / libsql" },
        { name: "Cloudflare D1", note: "not verified yet" },
      ],
      link: "Dialect notes",
      href: "/patterns/dialects",
    },
  },
  ja: {
    tagline:
      "Drizzleをベースにmodel駆動の開発を提供するデータベースフレームワーク",
    getStarted: "Get Started",
    copy: "コピー",
    copied: "コピーしました",
    href: "/ja/getting-started/installation",
    model: {
      title: "DrizzleのTableに、Modelを重ねる",
      body: "Modelクラスを足すだけで、Model駆動の開発を始められる。",
      link: "Modelの定義",
      href: "/ja/essential/model",
    },
    keep: {
      title: "いまのDrizzleプロジェクトのまま使える",
      body: "すでに書いたスキーマにそのまま適用できます。自分のdbをcreateContextに渡すだけで、必要なときはcontext.rawから素のDrizzleに戻れます。",
      files: [
        { name: "schema.ts", note: "変更なし" },
        { name: "db.ts", note: "変更なし" },
        { name: "models/user.ts", note: "追加" },
        { name: "data/context.ts", note: "追加" },
      ],
    },
    hooks: {
      title: "書き込みの前に、Modelで止める",
      body: "ModelでbeforeCreate、beforeUpdate、beforeDeleteをオーバーライドし、例外を投げれば書き込みを中断できます。トランザクション内では、結果が決まった後にafterCommit、afterRollbackが呼ばれます。",
      link: "Hooks",
      href: "/ja/essential/hooks",
    },
    bench: {
      title: "素のDrizzleに近いコスト",
      body: "PostgreSQLで素のDrizzleと比べた結果です。Kosameに専用のAPIがある操作は誤差の範囲で、往復が増える操作は、そのとおり遅くなります。",
      note: "素のDrizzleを1.0としたときの、1操作あたりの時間です。短いほど速い。Apple M3、Bun 1.3、PostgreSQL 17での1回の計測です。",
      legend: { drizzle: "Drizzle", kosame: "Kosame", raw: "Kosame(context.raw経由・2クエリ)", prisma: "Prisma" },
      rows: [
        { op: "主キーで取得", drizzle: 1, kosame: 0.94, prisma: 1.22 },
        { op: "主キーで取得 + include", drizzle: 1, kosame: 1.12, prisma: 1.25 },
        { op: "1件insert", drizzle: 1, kosame: 1.02, prisma: 1.15 },
        { op: "1件update", drizzle: 1, kosame: 1.63, prisma: 1.49 },
        { op: "20件のルート + リレーション(ルートごとに1回呼ぶ)", drizzle: 1, kosame: 5.31, raw: 1.05, prisma: 1.72 },
      ],
      link: "結果と計測方法",
      href: "https://github.com/kosame-project/kosame-benchmark",
    },
    dialects: {
      title: "Drizzleが動くところで動く",
      body: "いまお使いのDrizzleのドライバをインストールするだけです。",
      items: [
        { name: "PostgreSQL", note: "node-postgres" },
        { name: "MySQL", note: "mysql2" },
        { name: "SQLite", note: "better-sqlite3 / libsql" },
        { name: "Cloudflare D1", note: "未検証" },
      ],
      link: "Dialectごとの注意点",
      href: "/ja/patterns/dialects",
    },
  },
};

const t = computed(() => messages[props.lang]);

// Deterministic (no Math.random) so the server-rendered and hydrated markup match.
const drops = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  style: {
    left: `${(i * 37 + 11) % 100}%`,
    animationDelay: `-${(((i * 13) % 100) / 10).toFixed(1)}s`,
    animationDuration: `${(6 + ((i * 7) % 40) / 10).toFixed(1)}s`,
    "--k-o": (0.35 + ((i * 11) % 50) / 100).toFixed(2),
    "--k-s": (0.7 + ((i * 17) % 60) / 100).toFixed(2),
  },
}));

const barKeys = ["drizzle", "kosame", "raw", "prisma"] as const;

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
      <div class="relative h-screen flex items-center justify-center overflow-hidden">
        <div class="k-rain" aria-hidden="true">
          <i v-for="d in drops" :key="d.id" class="k-rain-drop" :style="d.style" />
        </div>
        <div
          class="relative z-10 flex flex-col gap-4 items-center justify-center py-12 md:px-24 px-5"
        >
          <HeroLogo />
          <div class="text-2xl font-semibold text-center">
            {{ t.tagline }}
          </div>
          <div class="k-actions">
            <a class="k-btn k-btn-primary" :href="t.href">{{ t.getStarted }}</a>
            <a
              class="k-btn k-btn-secondary"
              href="https://github.com/kosame-project/kosame-model"
            >
              GitHub
            </a>
          </div>
          <div class="k-install">
            <code>{{ installCommand }}</code>
            <button
              type="button"
              :class="{ 'k-copied': copied }"
              @click="copyInstall"
            >
              {{ copied ? t.copied : t.copy }}
            </button>
          </div>
        </div>
      </div>

      <div class="rain-line mx-auto max-w-5xl px-5 md:px-8">
        <!-- Model -->
        <Reveal>
          <section class="k-section">
            <div class="k-copy">
              <h2 class="k-title"><i class="k-drop" />{{ t.model.title }}</h2>
              <p class="k-body">{{ t.model.body }}</p>
              <a class="k-link" :href="t.model.href">{{ t.model.link }}</a>
            </div>
            <div class="code-card"><slot name="model" /></div>
          </section>
        </Reveal>

        <!-- Keep your project -->
        <Reveal>
          <section class="k-section">
            <div class="k-copy">
              <h2 class="k-title"><i class="k-drop" />{{ t.keep.title }}</h2>
              <p class="k-body">{{ t.keep.body }}</p>
            </div>
            <ul class="k-files">
              <li v-for="f in t.keep.files" :key="f.name">
                <code>{{ f.name }}</code>
                <span :class="{ 'k-new': f.note === 'new' || f.note === '追加' }">
                  {{ f.note }}
                </span>
              </li>
            </ul>
          </section>
        </Reveal>

        <!-- Hooks -->
        <Reveal>
          <section class="k-section">
            <div class="k-copy">
              <h2 class="k-title"><i class="k-drop" />{{ t.hooks.title }}</h2>
              <p class="k-body">{{ t.hooks.body }}</p>
              <a class="k-link" :href="t.hooks.href">{{ t.hooks.link }}</a>
            </div>
            <div class="code-card"><slot name="hooks" /></div>
          </section>
        </Reveal>

        <!-- Benchmark -->
        <Reveal>
          <section class="k-section k-wide">
            <div class="k-copy">
              <h2 class="k-title"><i class="k-drop" />{{ t.bench.title }}</h2>
              <p class="k-body">{{ t.bench.body }}</p>
              <a class="k-link" :href="t.bench.href">{{ t.bench.link }}</a>
            </div>
            <div class="k-chart">
              <ul class="k-legend">
                <li v-for="(label, key) in t.bench.legend" :key="key">
                  <i :class="`k-swatch k-${key}`" />{{ label }}
                </li>
              </ul>
              <div v-for="r in t.bench.rows" :key="r.op" class="k-row">
                <div class="k-op">{{ r.op }}</div>
                <div
                  v-for="key in barKeys.filter((k) => r[k] !== undefined)"
                  :key="key"
                  class="k-bar"
                >
                  <span :class="`k-fill k-${key}`" :style="{ '--v': r[key] }" />
                  <span class="k-val">{{ r[key]!.toFixed(2) }}×</span>
                </div>
              </div>
              <p class="k-note">{{ t.bench.note }}</p>
            </div>
          </section>
        </Reveal>

        <!-- Dialects -->
        <Reveal>
          <section class="k-section">
            <div class="k-copy">
              <h2 class="k-title"><i class="k-drop" />{{ t.dialects.title }}</h2>
              <p class="k-body">{{ t.dialects.body }}</p>
              <a class="k-link" :href="t.dialects.href">{{ t.dialects.link }}</a>
            </div>
            <ul class="k-files">
              <li v-for="d in t.dialects.items" :key="d.name">
                <span class="k-name">{{ d.name }}</span>
                <span>{{ d.note }}</span>
              </li>
            </ul>
          </section>
        </Reveal>
      </div>
    </div>
  </main>
</template>

<style>
.root-page {
  --k-drop: #72d70e;
  --k-accent: #3a8200;
  --k-ink: #1e1e1e;
}
.dark .root-page {
  --k-accent: #72d70e;
  --k-ink: #f5f5f5;
}

.root-page [class*="language-"] > span.lang {
  display: none;
}

/* Hero actions. Primary is ink on paper (inverts in dark mode); the logo's
   green only appears when you point at it. */
.root-page .k-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
}
.root-page .k-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.65rem 1.4rem;
  border-radius: 0;
  font-family: "Doto", sans-serif;
  font-size: 1.15rem;
  font-weight: 800;
  text-decoration: none;
  border: 1px solid var(--vp-c-text-1);
  transition:
    background-color 0.2s,
    color 0.2s,
    border-color 0.2s;
}
.root-page .k-btn-primary {
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg);
  transition-duration: 0.5s;
}
.root-page .k-btn-primary:hover {
  background: var(--k-drop);
  border-color: var(--k-drop);
  color: #1e1e1e;
}
.root-page .k-btn-secondary {
  background: transparent;
  color: var(--vp-c-text-1);
}
.root-page .k-btn-secondary:hover {
  border-color: var(--k-drop);
  box-shadow: inset 0 -3px 0 var(--k-drop);
}
.root-page .k-btn:focus-visible,
.root-page .k-install button:focus-visible {
  outline: 2px solid var(--k-accent);
  outline-offset: 2px;
}

/* Install command and its copy button share one outline. */
.root-page .k-install {
  display: flex;
  align-items: stretch;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}
.root-page .k-install code {
  padding: 0.55rem 1rem;
  background: none;
  color: var(--vp-c-text-1);
  font-size: 0.95rem;
}
.root-page .k-install button {
  padding: 0 1rem;
  border-left: 1px solid var(--vp-c-divider);
  font-family: "Doto", sans-serif;
  font-size: 1rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
  transition:
    background-color 0.2s,
    color 0.2s;
}
.root-page .k-install button:hover {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}
.root-page .k-install button.k-copied {
  color: var(--k-accent);
}

/* Rain: the logo's green drops, falling behind the hero. */
.root-page .k-rain {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.root-page .k-rain-drop {
  position: absolute;
  top: -24px;
  width: 6px;
  height: 14px;
  border-radius: 999px;
  background: var(--k-drop);
  opacity: 0;
  transform: scale(var(--k-s, 1));
  animation: k-fall linear infinite;
}
@keyframes k-fall {
  0% {
    transform: translateY(0) scale(var(--k-s, 1));
    opacity: 0;
  }
  10% {
    opacity: var(--k-o, 0.6);
  }
  100% {
    transform: translateY(100vh) scale(var(--k-s, 1));
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .root-page .k-rain {
    display: none;
  }
}

/* Sections: copy on the left, evidence (code / table / list) on the right. */
.root-page .rain-line {
  border-left: 1px solid var(--vp-c-divider);
  margin-left: max(1.25rem, calc((100% - 64rem) / 2));
  padding-top: 6rem;
}
.root-page .k-section {
  display: grid;
  gap: 2rem;
  padding-bottom: 6rem;
  position: relative;
}
@media (min-width: 768px) {
  .root-page .k-section {
    grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
    gap: 3rem;
    align-items: start;
  }
}

/* A section whose evidence needs the full width stacks under its copy. */
.root-page .k-section.k-wide {
  grid-template-columns: minmax(0, 1fr);
}

/* The green drop from the logo marks where each section starts. */
.root-page .k-title {
  font-family: "Doto", sans-serif;
  font-weight: 800;
  font-size: 1.75rem;
  line-height: 1.25;
  margin: 0;
  border: 0;
  padding: 0;
  position: relative;
}
.root-page .k-drop {
  position: absolute;
  left: -1.5rem;
  top: 0.35rem;
  width: 0.6rem;
  height: 1.1rem;
  border-radius: 999px;
  background: var(--k-drop);
  transform: translateX(-50%);
}
.root-page .k-body {
  margin: 1rem 0 0;
  line-height: 1.8;
  max-width: 34rem;
  color: var(--vp-c-text-2);
}
.root-page .k-link {
  display: inline-block;
  margin-top: 1rem;
  font-weight: 600;
  color: var(--k-accent);
  text-decoration: underline;
  text-underline-offset: 4px;
}

/* Code */
.root-page .code-card {
  overflow: hidden;
  border-radius: 0.5rem;
  border: 1px solid #3a3f45;
  background-color: #24292e;
  min-width: 0;
}
.root-page .code-card [class*="language-"] {
  margin: 0;
  background-color: #24292e;
}
.root-page .code-card pre {
  margin: 0;
  padding: 1rem 1.25rem;
  overflow-x: auto;
  font-size: 0.9rem;
  line-height: 1.7;
}
.root-page .code-card .shiki,
.root-page .code-card .shiki span {
  background-color: transparent !important;
  color: var(--shiki-dark) !important;
}

/* File / dialect lists */
.root-page .k-files {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--vp-c-divider);
}
.root-page .k-files li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}
.root-page .k-files code {
  color: var(--vp-c-text-1);
  background: none;
  padding: 0;
}
.root-page .k-name {
  color: var(--vp-c-text-1);
  font-weight: 600;
}
.root-page .k-new {
  color: var(--k-accent);
  font-weight: 600;
}

/* Benchmark chart: bar length is time relative to raw Drizzle (= 1.0). */
.root-page .k-chart {
  min-width: 0;
}
.root-page .k-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  list-style: none;
  margin: 0 0 1.25rem;
  padding: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}
.root-page .k-legend li {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.root-page .k-swatch {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 2px;
}
.root-page .k-row {
  padding: 0.9rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}
.root-page .k-row:first-of-type {
  border-top: 1px solid var(--vp-c-divider);
}
.root-page .k-op {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}
.root-page .k-bar {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  height: 0.85rem;
  margin-top: 0.3rem;
}
.root-page .k-fill {
  display: block;
  height: 100%;
  width: calc(var(--v) / 6 * (100% - 4rem));
  min-width: 2px;
  border-radius: 2px;
}
.root-page .k-val {
  font-size: 0.8rem;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-2);
}
.root-page .k-drizzle {
  background: var(--vp-c-text-1);
}
.root-page .k-kosame {
  background: var(--k-drop);
}
.root-page .k-raw {
  background: color-mix(in srgb, var(--k-drop) 30%, transparent);
  box-shadow: inset 0 0 0 1px var(--k-drop);
}
.root-page .k-prisma {
  background: var(--vp-c-gray-1);
}
.root-page .k-note {
  margin: 1rem 0 0;
  font-size: 0.8rem;
  line-height: 1.6;
  color: var(--vp-c-text-3);
}
</style>
