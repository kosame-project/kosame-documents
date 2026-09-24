---
title: CRUD
---

# CRUD

Kosameは独自のCRUD操作を提供しています。

## CRUD操作の書き方

### CRUD操作の共通の書き方

使い方としてはまず`context`にアクセスし、そして操作したいテーブル名(ここでは`users`)を書き、呼び出すメソッドを書き入れます。

### add()

`add()`メソッドは、データベースに値を入れる操作です。
`add()`の引数に、カラムの値をオブジェクトとして渡します。
`add()`の返り値には、DBが生成した値も含めてModelインスタンスが返ってきます。

```ts
const user = await context.users.add({ name: "alice" });
```

### find()

`find()`メソッドは、データーベスから値を読み取る操作です。
`find()`の引数に、主キーの値だけを渡します。
`find()`の返り値には、DBが生成した値も含めてModelインスタンスが返ってきます。見つからない場合にはundefinedが返ってきます。

```ts
const found = await context.users.find(user.id);
```
