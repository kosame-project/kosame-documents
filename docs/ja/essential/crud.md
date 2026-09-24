---
title: CRUD
---

# CRUD

Kosameは独自のCRUD操作を提供してます。

## CRUD操作の書き方

#### CRUD操作の共通の書き方

使い方としてはまず`context`を呼び出します。そして追加したいテーブル名(ここでは`users`)を書き、呼び出すメソッドを書き入れます。

### add()

`add()`メソッドは、データベースに値を入れる操作です。

```ts
const user = await context.users.add({ name: "alice" });
```

### find()

読み取り

```ts
const found = await context.users.find(user.id);
```
