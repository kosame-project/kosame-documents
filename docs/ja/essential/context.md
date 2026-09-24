---
title: Contextの作成
---

# Contextの作成

KosameはContextベースの設計思想を持っており、Modelで定義したTableをContextに渡すことで、実際にクエリを実行する入り口を構築します。

## 作成方法

Kosameでは`data`ディレクトリを作成しcontext.tsにContextを書いていきます。

```
src/
└── data/
    └── context.ts
```

### Contextの書き方

`createContext`関数を呼び出しdbとModelを紐付けます。

```ts
import { createContext } from "kosame";
import { db } from "./db.js";
import { User } from "../models/user.js";

export const context = createContext(db, {
  users: User,
});
```

### 一度だけ構築される

`createContext(db, schema)`の呼び出し時にschemaを反復してModelCollectionが作られ、`context.users`としてプロパティ定義します。これはproxyを使った遅延生成ではなく即時構築で構築されます。もしproxyベースである場合`context.users`に初めてアクセスした瞬間に初めて中身が構築されます。Kosameは`createContext()`を呼んだタイミングで`context.users`などの確定したオブジェクトとして存在しているという設計になっています。これはKosameが持つ明示的な設計からくるものです。
