---
title: Modelのフィールド宣言
---

# Modelのフィールド宣言

Modelのフィールド宣言では`interface`と`class`で2回書かれます。
TypeScriptでは、同名の`interface`と`class`が自動的にマージされる機能があり、
この書き方でも問題なく動きます。

```ts
import { Model } from "kosame";
import { InferSelectModel } from "drizzle-orm";

export interface User extends InferSelectModel<typeof userTable> {}

export class User extends Model {
  static table = userTable;
}
```
