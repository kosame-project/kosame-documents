---
title: クイックスタート
---

# クイックスタート

## フロー

データベース接続 -> Model定義 -> Context作成 -> Crud操作

## ディレクトリ構造

クイックスタートではこのようなディレクトリ構造で作成していきます。

```
src/
├── data/
│   ├── db.ts
│   └── context.ts
└── models/
    └── user.ts
```

## データベース接続

### data/db.ts

```ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool);
```

## Model定義

### models/user.ts

```ts
import { Model } from "kosame";
import { pgTable, serial, text } from "drizzle-orm/pg-core";

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

## Context作成

### data/context.ts

```ts
import { createContext } from "kosame";
import { db } from "./db.js";
import { User } from "../models/user.js";

export const context = createContext(db, { users: User });
```

## CRUD操作

```ts
const user = await context.users.add({ name: "kosame" });
const found = await context.users.find(user.id);
```
