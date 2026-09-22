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

```ts
import { createContext } from "kosame";
import { db } from "./db.js";
import { User } from "../models/user.js";

export const context = createContext(db, {
  users: User,
});
```
