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

`SoftDeletable` is a feature that, rather than completely deleting data from the database, stores a date and time in a column such as `deletedAt` to make it appear as if the data has been deleted.

### Instructions for Use

Define the `deletedAt` column in the table using `deletedAtColumn()`, and apply it to the model using `SoftDeletable(Model)`. Import `deletedAtColumn()` from sources such as `kosame/pg`, depending on the dialect.

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

### `delete()` and `hardDelete()`

`delete()` does not actually delete the record; instead, it updates the `deletedAt` field with a date and time. To perform a permanent deletion, use `hardDelete()`.

### Automatic Exclusion Upon Acquisition

`SoftDeletable`を適用したModelは、`find()`と`include`によるリレーション取得の両方で、削除済みの行が自動的に除外されます。カラム名が`deletedAt`というだけでは除外されず、`SoftDeletable`を適用した場合のみ有効です。
