---
title: インストール
---

# インストール

### bun

```bash
bun add kosame
```

### npm

```bash
npm install kosame
```

## ドライバー

データベース用のドライバーを各自インストールする必要があります現在のKosameはv0.45.2、
Drizzleの安定版を提供しています。

### node-postgres

```bash
bun add drizzle-orm@^0.45.2 pg
bun add -D drizzle-kit@^0.45.2 @types/pg
```

### mysql2

```bash
bun add drizzle-orm@^0.45.2 mysql2
bun add -D drizzle-kit@^0.45.2
```

### libsql

```bash
bun add drizzle-orm@^0.45.2 @libsql/client
bun add -D drizzle-kit@^0.45.2
```

### better-sqlite3

```bash
bun add drizzle-orm@^0.45.2 better-sqlite3
bun add -D drizzle-kit@^0.45.2 @types/better-sqlite3
```
