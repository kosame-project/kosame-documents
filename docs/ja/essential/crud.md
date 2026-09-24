---
title: CRUD
---

# CRUD

データベースを操作するCRUD操作、Kosameはこの操作を独自で提供しております。

## CRUD操作の書き方

### ADD

データベースのテーブルに値を追加

```ts
const user = await context.users.add({ name: "alice" });
```
