---
title: リレーション
---

# リレーション

Kosameは`hasMany`/`belongsTo`によるリレーション機能を提供しています。
リレーションではJOIN句を使わず、IN句によるバッチクエリでリレーション先を取得する設計になっています。

## リレーションの繋ぎ方

### hasMany()

`hasMany()`リレーションでは多の方を表します。
使い方として`import { hasMany } from "kosame";`と`hasMany()`をインポートし使います。
`hasMany()`の引数には対象のModelクラスを返す関数と`foreignKey`/`localKey`を書きます。
`foreignKey`は必ず書く必要があり`localKey`は省略することができます。省略する場合には親テーブルの主キーが使われます。

```ts
  static relations = { posts: hasMany(() => Post, { foreignKey: "authorId",})};
```

### belongsTo()

`belongsTo()`リレーションでは単の方を表します。
使い方として`import { belongsTo } from "kosame";`と`belongsTo()`をインポートし使います。
`belongsTo()`の引数には対象のModelクラスを返す関数と`foreignKey`/`targetKey`を書きます。
`foreignKey`は必ず書く必要があり`targetKey`は省略することができます。省略する場合にはターゲットテーブルの主キーが使われます。

```ts
static relations = { author: belongsTo(() => User, { foreignKey: "authorId" }) };
```

### include

`include`は`find()`で取得する際にリレーション先も一緒に取得したい場合に使用します。
`include`は`find()`の引数に`static relations`で定義したリレーションのキー名を配列で渡して使います。
`include`に渡したキー名は、そのまま返ってきたインスタンスのプロパティ名になります。`hasMany()`経由の場合は配列、`belongsTo()`経由の場合は単一のインスタンス（無ければ`undefined`）が入ります。

```ts
const user = await context.users.find(id, { include: ["posts"] });
```

## 既知の制限

### ネスト

`include`ではリレーションをネストして取得することはできません。
userがどのpostにcommentしたかをわかるようにするシステムなどはネストするため注意が必要です。

### 複合キー未対応

複数カラムをまとめて主キー/外部キーとして扱うテーブルには対応していません。

### SoftDeletableとの関係

## JOINを使わない理由
