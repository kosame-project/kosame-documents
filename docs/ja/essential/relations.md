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
`hasMany()`の引数には対象のModelクラスを返す関数と`FK`/`localKey`を書きます。
`FK`は必ず書く必要があり`localKey`は省略することができます。省略する場合には親テーブルの主キーが使われます。

```ts
  static relations = { posts: hasMany(() => Post, { foreignKey: "authorId",})};
```

### belongsTo()

`belongsTo()`リレーションでは単の方を表します。
使い方として`import { belongsTo } from "kosame";`と`belongsTo()`をインポートし使います。
`belongsTo()`の引数には対象のModelクラスを返す関数と`FK`を書きます。

```ts
static relations = { author: belongsTo(() => User, { foreignKey: "authorId" }) };
```

### static relations

### include

## 既知の制限

## JOINを使わない理由
