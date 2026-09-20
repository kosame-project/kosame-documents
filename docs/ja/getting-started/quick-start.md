---
title: クイックスタート
---

# クイックスタート

## Kosameのインストール

### bun

```bash
bun add kosame
```

## ドライバーのインストール

### node-postgres

```bash
bun add drizzle-orm@^0.45.2 pg
bun add -D drizzle-kit@^0.45.2 @types/pg
```

## データベース接続

```ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool);
```

## Model定義

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

```ts
import { createContext } from "kosame";
import { db } from "./db.js";
import { User } from "./models/user.js";

export const context = createContext(db, { users: User });
```

## Crud操作

```ts
const user = await context.users.add({ name: "kosame" });
```
