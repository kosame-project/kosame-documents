---
title: Mixins
---

# Mixins

Kosame does not provide its own implementation of the mixin mechanism; instead, it uses the standard TypeScript mixin function pattern to implement it.

## How Mixins Work

### TypeScript Mixins

Kosame's proprietary mixin mechanism is not implemented from scratch; instead, you can use the TypeScript mixin pattern as-is.

```ts
function WithTimestamp<TBase extends Constructor<Model>>(Base: TBase) {
  abstract class WithTimestampMixin extends Base {
    get createdAtLabel() {
      return "Date and Time Created";
    }
  }
  return WithTimestampMixin;
}
```

### `Constructor<T>`

The type for the standard mixin pattern is `new (...args) => T`, but since the Model itself is an `abstract class`, this type does not work. Therefore, Kosame resolves this issue by providing a dedicated type called `Constructor<T>` (`abstract new (...args: any[]) => T`).

## SoftDeletable

`SoftDeletable`はDBから完全削除をするのではなく`deletedAt`のようなカラムに日時を入れ、削除したかのように見せる機能です。

### 適用方法

テーブルに`deletedAtColumn()`で`deletedAt`カラムを定義し、`SoftDeletable(Model)`でModelに適用します。`deletedAtColumn()`はdialectごとに`kosame/pg`などからimportします。

```ts
import { Model, SoftDeletable } from "kosame";
import { deletedAtColumn } from "kosame/pg";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  deletedAt: deletedAtColumn(),
});

class User extends SoftDeletable(Model) {
  static table = usersTable;
}
```

### `delete()`と`hardDelete()`

`delete()`は実際には削除せず`deletedAt`に日時をUPDATEします。本来の完全削除をしたい場合は`hardDelete()`を使います。

### 取得時の自動除外

`SoftDeletable`を適用したModelは、`find()`と`include`によるリレーション取得の両方で、削除済みの行が自動的に除外されます。カラム名が`deletedAt`というだけでは除外されず、`SoftDeletable`を適用した場合のみ有効です。
