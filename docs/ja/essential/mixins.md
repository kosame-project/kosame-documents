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
