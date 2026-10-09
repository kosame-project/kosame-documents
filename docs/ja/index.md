---
layout: page
sidebar: false
title: Kosame
---

<script setup>
import RootPage from "../.vitepress/theme/RootPage.vue";
</script>

<RootPage lang="ja">

```ts
import { Model } from "kosame";

export class User extends Model {
  static table = usersTable;
}
```

</RootPage>
