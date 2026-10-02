---
title: Modelのフィールド宣言
---

# Modelのフィールド宣言

KosameではModel宣言の方法として、二つ方法があります。
このページではなぜ二つの宣言方法を用意したのか、その宣言方法の特徴について触れます。

## declare

Model宣言の一つの方法として`declare`を一つ一つ書いていく方式があります。
特徴として、宣言が見やすく、そして二重で定義するところがあります。
宣言が見やすいというのは宣言マージと比べての話で、`interface`と`class`で宣言してマージするより直感に近く書くことが可能です。
この機能については宣言マージの機能を知らない人などは混乱する、可能性があると思いdeclareの書き方を用意しています。

```ts
import { Model } from "kosame";

export class User extends Model {
  static table = usersTable;
  declare id: number;
  declare name: string;
}
```

## 宣言マージ

宣言マージ方式では`interface`と`class`で2回書かれます。
TypeScriptでは、同名の`interface`と`class`が自動的にマージされる機能があり、
この書き方でも問題なく動きます。
特徴として、二重で定義する必要がなく、そして`declare`と比べて初めて見る人にはわかりづらいという点があります。

```ts
import { Model } from "kosame";
import { InferSelectModel } from "drizzle-orm";

export interface User extends InferSelectModel<typeof usersTable> {}

export class User extends Model {
  static table = usersTable;
}
```

## 推奨について

Kosameとしては推奨の宣言方法はありませんが、直感的に書きたいのであれば`declare`を使い。冗長と感じるならば、`interface`(宣言マージ)を使用してください。
