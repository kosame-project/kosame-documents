---
title: CRUD
---

# CRUD

Kosameは独自のCRUD操作を提供しています。

## CRUD操作の書き方

### add()、find()に共通する書き方

使い方としてはまず`context`にアクセスし、そして操作したいテーブル名(ここでは`users`)を書き、呼び出すメソッドを書き入れます。

### add()

`add()`メソッドは、データベースに値を入れる操作です。
`add()`の引数に、カラムの値をオブジェクトとして渡します。
`add()`の返り値には、DBが生成した値も含めてModelインスタンスが返ってきます。

```ts
const user = await context.users.add({ name: "kosame" });
```

### find()

`find()`メソッドは、データベースから値を読み取る操作です。
`find()`の引数に、主キーの値だけを渡します。
`find()`の返り値には、見つかった場合はModelインスタンスが、見つからなかった場合はundefinedが返ってきます。

```ts
const found = await context.users.find(user.id);
```

### update()

`update()`メソッドは、データベースの更新をする操作です。
`update()`の引数に、`add()`と同じようにカラムの値をオブジェクトとして渡します。
`update()`は値を返さず、呼び出し元のインスタンス自身が新しい値に更新されます。

#### `add()`との違い

役割としては`update()`は更新処理で、`add()`は追加処理ですが書き方などもかなり近いです。`update()`は`add()`とは違いcontext経由ではなく直接の処理です。

```ts
await user.update({ name: "ooame" });
```

### save()

`save()`メソッドは、データベースに保存する操作です。
`save()`は引数を取らず、代わりに、呼び出す前にインスタンスのプロパティを直接書き換えておくと、その時点の値がそのままデータベースに書き込まれます。

```ts
user.name = "gouu";
await user.save();
```

### reload()

`reload()`メソッドは、データベースから最新の値を再取得する操作です。
`reload()`は値を返さず、代わりに呼び出し元のインスタンス自身が最新の値に更新されます。
`find()`との違いとして、対象の行が無かった場合`find()`はundefinedを返しますが、`reload()`は例外を投げます。

```ts
await user.reload();
```

### delete()
