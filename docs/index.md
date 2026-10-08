---
layout: page
sidebar: false
title: kosame
---

<script setup>
import RootPage from "./.vitepress/theme/RootPage.vue";
</script>

<RootPage>

```ts
import { Model } from "kosame";

class User extends Model {
  static table = "users";
}
```

</RootPage>
