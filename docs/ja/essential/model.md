---
title: Modelの作成
---

# Modelの定義

## Modelについて

KosameにはDrizzleにはないModelの概念があります。これは他のORM、EF-Coreやactive recordなどにあるModelと近いものでこのModelにより設計に近い実装にすることができKosameの主な機能です。

## 作成方法

Kosameにおいて基本的にはModelディレクトリを作成し、そのディレクトリ内に個々のTableを作成していきます

```
src/
└── models/
    └── tables.ts
```

### Modelの書き方

Modelの作成においてDrizzleのTable定義をした後、作りたいTableに対しModelクラスをextendさせます、そして作成したクラス内に `static table = userTable` のようにTableとModelを紐づけます。

```ts
export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export class User extends Model {
  static table = usersTable;
  declare id: number;
  declare name: string;
}
```

### 二重定義に見える方へ

上の章での定義が冗長のように感じる方は下記の書き方をお勧めします。
DrizzleのInferSelectModelを使い作成したTableから型を取得作成したクラスに持たせることで、冗長さを解決することができます。

```ts
import { InferSelectModel } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export interface User extends InferSelectModel<typeof usersTable> {}
export class User extends Model {
  static table = usersTable;
}
```
