---
title: CRUD
---

# CRUD

Kosameは独自のCRUD操作を提供してます。

## CRUD操作の書き方

### add()

データベースのテーブルに値を追加

```ts
const user = await context.users.add({ name: "alice" });
```

### find()

読み取り

```ts
const found = await context.users.find(user.id);
```
