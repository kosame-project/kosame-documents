---
layout: page
sidebar: false
title: Kosame
---

<script setup>
import RootPage from "../.vitepress/theme/RootPage.vue";
</script>

<RootPage lang="ja">
<template #model>

```ts
import { Model } from "kosame";

export class User extends Model {
  static table = usersTable;
}
```

</template>
<template #hooks>

```ts
export class User extends Model {
  static table = usersTable;

  override async beforeCreate() {
    if (!this.name.includes("kosame")) {
      throw new Error("Name must contain kosame");
    }
  }
}
```

</template>
</RootPage>
