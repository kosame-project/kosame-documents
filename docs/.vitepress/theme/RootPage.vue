<script setup lang="ts">
import { computed, ref } from "vue";
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
      head: ["Operation", "Kosame vs raw Drizzle"],
      rows: [
        { op: "find by id", result: "about the same" },
        { op: "find by id + include", result: "about the same" },
        { op: "insert one", result: "about the same" },
        { op: "update one", result: "1.65× slower (extra round trip)" },
        { op: "20 roots + relation", result: "5.7× slower (one call per root)" },
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
      head: ["操作", "素のDrizzleとの比較"],
      rows: [
        { op: "主キーで取得", result: "ほぼ同じ" },
        { op: "主キーで取得 + include", result: "ほぼ同じ" },
        { op: "1件insert", result: "ほぼ同じ" },
        { op: "1件update", result: "1.65倍遅い(往復が1回増える)" },
        { op: "20件のルート + リレーション", result: "5.7倍遅い(ルートごとに1回呼ぶ)" },
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
          <img src="/logo.png" alt="Kosame Logo" class="w-120 max-w-full" />
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
          <section class="k-section">
            <div class="k-copy">
              <h2 class="k-title"><i class="k-drop" />{{ t.bench.title }}</h2>
              <p class="k-body">{{ t.bench.body }}</p>
              <a class="k-link" :href="t.bench.href">{{ t.bench.link }}</a>
            </div>
            <table class="k-table">
              <thead>
                <tr>
                  <th v-for="h in t.bench.head" :key="h">{{ h }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="r in t.bench.rows" :key="r.op">
                  <td>{{ r.op }}</td>
                  <td>{{ r.result }}</td>
                </tr>
              </tbody>
            </table>
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
}
.dark .root-page {
  --k-accent: #72d70e;
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
  border-radius: 0.5rem;
  font-weight: 600;
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
  border-radius: 0.5rem;
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
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
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

/* Benchmark table */
.root-page .k-table {
  width: 100%;
  border-collapse: collapse;
  display: table;
  margin: 0;
}
.root-page .k-table th,
.root-page .k-table td {
  text-align: left;
  padding: 0.75rem 0.5rem 0.75rem 0;
  border: 0;
  border-bottom: 1px solid var(--vp-c-divider);
  background: none;
}
.root-page .k-table th {
  font-weight: 600;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}
.root-page .k-table tr {
  background: none;
}
</style>
