---
title: Mixins
---

# Mixins

KosameではMixin機構自体の独自実装はしておらず、素のTypeScriptのMixin関数パターンを使用し実現します。

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

SoftDeletableはDBから完全削除をするのではなく`deleteAt`のようなフラグを立て削除したかのように見せる機能です。

### 適用方法

`SoftDeletable`をimportして、`SoftDeletable(Model)`でModelに適用させます。

```ts
import { SoftDeletable } from "kosame";

class User extends SoftDeletable(Model) {
  static table = userTable;
}
```

### `delete()`と`hardDelete()`

`delete()`は`deleteAt`へUPDATEに、そして`hardDelete()`は従来の完全削除をさせます。

### 取得時の自動除外

SoftDeletableを適用した時、deleteAtがついているとアソシエーション経由の取得が自動で除外されます。
