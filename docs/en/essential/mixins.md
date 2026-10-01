---
title: Mixins
---

# Mixins

Kosame does not provide its own implementation of the mixin mechanism; instead, it uses the standard TypeScript mixin function pattern to implement it.

## Mixinsの仕組み

### TypeScriptのMixin

Kosame独自のmixin機構自体は独自実装されておらず、TypeScriptのMixinパターンがそのまま使うことができます。

```ts
function WithTimestamp<TBase extends Constructor<Model>>(Base: TBase) {
  abstract class WithTimestampMixin extends Base {
    get createdAtLabel() {
      return "作成日時";
    }
  }
  return WithTimestampMixin;
}
```

### `Constructor<T>`

通常のmixinパターンの型は`new (...args) => T`ですが、Model自体が`abstract class`のためこの型では噛み合いません。なのでKosameでは`Constructor<T>`(`abstract new (...args: any[]) => T`)という専用の型を提供することでこの問題を解決しています。

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
