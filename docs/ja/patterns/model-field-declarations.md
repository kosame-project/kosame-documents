---
title: Modelのフィールド宣言
---

# Modelのフィールド宣言

## 宣言マージ

宣言マージ方式では`interface`と`class`で2回書かれます。
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

## declare

Modelのフィールドの書き方には、`declare`を1つずつ書く方式があります。
これは2重で定義する代わりにわかりやすさを基本とした書き方で、一目で何が宣言されているかわかるという点を強く持ちます。

```ts
import { Model } from "kosame";

export class User extends Model {
  static table = userTable;
  declare id: number;
  declare name: string;
}
```
