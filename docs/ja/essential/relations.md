---
title: リレーション
---

# リレーション

Kosameは`hasMany`/`belongsTo`によるリレーション機能を提供しています。
リレーションではJOIN句を使わず、IN句によるバッチクエリでリレーション先を取得する設計になっています。

## リレーションの繋ぎ方

### hasMany()

hasManyリレーションでは多の方を表します
使い方として`import { hasMany } from "kosame";`と`hasMany()`をインポートし使います

```ts
  static relations = { posts: hasMany(() => Post, { foreignKey: "authorId",})};
```

### belongsTo()

### static relations()

### include()

## 既知の制限

## JOINを使わない理由
